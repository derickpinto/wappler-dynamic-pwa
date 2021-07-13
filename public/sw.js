importScripts("/js/idb.js");
importScripts("/js/utility.js");

var CACHE_STATIC_NAME = "static-v1.0.40";
var CACHE_DYNAMIC_NAME = "dynamic-v1.0.17";
var STATIC_FILES = [
  "/",
  "/offline",
  "/assets/icon/apple-icon-76x76-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-57x57-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-60x60-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-72x72-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-120x120-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-114x114-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-152x152-dunplab-manifest-47724.png",
  "/assets/icon/apple-icon-180x180-dunplab-manifest-47724.png",
  "/assets/icon/icon-144.png",
  "/bootstrap/4/css/bootstrap.min.css",
  "/bootstrap/4/js/bootstrap.min.js",
  "/bootstrap/4/js/popper.min.js",
  "/css/style.css",
  "/dmxAppConnect/dmxAppConnect.js",
  "/dmxAppConnect/dmxDataTraversal/dmxDataTraversal.js",
  "/dmxAppConnect/dmxBootstrap4Modal/dmxBootstrap4Modal.js",
  "/dmxAppConnect/dmxFormatter/dmxFormatter.js",
  "/dmxAppConnect/dmxRouting/dmxRouting.js",
  "/dmxAppConnect/dmxStripe/dmxStripe.js",
  "/dmxAppConnect/dmxSummernote/dmxSummernote.js",
  "/dmxAppConnect/dmxValidator/dmxValidator.css",
  "/dmxAppConnect/dmxValidator/dmxValidator.js",
  "/dmxAppConnect/dmxStateManagement/dmxStateManagement.js",
  "/dmxAppConnect/dmxNotifications/dmxNotifications.css",
  "/dmxAppConnect/dmxNotifications/dmxNotifications.js",
  "/dmxAppConnect/dmxDatastore/dmxDatastore.js",
  "/js/app.js",
  "/js/idb.js",
  "/js/utility.js",
  "/js/comment.js",
  "/manifest.json",
  "https://cdn.jsdelivr.net/npm/summernote/dist/summernote-bs4.min.css",
  "https://cdn.jsdelivr.net/npm/summernote/dist/summernote-bs4.min.js",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900",
  "https://fonts.gstatic.com/s/lato/v17/S6u9w4BMUTPHh6UVSwiPGQ.woff2",
  "https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2",
  "https://js.stripe.com/v3/",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
];
const SYNC_TAG = "post-comment";
const SYNC_ENABLED = "sync" in self.registration;

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_STATIC_NAME)
      .then(function (cache) {
        cache.addAll(STATIC_FILES);
      })
      .catch((error) => {
        console.log("error", error.message);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter(
              (key) => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME
            )
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener("fetch", (event) => {
  if (event.request.url.indexOf("/api/") === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                // limitCacheSize(CACHE_DYNAMIC_NAME, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch((error) => {
          console.log("[Service worker] Fetche error", error.message);
          return caches.match("/offline");
        })
    );
  }
});

const postOfflineData = () => {
  console.log("[Service worker] Started syncing");

  readAllData("sync-comments").then(function (data) {
    setTimeout(async () => {

      let dataSynced = false;
      await Promise.all(
        data.map(async (dt) => {
          const url = "/api/post_data/post_new_comment";
          const parameters = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
                dataSynced = true;
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

      if (dataSynced) {
        self.registration.showNotification("Your comments are synced");
      }

    }, 3000);
  });
};

self.addEventListener("sync", (event) => {
  if (event.tag === "post-comment") {
    event.waitUntil(postOfflineData());
  }
});
