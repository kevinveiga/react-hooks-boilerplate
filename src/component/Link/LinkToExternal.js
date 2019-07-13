import React from 'react';

import { LinkToExternalStyled } from './LinkToExternalStyled';

export const LinkToExternal = ({ ariaLabel = '', children, href = '#', target = '', text = '', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;
    const noOpener = target === '_blank' ? 'noopener' : '';

    return (
        <LinkToExternalStyled aria-label={acessibility} href={href} rel={noOpener} target={target} {...otherProps}>
            {content}
        </LinkToExternalStyled>
    );
};
