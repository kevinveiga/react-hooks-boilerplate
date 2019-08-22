import React from 'react';

import { HeaderMenuLinkToStyled } from './HeaderMenuLinkToStyled';

export const HeaderMenuLinkTo = ({ ariaLabel = '', children, text = '', link = '/', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <HeaderMenuLinkToStyled aria-label={acessibility} to={link} {...otherProps}>
            {content}
        </HeaderMenuLinkToStyled>
    );
};
