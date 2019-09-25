import React, { useState } from 'react';

import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { Svg } from '../Svg/Svg';

import { BtnMenu, HeaderPesquisa, HeaderStyled } from './HeaderStyled';

import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';

export const Header = () => {
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
            <HeaderStyled active={stateChangeMenuMobile} change={stateChangeHeaderScroll} id="header">
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <HeaderPesquisa active={statePesquisa} change={stateChangeHeaderScroll}>
                        <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
                            <Cell width="100%">
                                <Input
                                    color={stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark'}
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
                    </HeaderPesquisa>

                    <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={() => setStatePesquisa(!statePesquisa)} />

                    <BtnMenu active={stateChangeMenuMobile} change={stateChangeHeaderScroll} onClick={() => setStateChangeMenuMobile(true)}>
                        <ul>
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                        </ul>
                    </BtnMenu>

                    <Svg active={stateChangeMenuMobile} name="svg-close" onClick={() => setStateChangeMenuMobile(false)} />

                    <HeaderMenu change={stateChangeHeaderScroll} />
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    );
};
