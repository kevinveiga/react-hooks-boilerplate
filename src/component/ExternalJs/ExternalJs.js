import { useEffect } from 'react';

export const ExternalJs = () => {
    useEffect(() => {
        const firstScript = document.getElementsByTagName('script')[0];

        // Facebook
        if (!document.getElementById('facebook-jssdk')) {
            const scriptFacebook = document.createElement('script');

            scriptFacebook.async = true;
            scriptFacebook.id = 'facebook-jssdk';
            scriptFacebook.src = 'https://connect.facebook.net/en_US/sdk.js';

            firstScript.parentNode.insertBefore(scriptFacebook, firstScript);
        }

        if (!window.fbAsyncInit) {
            /* eslint-disable func-names, no-undef */
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '00000',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v5.0'
                });
            };
            /* eslint-disable func-names, no-undef */
        }

        // Facebook Pixel
        if (!window.fbq) {
            /* eslint-disable func-names, no-multi-assign, no-unused-expressions, prefer-rest-params, prefer-spread */
            const n = (window.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            });
            /* eslint-enable func-names, no-multi-assign, no-unused-expressions, prefer-rest-params, prefer-spread */

            /* eslint-disable no-underscore-dangle */
            if (!window._fbq) {
                window._fbq = n;
            }
            /* eslint-enable no-underscore-dangle */

            n.push = n;
            n.loaded = true;
            n.version = '2.0';
            n.queue = [];

            const scriptFacebookPixel = document.createElement('script');

            scriptFacebookPixel.async = true;
            scriptFacebookPixel.crossorigin = 'anonymous';
            scriptFacebookPixel.src = 'https://connect.facebook.net/en_US/fbevents.js';

            firstScript.parentNode.insertBefore(scriptFacebookPixel, firstScript);
        }

        window.fbq('init', '00000');
        window.fbq('track', 'PageView');

        // Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        const scriptGoogleTagManager = document.createElement('script');

        scriptGoogleTagManager.async = true;
        scriptGoogleTagManager.crossorigin = 'anonymous';
        scriptGoogleTagManager.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WSNTRDP';

        firstScript.parentNode.insertBefore(scriptGoogleTagManager, firstScript);

        return undefined;
    }, []);

    return null;
};
