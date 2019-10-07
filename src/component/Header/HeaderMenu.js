import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { HeaderMenuLinkTo } from './HeaderMenuLinkTo';
import { Svg } from '../Svg/Svg';

import { HeaderMenuPesquisa, HeaderMenuStyled } from './HeaderMenuStyled';

import { Cell, Grid } from '../../style/grid';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderContext);

    // ACTION
    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    const search = () => {
        window.location.pathname = `/pesquisa/${document.querySelector('input[name="pesquisa_mobile"]').value}`;
    };

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
                <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
                    <Cell width="100%">
                        <Input
                            maxLength="50"
                            name="pesquisa_mobile"
                            placeholder="Procure"
                            obj={{ color: 'colorWhite' }}
                            onKeyDown={(e) => {
                                keyPress(e);
                            }}
                        />
                    </Cell>
                </Grid>
            </HeaderMenuPesquisa>

            <Svg change={true} name="svg-search" onClick={() => search()} />
        </HeaderMenuStyled>
    );
};
