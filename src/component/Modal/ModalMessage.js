import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

export const ModalMessage = ({ backgroundColor, color, text }) => {
    return (
        <ModalMessageStyled backgroundColor={backgroundColor} color={color} text={text}>
            {text}
        </ModalMessageStyled>
    );
};
