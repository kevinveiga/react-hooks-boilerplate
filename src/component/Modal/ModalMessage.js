import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

export const ModalMessage = ({ ...otherProps }) => {
    return <ModalMessageStyled {...otherProps}>{otherProps.text}</ModalMessageStyled>;
};
