import { useEffect } from 'react';

const ExternalJs = () => {
    useEffect(() => {
        // const firstScript = document.getElementsByTagName('script')[0];

        // // Diffuser
        // if (!window.vgo) {
        //     window.visitorGlobalObjectAlias = 'vgo';

        //     /* eslint-disable func-names, prefer-rest-params */
        //     window[window.visitorGlobalObjectAlias] =
        //         window[window.visitorGlobalObjectAlias] ||
        //         function() {
        //             (window[window.visitorGlobalObjectAlias].q = window[window.visitorGlobalObjectAlias].q || []).push(arguments);
        //         };
        //     /* eslint-enable func-names, prefer-rest-params */

        //     window[window.visitorGlobalObjectAlias].l = new Date().getTime();

        //     const scriptDiffuser = document.createElement('script');

        //     scriptDiffuser.async = true;
        //     scriptDiffuser.crossorigin = 'anonymous';
        //     scriptDiffuser.rel = 'preconnect';
        //     scriptDiffuser.src = 'https://diffuser-cdn.app-us1.com/diffuser/diffuser.js';

        //     firstScript.parentNode.insertBefore(scriptDiffuser, firstScript);
        // }

        // window.vgo('setAccount', '475837977');
        // window.vgo('setTrackByDefault', true);
        // window.vgo('process');

        // // Facebook
        // const scriptFacebook = document.createElement('script');

        // scriptFacebook.async = true;
        // scriptFacebook.crossorigin = 'anonymous';
        // scriptFacebook.rel = 'preconnect';
        // scriptFacebook.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0';

        // firstScript.parentNode.insertBefore(scriptFacebook, firstScript);

        // // Facebook Pixel
        // if (!window.fbq) {
        //     /* eslint-disable func-names, no-multi-assign, no-unused-expressions, prefer-rest-params, prefer-spread */
        //     const n = (window.fbq = function() {
        //         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        //     });
        //     /* eslint-enable func-names, no-multi-assign, no-unused-expressions, prefer-rest-params, prefer-spread */

        //     /* eslint-disable no-underscore-dangle */
        //     if (!window._fbq) {
        //         window._fbq = n;
        //     }
        //     /* eslint-enable no-underscore-dangle */

        //     n.push = n;
        //     n.loaded = true;
        //     n.version = '2.0';
        //     n.queue = [];

        //     const scriptFacebookPixel = document.createElement('script');

        //     scriptFacebookPixel.async = true;
        //     scriptFacebookPixel.crossorigin = 'anonymous';
        //     scriptFacebookPixel.rel = 'preconnect';
        //     scriptFacebookPixel.src = 'https://connect.facebook.net/en_US/fbevents.js';

        //     firstScript.parentNode.insertBefore(scriptFacebookPixel, firstScript);
        // }

        // window.fbq('init', '299072640905686');
        // window.fbq('track', 'PageView');

        // // Google Tag Manager
        // window.dataLayer = window.dataLayer || [];
        // window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

        // const scriptGoogleTagManager = document.createElement('script');

        // scriptGoogleTagManager.async = true;
        // scriptGoogleTagManager.crossorigin = 'anonymous';
        // scriptGoogleTagManager.rel = 'preconnect';
        // scriptGoogleTagManager.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WSNTRDP';

        // firstScript.parentNode.insertBefore(scriptGoogleTagManager, firstScript);

        return undefined;
    }, []);

    return null;
};

export default ExternalJs;
