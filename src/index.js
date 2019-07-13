import React from 'react';
import { hydrate, render } from 'react-dom';

import { App } from './App';

// APP
const renderMethod = module.hot ? render : hydrate;

renderMethod(<App />, document.getElementById('app'));

// SERVICE WORKER REGISTER
const serviceWorkerRegister = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.info('%c Service Worker registered: ', 'color: #00bbee;', registration);

                    registration.addEventListener('updatefound', (e) => {
                        const installingServiceWorker = e.currentTarget.installing;

                        installingServiceWorker.addEventListener('statechange', (e) => {
                            switch (e.currentTarget.state) {
                                case 'installed':
                                    console.info('%c The installing Service Worker state is installed', 'color: #f39c12;');

                                    break;
                                case 'installing':
                                    console.info('%c The installing Service Worker state is installing', 'color: #f39c12;');

                                    break;
                                case 'activated':
                                    console.info('%c The installing Service Worker state is activated', 'color: #f39c12;');

                                    break;
                                case 'activating':
                                    console.info('%c The installing Service Worker state is activating', 'color: #f39c12;');

                                    break;
                                case 'redundant':
                                    console.info('%c The installing Service Worker state is redundant', 'color: #f39c12;');

                                    break;
                                default:
                                    console.info('%c The installing Service Worker state is undefined', 'color: #f39c12;');
                            }
                        });
                    });
                })
                .catch((registrationError) => {
                    console.error('%c Service Worker registration failed: ', 'color: #dc4b39;', registrationError);
                });
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
