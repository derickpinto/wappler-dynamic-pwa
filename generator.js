const workbox = require("workbox-build");

workbox.generateSW({
    cacheId: "pwa_comment",
    globDirectory: "public/",
    globPatterns: [
        "**/*.{css,js,json}",
        "assets/icon/*.{png}",
    ],
    globIgnores: [
        "**/service-worker.js",
        "**/sw.js",
        "../generator.js"
    ],
    swDest: "public/service-worker.js",
    runtimeCaching: [
        {
            urlPattern: /\.(?:png)$/,
            handler: "CacheFirst",
            options: {
                cacheName: "images",
                expiration: {
                    maxAgeSeconds: 1800
                }
            }
        }
    ]
})