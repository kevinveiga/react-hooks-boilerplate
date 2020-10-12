import React from 'react';

import { LinkToStyled } from './LinkToStyled';

export const LinkTo = ({ ariaLabel = '', children, link = '/', text = '', ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LinkToStyled aria-label={acessibility} to={link} {...props}>
            {content}
        </LinkToStyled>
    );
};
