import React, { useCallback } from 'react';

import { useApp } from '../../store/app/app';
import { logout } from '../../store/auth/auth';

import { Button } from '../Button/Button';

import { ModalLogoutContainerStyled, ModalLogoutStyled } from './ModalLogoutStyled';

export const ModalLogout = () => {
    // CONTEXT
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();

    // FUNCTION
    const handleLogout = useCallback(
        () => () => {
            logout();

            // Redirecionamento para Home
            window.location.assign('/');
        },
        []
    );

    return (
        <ModalLogoutStyled visible={stateModalLogoutContext}>
            <ModalLogoutContainerStyled>
                <p>
                    Você deseja sair da
                    <br />
                    plataforma?
                </p>

                <Button
                    borderRadius="25px"
                    display="inline-block"
                    fontSize="18px"
                    height="40px"
                    mx="auto"
                    my={3}
                    onClick={handleLogout()}
                    text="Confirmar"
                    textTransform="none"
                    themeSize="small"
                />

                <Button
                    color="colorGray2"
                    display="block"
                    fontSize="18px"
                    mx="auto"
                    onClick={() => setStateModalLogoutContext(false)}
                    text="Cancelar"
                    themeSize="none"
                    themeType="none"
                />
            </ModalLogoutContainerStyled>
        </ModalLogoutStyled>
    );
};
