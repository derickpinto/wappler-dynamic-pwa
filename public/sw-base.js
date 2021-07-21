importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');
importScripts("/js/idb.js");
importScripts("/js/utility.js");


const networkUrls = [
    "https://js.stripe.com",
    "https://code.jquery.com",
    "https://cdn.jsdelivr.net",
    "https://storage.googleapis.com"
];

workbox.setConfig({
    modulePathPrefix: "/workbox-v6.1.5/",
    debug: false,
});



// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
    new RegExp('\\.(?:png|jpg|jpeg|svg|gif)$'),
    new workbox.strategies.CacheFirst({
        cacheName: "image-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 15,
                maxAgeSeconds: 60 * 12,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com.*S/,
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 3,
                maxAgeSeconds: 60 * 24,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({ url }) => url.origin === "https://stackpath.bootstrapcdn.com",
    new workbox.strategies.CacheFirst({
        cacheName: "font-awesome",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 2,
                maxAgeSeconds: 24 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({ url }) => networkUrls.includes(url.origin),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "networkUrls",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 24 * 60,
            }),
        ],
    })
);

const limitCacheSize = (name, size) => {
    caches.open(name).then((cache) => {
        cache.keys().then((keys) => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

workbox.routing.registerRoute(({ url }) => {
    return url.pathname === "/api/get_data/all_comments?"
}, (args) => {
    return fetch(args.event.request);
});

workbox.routing.registerRoute(function (routeData) {
    return routeData.event.request.headers.get("accept").includes("text/html")
}, function (args) {

    return caches.match(args.event.request).then(cacheRes => {

        return cacheRes || fetch(args.event.request).then(fetchRes => {
            if (fetchRes.status === 404) {
                return caches.match('/offline');
            }

            return fetchRes;
        });
    }).catch((error) => {
        return caches.match('/offline');
    })

});

// Fetch event
workbox.routing.registerRoute(function (routeData) {
    return routeData.event.request.headers.get("accept").includes("*/*")
}, function (args) {

    return caches.match(args.event.request).then(cacheRes => {
        return cacheRes || fetch(args.event.request).then(fetchRes => {

            return caches.open("dynamic").then(cache => {
                cache.put(args.event.request.url, fetchRes.clone());
                // check cached items size
                limitCacheSize("dynamic", 15);
                return fetchRes;
            })
        });
    }).catch((error) => {
        console.log("[Service worker] fetch apis error", error.message);
    })

});

const postOfflineData = () => {

    readAllData("sync-comments").then(function (data) {
        setTimeout(async () => {
            await Promise.all(
                data.map(async (dt) => {
                    const url = "/api/post_data/post_new_comment";
                    const parameters = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            datetime: dt.datetime,
                            name: dt.name,
                            url: dt.image,
                            comment: dt.message,
                            datetime1: dt.datetime1,
                        }),
                    };

                    fetch(url, parameters)
                        .then((res) => {
                            return res.json();
                        })
                        .then((response) => {
                            if (response && response.datetimeid) {
                                deleteItemFromData("sync-comments", response.datetimeid);
                            }
                        })
                        .catch((error) => {
                            console.log(
                                "[Service worker] background sync error",
                                error.message
                            );
                        });
                })
            );

        }, 3000);
    });
};

//Background synchronisation
self.addEventListener("sync", (event) => {
    if (event.tag === "post-comment") {
        event.waitUntil(postOfflineData());
    }
});

//Push notification
self.addEventListener("push", function (event) {

    var data = {
        title: "New!",
        content: "Something new happened!",
        openUrl: "https://wappler-dynamic-pwa.herokuapp.com",
    };

    if (event.data) {
        data = JSON.parse(event.data.text());
    }

    var options = {
        body: data.content,
        icon: "/assets/icon/icon-96.png",
        badge: "/assets/icon/icon-96.png",
        data: {
            url: data.openUrl,
        },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

// const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin("post-comment", {
//     maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// });


// workbox.routing.registerRoute(
//     ({ url }) => {
//         return url.pathname === "/api/post_data/post_new_comment"
//     },
//     new workbox.strategies.NetworkOnly({
//         plugins: [bgSyncPlugin],
//     }),
//     "POST"
// );


workbox.precaching.precacheAndRoute([
    { url: "/", revision: null },
    { url: "/offline", revision: null },
    { url: "bootstrap/4/css/bootstrap.min.css", revision: null },
    { url: "bootstrap/4/js/bootstrap.min.js", revision: null },
    { url: "bootstrap/4/js/popper.min.js", revision: null },
    { url: "css/style.css", revision: null },
    { url: "dmxAppConnect/config.js", revision: null },
    { url: "dmxAppConnect/dmxAppConnect.js", revision: null },
    { url: "dmxAppConnect/dmxBootstrap4Modal/dmxBootstrap4Modal.js", revision: null },
    { url: "dmxAppConnect/dmxBootstrap4Toasts/dmxBootstrap4Toasts.js", revision: null },
    { url: "dmxAppConnect/dmxDatastore/dmxDatastore.js", revision: null },
    { url: "dmxAppConnect/dmxDataTraversal/dmxDataTraversal.js", revision: null },
    { url: "dmxAppConnect/dmxFormatter/dmxFormatter.js", revision: null },
    { url: "dmxAppConnect/dmxNotifications/dmxNotifications.css", revision: null },
    { url: "dmxAppConnect/dmxNotifications/dmxNotifications.js", revision: null },
    { url: "dmxAppConnect/dmxRouting/dmxRouting.js", revision: null },
    { url: "dmxAppConnect/dmxStateManagement/dmxStateManagement.js", revision: null },
    { url: "dmxAppConnect/dmxStripe/dmxStripe.js", revision: null },
    { url: "dmxAppConnect/dmxSummernote/dmxSummernote.js", revision: null },
    { url: "dmxAppConnect/dmxValidator/dmxValidator.css", revision: null },
    { url: "dmxAppConnect/dmxValidator/dmxValidator.js", revision: null },
    { url: "fontawesome4/css/font-awesome.css", revision: null },
    { url: "fontawesome4/css/font-awesome.min.css", revision: null },
    { url: "js/app.js", revision: null },
    { url: "js/comment.js", revision: null },
    { url: "js/idb.js", revision: null },
    { url: "js/jquery-3.5.1.slim.min.js", revision: null },
    { url: "js/utility.js", revision: null },
    { url: "manifest.json", revision: null },
]);



// const notificate = (title, message) => {
//   self.registration.showNotification(title, {
//     body: message,
//     icon: "/image.png",
//     tag: "service-worker",
//   });
// };

// // let's create our queue
// const queue = new workbox.backgroundSync.Queue("post-comment", {
//   callbacks: {
//     requestWillEnqueue: () => {
//       notificate(
//         "You are offline! 🛠",
//         "Your request has been submitted to the Offline queue.The queue will sync with the server once you are back online."
//       );
//     },
//   },
// });




