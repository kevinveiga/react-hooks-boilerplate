import React, { useContext } from 'react';

import { HeaderAlternateContext } from '../../../store/header/headerAlternateContext';

import { LinkTo } from '../../Link/LinkTo';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderAlternateContext);

    return (
        <MinhaContaMenuMobileStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo link="/minha-conta/inicio" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Minha Conta" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/cursos" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Cursos" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/entrevistas" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Entrevistas" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/contato" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Contato" />
                </li>

                <li>
                    <LinkTo link="/falta-link" obj={{ hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Sair" />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
