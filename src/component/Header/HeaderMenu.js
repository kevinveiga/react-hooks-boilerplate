import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { PesquisaForm } from '../Form/PesquisaForm';
import { HeaderMenuLinkTo } from './HeaderMenuLinkTo';
import { Svg } from '../Svg/Svg';

import { HeaderMenuPesquisa, HeaderMenuStyled } from './HeaderMenuStyled';

export const HeaderMenu = ({ ...props }) => {
    // ACTION
    const search = () => {
        window.location.pathname = `/pesquisa/${document.getElementById('pesquisa-field-id').value}`;
    };

    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderContext);

    return (
        <HeaderMenuStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <HeaderMenuLinkTo link="/" onClick={() => setStateChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <HeaderMenuLinkTo link="/noticias" onClick={() => setStateChangeMenuMobile(false)} text="Notícias" />
                </li>
            </ul>

            <HeaderMenuPesquisa>
                <PesquisaForm obj={{ color: 'colorWhite' }} />
            </HeaderMenuPesquisa>

            <Svg change={true} name="svg-search" onClick={() => search()} />
        </HeaderMenuStyled>
    );
};
