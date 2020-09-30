import React, { useContext } from 'react';

import { useApp } from '../../../store/app/app';
import { MinhaContaMenuContext } from '../../../store/minhaConta/minhaContaMenuContext';

import { Button } from '../../Button/Button';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuItemStyled, MinhaContaMenuStyled } from './MinhaContaMenuStyled';
import { MinhaContaLeftStyled } from './MinhaContaStyled';

import { Span } from '../../../style/text';
import { variable } from '../../../style/variable';

export const MinhaContaMenu = () => {
    // CONTEXT
    const { setStateModalLogoutContext } = useApp();
    const { stateHideMenuContext, setStateHideMenuContext } = useContext(MinhaContaMenuContext);

    return (
        <>
            <MinhaContaLeftStyled
                alignItems="flex-start"
                display={{ d: 'none', lg: 'flex' }}
                flexWrap="wrap"
                minHeight={`calc(100vh - ${variable.headerHeightMobile} - ${variable.FooterAlternativeHeight})`}
                py={4}
            >
                <Button
                    borderRadius="0"
                    fontSize="12px"
                    fontWeight="400"
                    height="20px"
                    marginBottom={4}
                    marginX="auto"
                    onClick={() => setStateHideMenuContext(!stateHideMenuContext)}
                    textDecoration="underline"
                    themeSize="none"
                    themeType="none"
                >
                    {stateHideMenuContext ? <Svg fill="colorSecondary" name="svg-menu" /> : 'Esconder Menu'}
                </Button>

                <MinhaContaMenuStyled hide={stateHideMenuContext}>
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
                            <MinhaContaMenuItemStyled to="/minha-conta/entrevistas">
                                <Svg name="svg-entrevistas" />
                                <Span>Entrevistas</Span>
                            </MinhaContaMenuItemStyled>
                        </li>

                        <li>
                            <button onClick={() => setStateModalLogoutContext(true)}>
                                <Svg name="svg-logout" />
                                <Span>Logout</Span>
                            </button>
                        </li>
                    </ul>
                </MinhaContaMenuStyled>
            </MinhaContaLeftStyled>
        </>
    );
};
