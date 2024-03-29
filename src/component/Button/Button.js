import React from 'react';

import { ButtonStyled } from './ButtonStyled';

export const Button = ({ ariaLabel = '', children, text = '', typeButton = 'button', ...props }) => {
    const acessibility = ariaLabel || text;
    const content = children || text;

    return (
        <ButtonStyled aria-label={acessibility} type={typeButton} {...props}>
            {content}
        </ButtonStyled>
    );
};
