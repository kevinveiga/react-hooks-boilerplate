import React from 'react';

import * as SvgStore from './SvgStore';

export const Svg = ({ name, ...otherProps }) => {
    switch (name) {
        case 'svg-arrow-left':
            return <SvgStore.SvgArrowLeft {...otherProps} />;
        case 'svg-arrow-right':
            return <SvgStore.SvgArrowRight {...otherProps} />;
        case 'svg-camera':
            return <SvgStore.SvgCamera {...otherProps} />;
        case 'svg-checked':
            return <SvgStore.SvgChecked {...otherProps} />;
        case 'svg-close':
            return <SvgStore.SvgClose {...otherProps} />;
        case 'svg-facebook':
            return <SvgStore.SvgFacebook {...otherProps} />;
        case 'svg-instagram':
            return <SvgStore.SvgInstagram {...otherProps} />;
        case 'svg-invalid':
            return <SvgStore.SvgInvalid {...otherProps} />;
        case 'svg-linkedin':
            return <SvgStore.SvgLinkedin {...otherProps} />;
        case 'svg-logo-loader':
            return <SvgStore.SvgLogoLoader {...otherProps} />;
        case 'svg-menu':
            return <SvgStore.SvgMenu {...otherProps} />;
        case 'svg-menu-close':
            return <SvgStore.SvgMenuClose {...otherProps} />;
        case 'svg-no-view':
            return <SvgStore.SvgNoView {...otherProps} />;
        case 'svg-placeholder-loader':
            return <SvgStore.SvgPlaceholderLoader {...otherProps} />;
        case 'svg-prev':
            return <SvgStore.SvgPrev {...otherProps} />;
        case 'svg-search':
            return <SvgStore.SvgSearch {...otherProps} />;
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
        case 'svg-valid':
            return <SvgStore.SvgValid {...otherProps} />;
        case 'svg-video-camera':
            return <SvgStore.SvgVideoCamera {...otherProps} />;
        case 'svg-view':
            return <SvgStore.SvgView {...otherProps} />;
        default:
            return null;
    }
};
