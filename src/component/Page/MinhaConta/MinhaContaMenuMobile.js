import React, { useContext } from 'react';

import { HeaderAlternateContext } from '../../../store/header/headerAlternateContext';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // CONTEXT
    const { stateChangeMinhaContaMenuMobileGlobal, setStateChangeMinhaContaMenuMobileGlobal, setStateChangeModalLogoutGlobal } = useContext(HeaderAlternateContext);

    return (
        <MinhaContaMenuMobileStyled active={stateChangeMinhaContaMenuMobileGlobal} {...props}>
            <ul>
                <li>
                    <LinkTo link="/minha-conta/inicio" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMinhaContaMenuMobileGlobal(false)} text="Minha Conta" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/cursos" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMinhaContaMenuMobileGlobal(false)} text="Cursos" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/entrevistas" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMinhaContaMenuMobileGlobal(false)} text="Entrevistas" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/contato" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMinhaContaMenuMobileGlobal(false)} text="Contato" />
                </li>

                <li>
                    <Button color="colorWhite" fontWeight="600" onClick={() => setStateChangeModalLogoutGlobal(true)} text="Sair" themeSize="none" themeType="none" />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
