import React, { useContext } from 'react';

import { Context } from '../../store/context';

import { FooterAlternative } from './FooterAlternative';
import { FooterPrincipal } from './FooterPrincipal';

const Footer = () => {
    // CONTEXT
    const { stateFooterAlternativeContext } = useContext(Context);

    return stateFooterAlternativeContext ? <FooterAlternative /> : <FooterPrincipal />;
};

export default Footer;
