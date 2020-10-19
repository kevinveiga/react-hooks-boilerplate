import React from 'react';

import { useApp } from '../../store/app/app';

import { ModalLogout } from './ModalLogout';

import { ModalContainerStyled, ModalStyled } from './ModalStyled';

export const Modal = () => {
    // CONTEXT
    const { stateModalContext } = useApp();

    // VARIABLE
    const { component, visible } = stateModalContext;

    const componentObj = {
        logout: <ModalLogout />
    };

    return (
        <ModalStyled visible={visible}>
            <ModalContainerStyled>{componentObj[component]}</ModalContainerStyled>
        </ModalStyled>
    );
};
