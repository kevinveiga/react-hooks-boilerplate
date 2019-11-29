import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

export const ModalMessage = ({ text }) => {
    return <ModalMessageStyled text={text}>{text}</ModalMessageStyled>;
};
