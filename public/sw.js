
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES = [
    '/',
    '/assets/icon/apple-icon-76x76-dunplab-manifest-47724.png',
    '/assets/icon/icon-144.png',
    '/bootstrap/4/css/bootstrap.min.css',
    '/bootstrap/4/js/bootstrap.min.js',
    '/bootstrap/4/js/popper.min.js',
    '/css/style.css',
    '/dmxAppConnect/dmxAppConnect.js',
    '/dmxAppConnect/dmxBootstrap4Modal/dmxBootstrap4Modal.js',
    '/dmxAppConnect/dmxFormatter/dmxFormatter.js',
    '/dmxAppConnect/dmxRouting/dmxRouting.js',
    '/dmxAppConnect/dmxStripe/dmxStripe.js',
    '/dmxAppConnect/dmxSummernote/dmxSummernote.js',
    '/dmxAppConnect/dmxValidator/dmxValidator.css',
    '/dmxAppConnect/dmxValidator/dmxValidator.js',
    '/dmxAppConnect/dmxStateManagement/dmxStateManagement.js',
    '/js/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/summernote/dist/summernote-bs4.min.css',
    'https://cdn.jsdelivr.net/npm/summernote/dist/summernote-bs4.min.js',
    'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900',
    'https://fonts.gstatic.com/s/lato/v17/S6u9w4BMUTPHh6UVSwiPGQ.woff2',
    'https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://js.stripe.com/v3/',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0'
];


const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(STATIC_FILES);
            }).catch(error => {
                console.log("error", error.message);
            })
    )
});

self.addEventListener('activate', event => {
    console.log('Service worker activated');
    event.waitUntil(
        caches.keys()
            .then(keys => {
                console.log('[Service worker active keys]', keys);
                return Promise.all(
                    keys.filter(key => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
                        .map(key => caches.delete(key))
                );
            })
            .then(() => self.clients.claim())
    );
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', event => {
    console.log('[Service worker fetch]', event);

    // event.respondWith(
    //     fetch(event.request)
    //         .catch(() => {
    //             return caches.open(CACHE_DYNAMIC_NAME)
    //                 .then((cache) => {
    //                     return cache.match(event.request)
    //                 })
    //         })
    // )

    const url = "http://localhost:3000/api/get_data/all_comments?";

    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(fetch(event.request));
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => {

                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(res => {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(cache => {
                                    cache.put(event.request.url, res.clone());
                                    limitCacheSize(CACHE_DYNAMIC_NAME, 30);
                                    return res;
                                })
                        })
                }

            }).catch(() => {
                return caches.match('/fallback');
            })
        );

    }
});