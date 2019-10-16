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
        case 'svg-no-view':
            return <SvgStore.SvgNoView {...otherProps} />;
        case 'svg-search':
            return <SvgStore.SvgSearch {...otherProps} />;
        case 'svg-valid':
            return <SvgStore.SvgValid {...otherProps} />;
        case 'svg-view':
            return <SvgStore.SvgView {...otherProps} />;
        default:
            return null;
    }
};
