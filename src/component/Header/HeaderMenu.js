import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { HeaderMenuLinkTo } from './HeaderMenuLinkTo';
import { Svg } from '../Svg/Svg';

import { HeaderMenuPesquisa, HeaderMenuStyled } from './HeaderMenuStyled';

import { Cell, Grid } from '../../style/grid';

export const HeaderMenu = ({ ...props }) => {
    // ACTION
    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

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
                <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
                    <Cell width="100%">
                        <Input
                            color="colorWhite"
                            id="pesquisa-field-id"
                            maxLength="50"
                            name="pesquisa"
                            placeholder="Procure"
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
