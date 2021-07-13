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
    swDest: "public/service-worker.js"
})