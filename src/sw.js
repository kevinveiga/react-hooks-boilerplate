/* eslint no-restricted-globals: "off" */
/* eslint no-underscore-dangle: "off" */

// Detailed logging is very useful during development
workbox.setConfig({ debug: false });

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// API
// workbox.routing.registerRoute(
//     new RegExp('^(http://|https://).+/api/v1/.+'),
//     new workbox.strategies.StaleWhileRevalidate({
//         cacheName: 'api-cache',
//         plugins: [
//             new workbox.cacheableResponse.Plugin({
//                 statuses: [200]
//             })
//         ]
//     })
// );

// APP
// Items not add, all this exist in precache or in image-cache
workbox.routing.registerRoute(
    new RegExp('^(.(?!.+\\.css$|.+\\.eot$|.+\\.gif$|.+\\.js$|.+\\.json|.+\\.jpg$|.+\\.png$|.+\\.svg$|.+\\.ttf$|.+\\.webp$|.+\\.woff$|.+\\.woff2$))*$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'app-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            })
        ]
    })
);

// IMG
workbox.routing.registerRoute(
    new RegExp('\\.(?:gif|jpg|png|svg|webp)$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60, // 60 minutes
                maxEntries: 50,
                purgeOnQuotaError: false // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// IMG CROSS-ORIGIN
workbox.routing.registerRoute(
    new RegExp('^(http://|https://).+\\.(?:gif|jpg|png|svg|webp)$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'image-uploads-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                maxEntries: 50,
                purgeOnQuotaError: false // Automatically cleanup if quota is exceeded
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
//             new workbox.expiration.Plugin({
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
//                 maxEntries: 10,
//                 purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
//             })
//         ]
//     })
// );

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
