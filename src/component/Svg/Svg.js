import React from 'react';

import * as SvgStore from './SvgStore';

export const Svg = ({ name, ...otherProps }) => {
    switch (name) {
        case 'svg-facebook':
            return <SvgStore.SvgFacebook {...otherProps} />;
        case 'svg-instagram':
            return <SvgStore.SvgInstagram {...otherProps} />;
        case 'svg-linkedin':
            return <SvgStore.SvgLinkedin {...otherProps} />;
        case 'svg-search':
            return <SvgStore.SvgSearch {...otherProps} />;
        default:
            return null;
    }
};
