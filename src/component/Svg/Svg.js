import React from 'react';

import * as SvgStore from './SvgStore';

export const Svg = ({ name, ...props }) => {
    switch (name) {
        case 'svg-american-express':
            return <SvgStore.SvgAmericanExpress {...props} />;
        case 'svg-arrow-left':
            return <SvgStore.SvgArrowLeft {...props} />;
        case 'svg-arrow-right':
            return <SvgStore.SvgArrowRight {...props} />;
        case 'svg-bag':
            return <SvgStore.SvgBag {...props} />;
        case 'svg-bitcoin':
            return <SvgStore.SvgBitcoin {...props} />;
        case 'svg-boleto':
            return <SvgStore.SvgBoleto {...props} />;
        case 'svg-camera':
            return <SvgStore.SvgCamera {...props} />;
        case 'svg-cart':
            return <SvgStore.SvgCart {...props} />;
        case 'svg-checked':
            return <SvgStore.SvgChecked {...props} />;
        case 'svg-close':
            return <SvgStore.SvgClose {...props} />;
        case 'svg-elo':
            return <SvgStore.SvgElo {...props} />;
        case 'svg-facebook':
            return <SvgStore.SvgFacebook {...props} />;
        case 'svg-facebook-circle':
            return <SvgStore.SvgFacebookCircle {...props} />;
        case 'svg-flag-brazil':
            return <SvgStore.SvgFlagBrazil {...props} />;
        case 'svg-flag-usa':
            return <SvgStore.SvgFlagUsa {...props} />;
        case 'svg-headphone':
            return <SvgStore.SvgHeadphone {...props} />;
        case 'svg-instagram':
            return <SvgStore.SvgInstagram {...props} />;
        case 'svg-instagram-circle':
            return <SvgStore.SvgInstagramCircle {...props} />;
        case 'svg-invalid':
            return <SvgStore.SvgInvalid {...props} />;
        case 'svg-level':
            return <SvgStore.SvgLevel {...props} />;
        case 'svg-linkedin':
            return <SvgStore.SvgLinkedin {...props} />;
        case 'svg-linkedin-circle':
            return <SvgStore.SvgLinkedinCircle {...props} />;
        case 'svg-lock':
            return <SvgStore.SvgLock {...props} />;
        case 'svg-logo-loader':
            return <SvgStore.SvgLogoLoader {...props} />;
        case 'svg-mastercard':
            return <SvgStore.SvgMastercard {...props} />;
        case 'svg-menu':
            return <SvgStore.SvgMenu {...props} />;
        case 'svg-menu-close':
            return <SvgStore.SvgMenuClose {...props} />;
        case 'svg-minus':
            return <SvgStore.SvgMinus {...props} />;
        case 'svg-next':
            return <SvgStore.SvgNext {...props} />;
        case 'svg-no-view':
            return <SvgStore.SvgNoView {...props} />;
        case 'svg-payment':
            return <SvgStore.SvgPayment {...props} />;
        case 'svg-placeholder-loader':
            return <SvgStore.SvgPlaceholderLoader {...props} />;
        case 'svg-prev':
            return <SvgStore.SvgPrev {...props} />;
        case 'svg-plus':
            return <SvgStore.SvgPlus {...props} />;
        case 'svg-search':
            return <SvgStore.SvgSearch {...props} />;
        case 'svg-time':
            return <SvgStore.SvgTime {...props} />;
        case 'svg-tipo-audio':
            return <SvgStore.SvgTipoAudio {...props} />;
        case 'svg-tipo-download':
            return <SvgStore.SvgTipoDownload {...props} />;
        case 'svg-tipo-imagem':
            return <SvgStore.SvgTipoImagem {...props} />;
        case 'svg-tipo-post':
            return <SvgStore.SvgTipoPost {...props} />;
        case 'svg-tipo-video':
            return <SvgStore.SvgTipoVideo {...props} />;
        case 'svg-trash':
            return <SvgStore.SvgTrash {...props} />;
        case 'svg-twitter':
            return <SvgStore.SvgTwitter {...props} />;
        case 'svg-twitter-circle':
            return <SvgStore.SvgTwitterCircle {...props} />;
        case 'svg-user':
            return <SvgStore.SvgUser {...props} />;
        case 'svg-valid':
            return <SvgStore.SvgValid {...props} />;
        case 'svg-view':
            return <SvgStore.SvgView {...props} />;
        case 'svg-visa':
            return <SvgStore.SvgVisa {...props} />;
        case 'svg-youtube':
            return <SvgStore.SvgYoutube {...props} />;
        case 'svg-youtube-circle':
            return <SvgStore.SvgYoutubeCircle {...props} />;
        default:
            return null;
    }
};
