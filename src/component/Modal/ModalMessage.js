import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

export const ModalMessage = ({ bgColor, color, text }) => {
    return (
        <ModalMessageStyled bgColor={bgColor} color={color} text={text}>
            {text}
        </ModalMessageStyled>
    );
};
