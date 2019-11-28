/* eslint no-restricted-globals: "off" */
/* eslint no-underscore-dangle: "off" */

// Detailed logging is very useful during development
workbox.setConfig({ debug: false });

// Fix precache error
workbox.precaching.cleanupOutdatedCaches();

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.clientsClaim();
workbox.core.skipWaiting();

// API
// Add all api, except perfil api
workbox.routing.registerRoute(
    new RegExp('.+/api/v1/(?!(perfil|cursos/meus-cursos)).+$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 50,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// API PERFIL
// Add only perfil api
workbox.routing.registerRoute(
    new RegExp('.+/api/v1/(?:(perfil)).*$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-cache-perfil',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// API MEUS CURSOS
// Add only meus-cursos api
workbox.routing.registerRoute(
    new RegExp('.+/api/v1/(?:(cursos/meus-cursos)).*$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'api-cache-meus-cursos',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// APP
// Add same origin, except in precache, css, image, js (same origin or cross origin)
workbox.routing.registerRoute(
    new RegExp('\\/(?!.+(css|eot|gif|js|jpg|jpeg|png|svg|ttf|webp|woff|woff2)).*$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'app-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// CSS CROSS-ORIGIN
workbox.routing.registerRoute(
    new RegExp('.+\\..+/(?:.+(css|css\\?.+))$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'css-cross-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 10,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// IMG SAME-ORIGIN
// Add same origin, except in asset/image folder or cross-origin app/uploads folder
workbox.routing.registerRoute(
    new RegExp('^(?!.+(/app/uploads/))(?:.+(gif|jpg|jpeg|png|svg|webp))$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// IMG CROSS-ORIGIN
workbox.routing.registerRoute(
    new RegExp('.+\\..+/app/uploads/(?:.+(gif|jpg|jpeg|png|svg|webp))$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cross-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// JS SAME-ORIGIN
// Add same origin, except in asset/js folder
workbox.routing.registerRoute(
    new RegExp('\\/(?:.+(js|js\\?.+))$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'js-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 50,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// JS CROSS-ORIGIN
workbox.routing.registerRoute(
    new RegExp('.+\\..+/(?:.+(js|js\\?.+))$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'js-cross-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
                maxEntries: 15,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// URL EXTERNAL - PICSUM
// workbox.routing.registerRoute(
//     new RegExp('^https://picsum.photos/id/'),
//     new workbox.strategies.CacheFirst({
//         cacheName: 'picsum-cache',
//         plugins: [
//             new workbox.cacheableResponse.Plugin({
//                 headers: {
//                     'X-Is-Cacheable': 'true'
//                 },
//                 statuses: [0, 200]
//             }),
//             new workbox.expiration.Plugin({
//                 maxAgeSeconds: 15 * 24 * 60 * 60, // 15 days
//                 maxEntries: 15,
//                 purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
//             })
//         ]
//     })
// );

// EVENT
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.type === 'CACHE_UPDATE') {
//         const { updateURL } = event.data.payload;

//         console.info(`%c A new version of ${updateURL} is available`, 'color: #00bbee;');
//     }

//     if (event.data && event.data.type === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });

// FETCH
// If use FETCH do you need use loadModule method
// This will trigger the importScripts() for workbox.strategies and its dependencies:

// workbox.loadModule('workbox-strategies');

// self.addEventListener('fetch', (event) => {
//     if (event.request.url.endsWith('.png')) {
//         // Referencing workbox.strategies will now work as expected.
//         const cacheFirst = new workbox.strategies.CacheFirst();
//         event.respondWith(cacheFirst.makeRequest({ request: event.request }));
//     }
// });

// PUSH
// self.addEventListener('push', (event) => {
//     const title = 'Get Started With Workbox';
//     const options = {
//         body: event.data.text()
//     };
//     event.waitUntil(self.registration.showNotification(title, options));
// });

workbox.precaching.precacheAndRoute(self.__precacheManifest);
