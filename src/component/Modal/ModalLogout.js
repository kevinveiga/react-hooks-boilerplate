import React, { useCallback, useContext } from 'react';

import { Context } from '../../store/context';
import { HeaderAlternateContext } from '../../store/header/headerAlternateContext';

import { Button } from '../Button/Button';

import { ModalLogoutContainerStyled, ModalLogoutStyled } from './ModalLogoutStyled';

export const ModalLogout = ({ ...props }) => {
    // CONTEXT
    const { setStateAuthTokenContext } = useContext(Context);
    const { setStateChangeModalLogoutContext } = useContext(HeaderAlternateContext);

    // ACTION
    const handleLogout = useCallback(
        () => () => {
            setStateAuthTokenContext(null);

            // Redirecionamento para Home
            window.location.pathname = '/';
        },
        [setStateAuthTokenContext]
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
