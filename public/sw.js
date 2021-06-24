
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
    '/',
    '/index',
    '/offline',
    'css/style.css',
    '/bootstrap/4/css/bootstrap.min.css',
    '/js/app.js',
    '/dmxAppConnect/dmxRouting/dmxRouting.js',
    'https://js.stripe.com/v3/',
    '/dmxAppConnect/dmxAppConnect.js',
    '/dmxAppConnect/dmxStripe/dmxStripe.js',
    '/dmxAppConnect/dmxBootstrap4Modal/dmxBootstrap4Modal.js',
    '/dmxAppConnect/dmxSummernote/dmxSummernote.js',
    '/dmxAppConnect/dmxValidator/dmxValidator.css',
    '/dmxAppConnect/dmxValidator/dmxValidator.js',
    '/dmxAppConnect/dmxFormatter/dmxFormatter.js',
    '/js/idb.js',
    '/js/promise.js',
    '/js/fetch.js',
    '/bootstrap/4/js/popper.min.js',
    '/bootstrap/4/js/bootstrap.min.js',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/summernote/dist/summernote-bs4.min.css',
];

// function trimCache(cacheName, maxItems) {
//   caches.open(cacheName)
//     .then(function (cache) {
//       return cache.keys()
//         .then(function (keys) {
//           if (keys.length > maxItems) {
//             cache.delete(keys[0])
//               .then(trimCache(cacheName, maxItems));
//           }
//         });
//     })
// }

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(STATIC_FILES);
            })
    )
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {

    // var url = 'https://pwagram-99adf.firebaseio.com/posts';
    // if (event.request.url.indexOf(url) > -1) {
    //     event.respondWith(fetch(event.request)
    //         .then(function (res) {
    //             var clonedRes = res.clone();
    //             clearAllData('posts')
    //                 .then(function () {
    //                     return clonedRes.json();
    //                 })
    //                 .then(function (data) {
    //                     for (var key in data) {
    //                         writeData('posts', data[key])
    //                     }
    //                 });
    //             return res;
    //         })
    //     );
    // } else if (isInArray(event.request.url, STATIC_FILES)) {
    //     event.respondWith(
    //         caches.match(event.request)
    //     );
    // } else {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    // trimCache(CACHE_DYNAMIC_NAME, 3);
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function (err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function (cache) {
                                    if (event.request.headers.get('accept').includes('text/html')) {
                                        return cache.match('/offline');
                                    }
                                });
                        });
                }
            })
    );
    // }
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {
//               return caches.open(CACHE_STATIC_NAME)
//                 .then(function(cache) {
//                   return cache.match('/offline.html');
//                 });
//             });
//         }
//       })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//       .then(function(res) {
//         return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//       })
//       .catch(function(err) {
//         return caches.match(event.request);
//       })
//   );
// });

// Cache-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

self.addEventListener('sync', function (event) {
    console.log('[service worker] background syncing', event);
    // if (event.tag === 'sync-new-posts') {
    //     console.log('[service woreker] syncing new posts', event);
    //     event.waitUntil(
    //         readAllData('sync-data').then(data => {

    //             for (var dt of data) {
    //                 fetch('https://pwagram-99adf.firebaseio.com/posts.json', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': "application/json",
    //                         'Accept': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         id: dt.id,
    //                         title: dt.title,
    //                         location: dt.location,
    //                         image: dt.image
    //                     })
    //                 }).then((res) => {
    //                     console.log('send data', data);
    //                     if (res.ok) {
    //                         deleteItemFromData('sync-posts', dt.id);
    //                     }
    //                 }).catch(() => {

    //                 })
    //             }


    //         })
    //     );
    // }
})
