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
    const [stateChangeMenuMobileContext, setStateChangeMenuMobileContext] = useChangeMenuMobile();
    const [statePesquisa, setStatePesquisa] = useState(false);

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    return (
        <HeaderContext.Provider value={[stateChangeMenuMobileContext, setStateChangeMenuMobileContext]}>
            <HeaderStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} id="header" {...hide}>
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                        <Grid display="grid" gridAutoColumns="1fr" px={2}>
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

                    <HeaderBtnMenuStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} onClick={() => setStateChangeMenuMobileContext(true)}>
                        <ul>
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                        </ul>
                    </HeaderBtnMenuStyled>

                    <Svg active={stateChangeMenuMobileContext} name="svg-close" onClick={() => setStateChangeMenuMobileContext(false)} />

                    <HeaderMenu change={stateChangeHeaderScroll} />
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    );
};
