import React, { useState } from 'react';

import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { Svg } from '../Svg/Svg';

import { HeaderBtnMenuStyled, HeaderPesquisaStyled, HeaderStyled } from './HeaderStyled';

import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';

export const Header = ({ ...hide }) => {
    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header');
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useChangeMenuMobile();
    const [statePesquisa, setStatePesquisa] = useState(false);

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    return (
        <HeaderContext.Provider value={[stateChangeMenuMobile, setStateChangeMenuMobile]}>
            <HeaderStyled active={stateChangeMenuMobile} change={stateChangeHeaderScroll} id="header" {...hide}>
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                        <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
                            <Cell width="100%">
                                <Input
                                    maxLength="50"
                                    name="pesquisa"
                                    placeholder="Procure"
                                    obj={{ color: stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark' }}
                                    onKeyDown={(e) => {
                                        keyPress(e);
                                    }}
                                />
                            </Cell>
                        </Grid>
                    </HeaderPesquisaStyled>

                    <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={() => setStatePesquisa(!statePesquisa)} />

                    <HeaderBtnMenuStyled active={stateChangeMenuMobile} change={stateChangeHeaderScroll} onClick={() => setStateChangeMenuMobile(true)}>
                        <ul>
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                        </ul>
                    </HeaderBtnMenuStyled>

                    <Svg active={stateChangeMenuMobile} name="svg-close" onClick={() => setStateChangeMenuMobile(false)} />

                    <HeaderMenu change={stateChangeHeaderScroll} />
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    );
};
