/* eslint no-restricted-globals: "off" */
/* eslint no-underscore-dangle: "off" */
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Fix precache error
cleanupOutdatedCaches();

// Updating SW lifecycle to update the app after user triggered refresh
clientsClaim();
skipWaiting();

// API
// Add all api, except perfil and meus-cursos api
registerRoute(
    new RegExp('.+(/api/v1/)(?!(perfil|cursos/meus-cursos)).+$'),
    new StaleWhileRevalidate({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 50,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// API PERFIL
// Add only perfil api
registerRoute(
    new RegExp('.+(/api/v1/)(?:(perfil)).*$'),
    new NetworkFirst({
        cacheName: 'api-cache-perfil',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// API MEUS CURSOS
// Add only meus-cursos api
registerRoute(
    new RegExp('.+(/api/v1/)(?:(cursos/meus-cursos)).*$'),
    new NetworkFirst({
        cacheName: 'api-cache-meus-cursos',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// APP
// Add same origin, except in precache, css, font, image, js (same origin or cross origin)
registerRoute(
    new RegExp('\\/(?!.+(css|gif|js|jpg|jpeg|png|svg|webp)).*$'),
    new NetworkFirst({
        cacheName: 'app-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// GOOGLE FONTS
registerRoute(
    new RegExp('^(https://fonts.googleapis.com/)'),
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                maxEntries: 10,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// IMG SAME-ORIGIN
// Add same origin, except in asset/image folder or cross-origin app/uploads folder
registerRoute(
    new RegExp('^(?!.+(/app/uploads/))(?:.+(gif|jpg|jpeg|png|svg|webp))$'),
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// IMG CROSS-ORIGIN
registerRoute(
    new RegExp('.+\\..+(/app/uploads/)(?:.+(gif|jpg|jpeg|png|svg|webp))$'),
    new CacheFirst({
        cacheName: 'image-cross-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 30,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// JS SAME-ORIGIN
// Add same origin, except in asset/js folder
registerRoute(
    new RegExp('\\/(?:.+(js|js\\?.+))$'),
    new NetworkFirst({
        cacheName: 'js-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 50,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// JS CROSS-ORIGIN
registerRoute(
    new RegExp('.+\\..+/(?:.+(js|js\\?.+))$'),
    new CacheFirst({
        cacheName: 'js-cross-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
                maxEntries: 15,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded
            })
        ]
    })
);

// URL EXTERNAL - PICSUM
// registerRoute(
//     new RegExp('^https://picsum.photos/id/'),
//     new CacheFirst({
//         cacheName: 'picsum-cache',
//         plugins: [
//             new CacheableResponsePlugin({
//                 headers: {
//                     'X-Is-Cacheable': 'true'
//                 },
//                 statuses: [0, 200]
//             }),
//             new ExpirationPlugin({
//                 maxAgeSeconds: 60 * 60 * 24 * 15, // 15 days
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
//         const cacheFirst = new CacheFirst();
//         event.respondWith(cacheFirst.handle({ request: event.request }));
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

precacheAndRoute(self.__WB_MANIFEST);
