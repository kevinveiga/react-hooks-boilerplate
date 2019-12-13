import React, { useCallback, useContext } from 'react';

import { logout } from '../../store/auth/auth';
import { HeaderAlternativeContext } from '../../store/header/headerAlternativeContext';

import { Button } from '../Button/Button';

import { ModalLogoutContainerStyled, ModalLogoutStyled } from './ModalLogoutStyled';

export const ModalLogout = ({ ...props }) => {
    // CONTEXT
    const { setStateChangeModalLogoutContext } = useContext(HeaderAlternativeContext);

    // ACTION
    const handleLogout = useCallback(
        () => () => {
            logout();

            // Redirecionamento para Home
            window.location.pathname = '/';
        },
        []
    );

    return (
        <ModalLogoutStyled {...props}>
            <ModalLogoutContainerStyled>
                <p>
                    Você deseja sair da
                    <br />
                    plataforma?
                </p>

                <Button borderRadius="25px" display="inline-block" fontSize={18} height="40px" mx="auto" my={3} onClick={handleLogout()} text="Confirmar" textTransform="none" themeSize="small" />

                <Button color="colorGray2" display="block" fontSize={18} mx="auto" onClick={() => setStateChangeModalLogoutContext(false)} text="Cancelar" themeSize="none" themeType="none" />
            </ModalLogoutContainerStyled>
        </ModalLogoutStyled>
    );
};
