import React from 'react';

import { LinkToStyled } from './LinkToStyled';

export const LinkTo = ({ ariaLabel = '', children, text = '', link = '/', ...otherProps }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <LinkToStyled aria-label={acessibility} to={link} {...otherProps}>
            {content}
        </LinkToStyled>
    );
};
