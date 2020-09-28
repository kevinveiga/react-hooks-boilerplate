import React from 'react';

import { LinkToExternalStyled } from './LinkToExternalStyled';

export const LinkToExternal = ({ ariaLabel = '', children, link = '/', target = '', text = '', ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;
    const noOpener = target === '_blank' ? 'noopener noreferrer' : '';

    return (
        <LinkToExternalStyled aria-label={acessibility} href={link} rel={noOpener} target={target} {...props}>
            {content}
        </LinkToExternalStyled>
    );
};
