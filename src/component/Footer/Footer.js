import React from 'react';

import { FooterAlternate } from './FooterAlternate';
import { FooterPrincipal } from './FooterPrincipal';

const Footer = () => {
    // FOOTER ALTERNATE
    const arrayPathName = ['/cadastro', '/esqueceu-senha', '/login', '/minha-conta'];
    let footerAlternate = false;

    for (let i = 0, l = arrayPathName.length; i < l; i += 1) {
        if (arrayPathName[i] === window.location.pathname) {
            footerAlternate = true;

            break;
        }
    }

    return footerAlternate ? <FooterAlternate /> : <FooterPrincipal />;
};

export default Footer;
