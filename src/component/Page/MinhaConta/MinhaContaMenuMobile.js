import React, { useContext } from 'react';

import { HeaderAlternativeContext } from '../../../store/header/HeaderAlternativeContext';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // CONTEXT
    const { stateChangeMinhaContaMenuMobileContext, setStateChangeMinhaContaMenuMobileContext, setStateChangeModalLogoutContext } = useContext(HeaderAlternativeContext);

    return (
        <MinhaContaMenuMobileStyled active={stateChangeMinhaContaMenuMobileContext} {...props}>
            <ul>
                <li>
                    <LinkTo
                        link="/minha-conta/inicio"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateChangeMinhaContaMenuMobileContext(false)}
                        text="Minha Conta"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/cursos"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateChangeMinhaContaMenuMobileContext(false)}
                        text="Cursos"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/entrevistas"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateChangeMinhaContaMenuMobileContext(false)}
                        text="Entrevistas"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/contato"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateChangeMinhaContaMenuMobileContext(false)}
                        text="Contato"
                    />
                </li>

                <li>
                    <Button color="colorWhite" fontWeight="700" onClick={() => setStateChangeModalLogoutContext(true)} text="Sair" themeSize="none" themeType="none" />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
