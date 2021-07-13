importScripts("workbox-v6.1.5/workbox-sw.js");

workbox.setConfig({
  modulePathPrefix: "/workbox-v6.1.5/",
  debug: true,
});

workbox.precaching.precacheAndRoute([
  {
    url: "/",
    revision: null,
  },
  {
    url: "/offline",
    revision: null,
  },
  {
    url: "bootstrap/4/css/bootstrap.min.css",
    revision: "d432e4222814b62dd30c9513dcc29440",
  },
  {
    url: "bootstrap/4/js/bootstrap.min.js",
    revision: "f0c2bcf5ef0c4476508d79ec9cdcce07",
  },
  {
    url: "bootstrap/4/js/popper.min.js",
    revision: "1022eaf388cc780bcfeb6456157adb7d",
  },
  { url: "css/style.css", revision: "5908b0dda4d45be4bdf1a419d2d58420" },
  {
    url: "dmxAppConnect/config.js",
    revision: "0756197c4eec675df560d315216c1e99",
  },
  {
    url: "dmxAppConnect/dmxAppConnect.js",
    revision: "ab4bd4f233a5e61560b8c8b89d4d1d08",
  },
  {
    url: "dmxAppConnect/dmxBootstrap4Modal/dmxBootstrap4Modal.js",
    revision: "230cfd35d588d158541a92b62c5869d8",
  },
  {
    url: "dmxAppConnect/dmxBootstrap4Toasts/dmxBootstrap4Toasts.js",
    revision: "9a2f99bb3fc31f56e08afbb6eb6ab080",
  },
  {
    url: "dmxAppConnect/dmxDatastore/dmxDatastore.js",
    revision: "c008b4c945ebe9254d8f0db92f5d7e8d",
  },
  {
    url: "dmxAppConnect/dmxDataTraversal/dmxDataTraversal.js",
    revision: "5e79a40e48bf01b00a1f8fabf05ebebb",
  },
  {
    url: "dmxAppConnect/dmxFormatter/dmxFormatter.js",
    revision: "9c9e47e7f082aa288e0b1d4363872fa4",
  },
  {
    url: "dmxAppConnect/dmxNotifications/dmxNotifications.css",
    revision: "6c7401e4ffb2213b871edb7f2a5b5f8a",
  },
  {
    url: "dmxAppConnect/dmxNotifications/dmxNotifications.js",
    revision: "b880c6fd84e76bfbc95d0c7ac043b13d",
  },
  {
    url: "dmxAppConnect/dmxRouting/dmxRouting.js",
    revision: "fc8b210cbdbce7811e63a145f365091a",
  },
  {
    url: "dmxAppConnect/dmxStateManagement/dmxStateManagement.js",
    revision: "bb127258b64426e2529466102fe8bccf",
  },
  {
    url: "dmxAppConnect/dmxStripe/dmxStripe.js",
    revision: "f7b93e985be10a25bc790256385b6b1e",
  },
  {
    url: "dmxAppConnect/dmxSummernote/dmxSummernote.js",
    revision: "e25cf59375b45cce5a737a3fcb848d52",
  },
  {
    url: "dmxAppConnect/dmxValidator/dmxValidator.css",
    revision: "f3007bf6105cd8ed97e2818f3f134f88",
  },
  {
    url: "dmxAppConnect/dmxValidator/dmxValidator.js",
    revision: "e968412c7adebed3bad433e0077651a6",
  },
  {
    url: "fontawesome4/css/font-awesome.css",
    revision: "c495654869785bc3df60216616814ad1",
  },
  {
    url: "fontawesome4/css/font-awesome.min.css",
    revision: "269550530cc127b6aa5a35925a7de6ce",
  },
  { url: "js/app.js", revision: "61f125903aa8129a72860407d479f019" },
  { url: "js/comment.js", revision: "396e8b43b6226a18345e4271767e279a" },
  { url: "js/idb.js", revision: "54e4321dc8f86b9cf316a14cfdf144ab" },
  {
    url: "js/jquery-3.5.1.slim.min.js",
    revision: "fb8409a092adc6e8be17e87d59e0595e",
  },
  { url: "js/utility.js", revision: "a4c0922c7b75a9bbe82cfc8e22a117de" },
  { url: "manifest.json", revision: "5db71bdfbc3139823235305fb6fa6718" },
  { url: "sw-base.js", revision: "c63cd06f1d89b0de48df704ab7fe365c" },
  {
    url: "workbox-v6.1.5/workbox-background-sync.dev.js",
    revision: "c667009e788d90f4e6e0c77e0df1683d",
  },
  {
    url: "workbox-v6.1.5/workbox-background-sync.prod.js",
    revision: "0a9249e7322afd36d8d79e1e0f64875f",
  },
  {
    url: "workbox-v6.1.5/workbox-broadcast-update.dev.js",
    revision: "9e2a4fef66f36af485d1f0fb65b89f1d",
  },
  {
    url: "workbox-v6.1.5/workbox-broadcast-update.prod.js",
    revision: "6957cb84c327accccab113f310ab232d",
  },
  {
    url: "workbox-v6.1.5/workbox-cacheable-response.dev.js",
    revision: "22ac8c37167bc4812766279be89b4ead",
  },
  {
    url: "workbox-v6.1.5/workbox-cacheable-response.prod.js",
    revision: "aca07ae785fc52ddc2b381e09a956157",
  },
  {
    url: "workbox-v6.1.5/workbox-core.dev.js",
    revision: "0bbac8cb58e0e9077ebd666597a30662",
  },
  {
    url: "workbox-v6.1.5/workbox-core.prod.js",
    revision: "44594f411a3c39563fbd664b3acb02fa",
  },
  {
    url: "workbox-v6.1.5/workbox-expiration.dev.js",
    revision: "e81b20d1d0e093dff925c751da6294fc",
  },
  {
    url: "workbox-v6.1.5/workbox-expiration.prod.js",
    revision: "80f9599ae3a1c077ca29c2b468a089df",
  },
  {
    url: "workbox-v6.1.5/workbox-navigation-preload.dev.js",
    revision: "6bb2706fee17ac0702625f2033ea9457",
  },
  {
    url: "workbox-v6.1.5/workbox-navigation-preload.prod.js",
    revision: "60b8d0bdc7ef1da50066822a87342434",
  },
  {
    url: "workbox-v6.1.5/workbox-offline-ga.dev.js",
    revision: "f8e0362ed60ceca697e714a65379dcf8",
  },
  {
    url: "workbox-v6.1.5/workbox-offline-ga.prod.js",
    revision: "a5b743653bf4b1ff3dee5feaf7c2c869",
  },
  {
    url: "workbox-v6.1.5/workbox-precaching.dev.js",
    revision: "9062ce8b7eab1491a4ed7736d340cca5",
  },
  {
    url: "workbox-v6.1.5/workbox-precaching.prod.js",
    revision: "24dad1ccf623442ff086b1948c593ee6",
  },
  {
    url: "workbox-v6.1.5/workbox-range-requests.dev.js",
    revision: "afa1ad10b830843c1834bd30e04aa7d7",
  },
  {
    url: "workbox-v6.1.5/workbox-range-requests.prod.js",
    revision: "ef2857654871e5367da5ed0dc2dba810",
  },
  {
    url: "workbox-v6.1.5/workbox-recipes.dev.js",
    revision: "a103984afdadb56dd47351d1a946fc2b",
  },
  {
    url: "workbox-v6.1.5/workbox-recipes.prod.js",
    revision: "8b62e256c96c8d21c2b0d2c8c85c80cd",
  },
  {
    url: "workbox-v6.1.5/workbox-routing.dev.js",
    revision: "302bc33ca0d090b074e76652759e671f",
  },
  {
    url: "workbox-v6.1.5/workbox-routing.prod.js",
    revision: "63c81587ca4d56faac5cfeb27d6927d1",
  },
  {
    url: "workbox-v6.1.5/workbox-strategies.dev.js",
    revision: "34c3d2f208a87ba5fef231c032d02a94",
  },
  {
    url: "workbox-v6.1.5/workbox-strategies.prod.js",
    revision: "5c00eea9d137c2d3fa67def1b200b9a2",
  },
  {
    url: "workbox-v6.1.5/workbox-streams.dev.js",
    revision: "fdef17b8dc0dd098c1756fc7048ee4a3",
  },
  {
    url: "workbox-v6.1.5/workbox-streams.prod.js",
    revision: "8c4e6cf83a8e4ae718d071b4fac8def1",
  },
  {
    url: "workbox-v6.1.5/workbox-sw.js",
    revision: "b5d8b54a283769bd2c8dc49fc76fddd8",
  },
  {
    url: "workbox-v6.1.5/workbox-window.dev.umd.js",
    revision: "d0cfe78803c074387f76259a7908a24c",
  },
  {
    url: "workbox-v6.1.5/workbox-window.prod.umd.js",
    revision: "df8a214e638d97c6a74c2f6184669dbe",
  },
]);

// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
  new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 3,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*S/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 2,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://js.stripe.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "jstripe",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 * 1000,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://code.jquery.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "jquery",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 * 1000,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://cdn.jsdelivr.net",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "summernote",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 * 1000,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://stackpath.bootstrapcdn.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "font-awesome",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60 * 1000,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  (routeData) => routeData.event.request.url.indexOf("/api/") === -1,
  (args) => {
    return caches
      .match(args.event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(args.event.request).then((fetchRes) => {
            return caches.open("dynamic").then((cache) => {
              cache.put(args.event.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        return caches.match("/offline");
      });
  }
);

// const queue = new workbox.backgroundSync.BackgroundSyncPlugin("post-comment", {
//   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// });

// workbox.routing.registerRoute(
//   ({ url }) => {
//     return url.pathname === "/api/post_data/post_new_comment"
//   },
//   new workbox.strategies.NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   "POST"
// );


const notificate = (title, message) => {
  self.registration.showNotification(title, {
    body: message,
    icon: '/image.png',
    tag: 'service-worker'
  })
}

// let's create our queue
const queue = new workbox.backgroundSync.Queue('post-comment', {
  callbacks: {
    requestWillEnqueue: () => {
      notificate('You are offline! 🛠', 'Your request has been submitted to the Offline queue.The queue will sync with the server once you are back online.')
    }
  }
});

// sync event handler
self.addEventListener("sync", (ev) => {
  queue.replayRequests().then((a) => {
    notificate('Syncing Application... 💾', 'Any pending requests will be sent to the server.');
  }).catch(
    notificate('We could not submit your requests. ❌', 'Please hit the \'Sync Pending Requests\' button when you regain internet connection.')
  );
});
// const queue = new workbox.backgroundSync.Queue("post-comment");

// self.addEventListener("fetch", (event) => {
//   // Add in your own criteria here to return early if this
//   // isn't a request that should use background sync.
//   if (event.request.method !== "POST") {
//     return;
//   }

//   const bgSyncLogic = async () => {
//     try {
//       const response = await fetch(event.request.clone());
//       return response;
//     } catch (error) {
//       await queue.pushRequest({ request: event.request });
//       return error;
//     }
//   };

//   event.respondWith(bgSyncLogic());
// });
