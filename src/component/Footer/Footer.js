import React from 'react';

import { FooterAlternative } from './FooterAlternative';
import { FooterPrincipal } from './FooterPrincipal';

const Footer = () => {
    // FOOTER ALTERNATE
    const arrayPathName = ['/cadastro', '/esqueceu-senha', '/login', '/minha-conta'];
    let FooterAlternative = false;

    for (let i = 0, l = arrayPathName.length; i < l; i += 1) {
        if (arrayPathName[i] === window.location.pathname) {
            FooterAlternative = true;

            break;
        }
    }

    return FooterAlternative ? <FooterAlternative /> : <FooterPrincipal />;
};

export default Footer;
