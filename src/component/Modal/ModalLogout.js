import React from 'react';

import { useApp } from '../../store/app/app';
import { logout } from '../../store/auth/auth';

import { Button } from '../Button/Button';

import { P } from '../../style/text';

export const ModalLogout = () => {
    // CONTEXT
    const { setStateModalContext } = useApp();

    // FUNCTION
    const handleLogout = () => () => {
        logout();

        // Redirecionamento para Home da Liberta Investimentos
        window.location.assign('https://libertainvestimentos.com.br/');
    };

    return (
        <>
            <P color="colorWhite" mb={5}>
                Você deseja sair da
                <br />
                plataforma?
            </P>

            <Button
                display="inline-block"
                fontSize="18px"
                height="50px"
                mx="auto"
                mb={3}
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
                onClick={() => setStateModalContext({ visible: false })}
                text="Cancelar"
                themeSize="none"
                themeType="none"
            />
        </>
    );
};
