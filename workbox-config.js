module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,css,js,eot,svg,ttf,woff,woff2,otf,json}',
		"assets/icon/*.{png}"
	],
	globIgnores: [
		"**/service-worker.js",
		"**/sw.js",
		"../workbox-config.js"
	],
	swDest: 'public/service-worker.js',
	// swSrc: "public/sw-base.js"
};