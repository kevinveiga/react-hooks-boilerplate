import React from 'react';

import { LinkToExternalStyled } from './LinkToExternalStyled';

export const LinkToExternal = ({ ariaLabel = '', children, link = '/', target = '', text = '', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;
    const noOpener = target === '_blank' ? 'noopener' : '';

    return (
        <LinkToExternalStyled aria-label={acessibility} href={link} rel={noOpener} target={target} {...otherProps}>
            {content}
        </LinkToExternalStyled>
    );
};
