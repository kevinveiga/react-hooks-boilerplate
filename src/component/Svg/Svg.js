import React from 'react';

import * as SvgStore from './SvgStore';

export const Svg = ({ name, ...otherProps }) => {
    switch (name) {
        case 'svg-american-express':
            return <SvgStore.SvgAmericanExpress {...otherProps} />;
        case 'svg-arrow-left':
            return <SvgStore.SvgArrowLeft {...otherProps} />;
        case 'svg-arrow-right':
            return <SvgStore.SvgArrowRight {...otherProps} />;
        case 'svg-bag':
            return <SvgStore.SvgBag {...otherProps} />;
        case 'svg-bitcoin':
            return <SvgStore.SvgBitcoin {...otherProps} />;
        case 'svg-boleto':
            return <SvgStore.SvgBoleto {...otherProps} />;
        case 'svg-camera':
            return <SvgStore.SvgCamera {...otherProps} />;
        case 'svg-cart':
            return <SvgStore.SvgCart {...otherProps} />;
        case 'svg-checked':
            return <SvgStore.SvgChecked {...otherProps} />;
        case 'svg-close':
            return <SvgStore.SvgClose {...otherProps} />;
        case 'svg-elo':
            return <SvgStore.SvgElo {...otherProps} />;
        case 'svg-facebook':
            return <SvgStore.SvgFacebook {...otherProps} />;
        case 'svg-facebook-circle':
            return <SvgStore.SvgFacebookCircle {...otherProps} />;
        case 'svg-flag-brazil':
            return <SvgStore.SvgFlagBrazil {...otherProps} />;
        case 'svg-flag-usa':
            return <SvgStore.SvgFlagUsa {...otherProps} />;
        case 'svg-headphone':
            return <SvgStore.SvgHeadphone {...otherProps} />;
        case 'svg-instagram':
            return <SvgStore.SvgInstagram {...otherProps} />;
        case 'svg-instagram-circle':
            return <SvgStore.SvgInstagramCircle {...otherProps} />;
        case 'svg-invalid':
            return <SvgStore.SvgInvalid {...otherProps} />;
        case 'svg-level':
            return <SvgStore.SvgLevel {...otherProps} />;
        case 'svg-linkedin':
            return <SvgStore.SvgLinkedin {...otherProps} />;
        case 'svg-linkedin-circle':
            return <SvgStore.SvgLinkedinCircle {...otherProps} />;
        case 'svg-lock':
            return <SvgStore.SvgLock {...otherProps} />;
        case 'svg-logo-loader':
            return <SvgStore.SvgLogoLoader {...otherProps} />;
        case 'svg-mastercard':
            return <SvgStore.SvgMastercard {...otherProps} />;
        case 'svg-menu':
            return <SvgStore.SvgMenu {...otherProps} />;
        case 'svg-menu-close':
            return <SvgStore.SvgMenuClose {...otherProps} />;
        case 'svg-minus':
            return <SvgStore.SvgMinus {...otherProps} />;
        case 'svg-next':
            return <SvgStore.SvgNext {...otherProps} />;
        case 'svg-no-view':
            return <SvgStore.SvgNoView {...otherProps} />;
        case 'svg-payment':
            return <SvgStore.SvgPayment {...otherProps} />;
        case 'svg-placeholder-loader':
            return <SvgStore.SvgPlaceholderLoader {...otherProps} />;
        case 'svg-prev':
            return <SvgStore.SvgPrev {...otherProps} />;
        case 'svg-plus':
            return <SvgStore.SvgPlus {...otherProps} />;
        case 'svg-search':
            return <SvgStore.SvgSearch {...otherProps} />;
        case 'svg-time':
            return <SvgStore.SvgTime {...otherProps} />;
        case 'svg-tipo-audio':
            return <SvgStore.SvgTipoAudio {...otherProps} />;
        case 'svg-tipo-download':
            return <SvgStore.SvgTipoDownload {...otherProps} />;
        case 'svg-tipo-imagem':
            return <SvgStore.SvgTipoImagem {...otherProps} />;
        case 'svg-tipo-post':
            return <SvgStore.SvgTipoPost {...otherProps} />;
        case 'svg-tipo-video':
            return <SvgStore.SvgTipoVideo {...otherProps} />;
        case 'svg-trash':
            return <SvgStore.SvgTrash {...otherProps} />;
        case 'svg-twitter':
            return <SvgStore.SvgTwitter {...otherProps} />;
        case 'svg-twitter-circle':
            return <SvgStore.SvgTwitterCircle {...otherProps} />;
        case 'svg-user':
            return <SvgStore.SvgUser {...otherProps} />;
        case 'svg-valid':
            return <SvgStore.SvgValid {...otherProps} />;
        case 'svg-view':
            return <SvgStore.SvgView {...otherProps} />;
        case 'svg-visa':
            return <SvgStore.SvgVisa {...otherProps} />;
        case 'svg-youtube':
            return <SvgStore.SvgYoutube {...otherProps} />;
        case 'svg-youtube-circle':
            return <SvgStore.SvgYoutubeCircle {...otherProps} />;
        default:
            return null;
    }
};
