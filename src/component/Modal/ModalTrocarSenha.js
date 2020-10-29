import React from 'react';

import { useApp } from '../../store/app/app';

import { Button } from '../Button/Button';
import { MinhaContaTrocarSenhaForm } from '../Form/MinhaContaTrocarSenhaForm';

import { P } from '../../style/text';

export const ModalTrocarSenha = () => {
    // CONTEXT
    const { setStateModalContext } = useApp();

    return (
        <>
            <P color="colorWhite" mb={5}>
                Trocar senha
            </P>

            <MinhaContaTrocarSenhaForm />

            <Button
                color="colorGray2"
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
