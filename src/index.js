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

                if (e.data && e.data.type === 'SKIP_WAITING') {
                    wb.skipWaiting();
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

                wb.messageSW({ type: 'SKIP_WAITING' });
            });

            wb.register();
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
