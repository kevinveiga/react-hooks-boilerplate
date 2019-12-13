import React from 'react';

import { FooterAlternative } from './FooterAlternative';
import { FooterPrincipal } from './FooterPrincipal';

export const Footer = ({ alternative }) => {
    return alternative ? <FooterAlternative /> : <FooterPrincipal />;
};
