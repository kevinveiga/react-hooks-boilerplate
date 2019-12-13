import React from 'react';

import { useApp } from '../../store/app/app';

import { FooterAlternative } from './FooterAlternative';
import { FooterPrincipal } from './FooterPrincipal';

export const Footer = () => {
    const { stateFooterAlternativeContext } = useApp();

    return stateFooterAlternativeContext ? <FooterAlternative /> : <FooterPrincipal />;
};
