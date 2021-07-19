if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let o = Promise.resolve();
      return (
        r[e] ||
          (o = new Promise(async (o) => {
            if ("document" in self) {
              const r = document.createElement("script");
              (r.src = e), document.head.appendChild(r), (r.onload = o);
            } else importScripts(e), o();
          })),
        o.then(() => {
          if (!r[e]) throw new Error(`Module ${e} didn’t register its module`);
          return r[e];
        })
      );
    },
    o = (o, r) => {
      Promise.all(o.map(e)).then((e) => r(1 === e.length ? e[0] : e));
    },
    r = { require: Promise.resolve(o) };
  self.define = (o, s, a) => {
    r[o] ||
      (r[o] = Promise.resolve().then(() => {
        let r = {};
        const i = { uri: location.origin + o.slice(1) };
        return Promise.all(
          s.map((o) => {
            switch (o) {
              case "exports":
                return r;
              case "module":
                return i;
              default:
                return e(o);
            }
          })
        ).then((e) => {
          const o = a(...e);
          return r.default || (r.default = o), r;
        });
      }));
  };
}
define("./service-worker.js", ["./workbox-f6829f63"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "pwa_comment" }),
    self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        {
          url: "assets/icon/android-icon-192x192-dunplab-manifest-47724.png",
          revision: "08ba7e2830bc60affa16d53fc8b9a8dd",
        },
        {
          url: "assets/icon/apple-icon-114x114-dunplab-manifest-47724.png",
          revision: "7d885df9ab58224e96a91d2446143e04",
        },
        {
          url: "assets/icon/apple-icon-120x120-dunplab-manifest-47724.png",
          revision: "59a2b522d1987ec020de62845641c69b",
        },
        {
          url: "assets/icon/apple-icon-144x144-dunplab-manifest-47724.png",
          revision: "7f91157eb82506a0dbff6263e4e7bda0",
        },
        {
          url: "assets/icon/apple-icon-152x152-dunplab-manifest-47724.png",
          revision: "1e28fa55d7eb6b2544bb35320b182225",
        },
        {
          url: "assets/icon/apple-icon-180x180-dunplab-manifest-47724.png",
          revision: "f1d52ae8a7256022b77d04464826fc0e",
        },
        {
          url: "assets/icon/apple-icon-57x57-dunplab-manifest-47724.png",
          revision: "0bf0236077b242c7c51c4ae97345d9cf",
        },
        {
          url: "assets/icon/apple-icon-60x60-dunplab-manifest-47724.png",
          revision: "84936877d86f4f4b64d298a7089fb72d",
        },
        {
          url: "assets/icon/apple-icon-72x72-dunplab-manifest-47724.png",
          revision: "84cd307d2883b4086fd5f345fddc998e",
        },
        {
          url: "assets/icon/apple-icon-76x76-dunplab-manifest-47724.png",
          revision: "35970ce7aa265155e0eca04775a214b3",
        },
        {
          url: "assets/icon/favicon-16x16-dunplab-manifest-47724.png",
          revision: "4599926c37af3d6ae436c367554d9b26",
        },
        {
          url: "assets/icon/favicon-32x32-dunplab-manifest-47724.png",
          revision: "ece4e90f4d99fcae97da100f0d07559c",
        },
        {
          url: "assets/icon/icon-144.png",
          revision: "f63c261580dcce559b687e6b38b478ed",
        },
        {
          url: "assets/icon/icon-192.png",
          revision: "919c269b074c9f4b823e92d41fa32dd0",
        },
        {
          url: "assets/icon/icon-256.png",
          revision: "e625ff8f08a2f831ecb71d9e76e5cdc8",
        },
        {
          url: "assets/icon/icon-48.png",
          revision: "89adf9a9fc8ea075ac89f28b6b00827c",
        },
        {
          url: "assets/icon/icon-512.png",
          revision: "7a5ec2dec9e4910f5c26ddd987f918fb",
        },
        {
          url: "assets/icon/icon-96.png",
          revision: "d7ce4426000bb896f11038b6c8c83e9f",
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
        { url: "css/style.css", revision: "63e9f6fcde43e1fa1df928fd53301be2" },
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
        { url: "js/app.js", revision: "da5d5b63d3b334e798bba26d04581d3c" },
        { url: "js/comment.js", revision: "ff13df82ed083a82117843e6acf717e0" },
        { url: "js/idb.js", revision: "54e4321dc8f86b9cf316a14cfdf144ab" },
        {
          url: "js/jquery-3.5.1.slim.min.js",
          revision: "fb8409a092adc6e8be17e87d59e0595e",
        },
        { url: "js/utility.js", revision: "a4c0922c7b75a9bbe82cfc8e22a117de" },
        {
          url: "json/notification.json",
          revision: "6ddb4f2f21222a4b3de344c8f7498329",
        },
        { url: "manifest.json", revision: "86bbc9c51d066ff31a1c780767e24de5" },
        {
          url: "push/OneSignalSDKUpdaterWorker.js",
          revision: "ebb63ca15bba16b550232b0b0f66c726",
        },
        {
          url: "push/OneSignalSDKWorker.js",
          revision: "ebb63ca15bba16b550232b0b0f66c726",
        },
        { url: "sw-base.js", revision: "175129933cc99fea0ca12a6bacae5ddb" },
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
      ],
      {}
    );
});
//# sourceMappingURL=service-worker.js.map
