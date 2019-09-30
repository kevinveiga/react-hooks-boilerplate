import React from 'react';
import { hydrate, render } from 'react-dom';
import { Workbox } from 'workbox-window';

import { App } from './App';

// APP
const renderMethod = module.hot ? render : hydrate;

renderMethod(<App />, document.getElementById('app'));

// SERVICE WORKER REGISTER
const serviceWorkerRegister = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const wb = new Workbox('/sw.js');

            wb.addEventListener('activated', (e) => {
                console.info(`%c The installing Service Worker state is ${e.type}`, 'color: #00bbee;');

                if (e.isUpdate) {
                    window.location.reload();
                }
            });

            wb.addEventListener('activating', (e) => {
                console.info(`%c The installing Service Worker state is ${e.type}`, 'color: #00bbee;');
            });

            wb.addEventListener('installed', (e) => {
                console.info(`%c The installing Service Worker state is ${e.type}`, 'color: #f39c12;');
            });

            wb.addEventListener('installing', (e) => {
                console.info(`%c The installing Service Worker state is ${e.type}`, 'color: #f39c12;');
            });

            wb.addEventListener('message', (e) => {
                console.info('message: ', e);

                if (e.data.type === 'CACHE_UPDATE') {
                    const { updateURL } = e.data.payload;

                    console.info(`%c A new version of ${updateURL} is available`, 'color: #00bbee;');
                }
            });

            wb.addEventListener('redundant', (e) => {
                console.info(`%c The installing Service Worker state is ${e.type}`, 'color: #00bbee;');
            });

            wb.addEventListener('waiting', () => {
                console.info(`%c A new service worker has installed, but it can't activate until all tabs running the current version have fully unloaded`, 'color: #00bbee;');

                wb.addEventListener('controlling', () => {
                    window.location.reload();
                });

                wb.messageSW({ type: 'SKYP_WAITING' });
            });

            wb.register();

            // navigator.serviceWorker
            //     .register('/sw.js')
            //     .then((registration) => {
            //         console.info('%c Service Worker registered: ', 'color: #00bbee;', registration);

            //         registration.addEventListener('updatefound', (e) => {
            //             const installingServiceWorker = e.currentTarget.installing;

            //             console.log('updatefound: ', e);

            //             installingServiceWorker.addEventListener('statechange', (e) => {
            //                 console.log('statechange: ', e);

            //                 switch (e.currentTarget.state) {
            //                     case 'installed':
            //                         console.info('%c The installing Service Worker state is installed', 'color: #f39c12;');

            //                         break;
            //                     case 'installing':
            //                         console.info('%c The installing Service Worker state is installing', 'color: #f39c12;');

            //                         break;
            //                     case 'activated':
            //                         console.info('%c The installing Service Worker state is activated', 'color: #f39c12;');

            //                         break;
            //                     case 'activating':
            //                         console.info('%c The installing Service Worker state is activating', 'color: #f39c12;');

            //                         break;
            //                     case 'redundant':
            //                         console.info('%c The installing Service Worker state is redundant', 'color: #f39c12;');

            //                         break;
            //                     default:
            //                         console.info('%c The installing Service Worker state is undefined', 'color: #f39c12;');
            //                 }
            //             });
            //         });
            //     })
            //     .catch((registrationError) => {
            //         console.error('%c Service Worker registration failed: ', 'color: #dc4b39;', registrationError);
            //     });
        });
    } else {
        console.info('%c Navegador não suporta Service Worker', 'color: #dc4b39;');
    }
};

serviceWorkerRegister();

// HOT MODULE
if (module.hot) {
    module.hot.accept();
}
