import React from 'react';

import { ModalMessageStyled } from './ModalMessageStyled';

const ModalMessage = ({ text }) => {
    return <ModalMessageStyled text={text}>{text}</ModalMessageStyled>;
};

export default ModalMessage;
