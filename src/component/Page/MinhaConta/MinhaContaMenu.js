import React, { useCallback } from 'react';

import { useApp } from '../../../store/app/app';

import { ModalLogout } from '../../Modal/ModalLogout';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuItemStyled, MinhaContaMenuStyled } from './MinhaContaMenuStyled';
import { MinhaContaLeftStyled } from './MinhaContaStyled';

import { Span } from '../../../style/text';
import { variable } from '../../../style/variable';

export const MinhaContaMenu = () => {
    // CONTEXT
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();

    // FUNCTION
    const handleChangeModalLogout = useCallback(
        (value) => () => {
            setStateModalLogoutContext(value);
        },
        [setStateModalLogoutContext]
    );

    return (
        <>
            <MinhaContaLeftStyled
                alignItems="flex-start"
                display={{ d: 'none', lg: 'flex' }}
                flexWrap="wrap"
                minHeight={`calc(100vh - ${variable.headerHeightMobile} - ${variable.FooterAlternativeHeight})`}
                py={5}
            >
                <MinhaContaMenuStyled>
                    <ul>
                        <li>
                            <MinhaContaMenuItemStyled to="/minha-conta/meus-dados">
                                <Svg name="svg-minha-conta" />
                                <Span>Minha Conta</Span>
                            </MinhaContaMenuItemStyled>
                        </li>

                        <li>
                            <MinhaContaMenuItemStyled to="/minha-conta/cursos">
                                <Svg name="svg-cursos" />
                                <Span>Cursos</Span>
                            </MinhaContaMenuItemStyled>
                        </li>

                        <li>
                            <MinhaContaMenuItemStyled to="/minha-conta/podcasts">
                                <Svg name="svg-podcasts" />
                                <Span>Podcasts</Span>
                            </MinhaContaMenuItemStyled>
                        </li>

                        <li>
                            <MinhaContaMenuItemStyled to="/minha-conta/entrevistas">
                                <Svg name="svg-entrevistas" />
                                <Span mr={2}>Entrevistas</Span>
                            </MinhaContaMenuItemStyled>
                        </li>

                        <li>
                            <button onClick={handleChangeModalLogout(true)}>
                                <Svg name="svg-logout" />
                                <Span>Logout</Span>
                            </button>
                        </li>
                    </ul>
                </MinhaContaMenuStyled>
            </MinhaContaLeftStyled>

            <ModalLogout visible={stateModalLogoutContext} />
        </>
    );
};
