import React, { useCallback, useContext, useState } from 'react';

import { Context } from '../../store/context';
import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { Button } from '../Button/Button';
import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { LinkTo } from '../Link/LinkTo';
// import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderBtnMenuStyled, HeaderPesquisaStyled, HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';
import { variable } from '../../style/variable';

export const Header = () => {
    // CONTEXT
    const { stateHeaderAlternativeContext } = useContext(Context);

    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header');
    const [stateChangeMenuMobileContext, setStateChangeMenuMobileContext] = useChangeMenuMobile();
    const [statePesquisa, setStatePesquisa] = useState(false);

    // Function
    const handleChangeMenuMobile = useCallback(
        (value) => () => {
            setStateChangeMenuMobileContext(value);
        },
        [setStateChangeMenuMobileContext]
    );

    const handlePesquisa = useCallback(
        (value) => () => {
            setStatePesquisa(!value);
        },
        []
    );

    const keyPress = useCallback(
        () => (element) => {
            if (element.keyCode == 13) {
                window.location.pathname = `/pesquisa/${element.target.value}`;
            }
        },
        []
    );

    return !stateHeaderAlternativeContext ? (
        <HeaderContext.Provider value={[stateChangeMenuMobileContext, setStateChangeMenuMobileContext]}>
            <HeaderStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} id="header">
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <Flex
                        alignItems="center"
                        display="flex"
                        flexWrap="wrap"
                        justifyContent={{ d: 'flex-end', md: 'space-between' }}
                        minHeight={{ d: variable.headerHeightMobile, md: variable.headerHeight }}
                    >
                        <Box mx={{ d: 'auto', md: 0 }} width="auto">
                            <LinkTo ariaLabel="Home" link="/inicio">
                                <Svg mr={{ d: 2, md: 3 }} name="svg-logo-liberta" />
                            </LinkTo>
                        </Box>

                        <Box width={{ d: 'auto', md: 7 / 12 }}>
                            <Box display={{ d: 'block', md: 'none' }}>
                                <HeaderBtnMenuStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} onClick={handleChangeMenuMobile(true)}>
                                    <ul>
                                        <li />
                                        <li />
                                        <li />
                                    </ul>
                                </HeaderBtnMenuStyled>

                                <Svg active={stateChangeMenuMobileContext} name="svg-close" onClick={handleChangeMenuMobile(false)} />
                            </Box>

                            <HeaderMenu change={stateChangeHeaderScroll} />
                        </Box>

                        <Box display={{ d: 'none', md: 'block' }} textAlign="right">
                            <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                                <Grid display="grid" gridAutoColumns="1fr" px={2}>
                                    <Cell width="100%">
                                        <Input maxLength="50" name="pesquisa" placeholder="Procure" obj={{ color: stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark' }} onKeyDown={keyPress()} />
                                    </Cell>
                                </Grid>
                            </HeaderPesquisaStyled>

                            <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={handlePesquisa(statePesquisa)} />

                            {/* <Social change={stateChangeHeaderScroll} /> */}

                            <LinkTo ariaLabel="Seja Membro" link="/cadastro">
                                <Button mx={3} text="Seja Membro" textTransform="none" themeSize="small" />
                            </LinkTo>

                            <LinkTo fontWeight="700" link="/login" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} text="Login" />
                        </Box>
                    </Flex>
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    ) : null;
};
