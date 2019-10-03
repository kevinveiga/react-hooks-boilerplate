import React, { useContext } from 'react';

import { HeaderAlternateContext } from '../../../store/header/headerAlternateContext';

import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderAlternateContext);

    return (
        <MinhaContaMenuMobileStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo link="/minha-conta/inicio" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Minha Conta" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/cursos" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Cursos" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/entrevistas" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Entrevistas" />
                </li>

                <li>
                    <LinkTo link="/minha-conta/contato" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Contato" />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
