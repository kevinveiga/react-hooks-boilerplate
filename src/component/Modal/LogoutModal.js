import React, { useContext } from 'react';

import { HeaderAlternateContext } from '../../store/header/headerAlternateContext';

import { Button } from '../Button/Button';

import { LogoutModalContainerStyled, LogoutModalStyled } from './LogoutModalStyled';

export const LogoutModal = ({ ...props }) => {
    // CONTEXT
    const { setStateChangeModalGlobal } = useContext(HeaderAlternateContext);

    return (
        <LogoutModalStyled {...props}>
            <LogoutModalContainerStyled>
                <p>
                    Você deseja sair da
                    <br />
                    plataforma?
                </p>

                <Button borderRadius="25px" display="inline-block" fontSize={18} height="40px" mx="auto" my={3} text="Confirmar" textTransform="none" themeSize="small" />

                <Button color="colorGray2" display="block" fontSize={18} mx="auto" onClick={() => setStateChangeModalGlobal(false)} themeSize="none" themeType="none">
                    Cancelar
                </Button>
            </LogoutModalContainerStyled>
        </LogoutModalStyled>
    );
};
