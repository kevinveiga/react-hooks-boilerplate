import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

export const ModalMessage = ({ children, ...otherProps }) => {
    return <ModalMessageStyled {...otherProps}>{children}</ModalMessageStyled>;
};
