import React, { useCallback, useContext, useState } from 'react';

import { Context } from '../../store/context';
import { useChangeHeaderScroll, useChangeMenuMobile, useChangeModalLogout } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { Button } from '../Button/Button';
import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { LinkTo } from '../Link/LinkTo';
import { ModalLogout } from '../Modal/ModalLogout';
// import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderBtnMenuStyled, HeaderMinhaContaMenuStyled, HeaderPesquisaStyled, HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';
import { variable } from '../../style/variable';

export const Header = () => {
    // CONTEXT
    const { stateHeaderAlternativeContext, stateUserContext } = useContext(Context);

    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header');
    const [stateChangeMenuMobileContext, setStateChangeMenuMobileContext] = useChangeMenuMobile();
    const [stateChangeModalLogout, setStateChangeModalLogout] = useChangeModalLogout();
    const [statePesquisa, setStatePesquisa] = useState(false);
    const [stateHeaderMinhaContaMenu, setStateHeaderMinhaContaMenu] = useState(false);

    // Function
    const handleChangeMenuMobile = useCallback(
        (value) => () => {
            setStateChangeMenuMobileContext(value);
        },
        [setStateChangeMenuMobileContext]
    );

    const handleChangeModalLogout = useCallback(
        (value) => () => {
            setStateChangeModalLogout(value);
        },
        [setStateChangeModalLogout]
    );

    const handleHeaderMinhaContaMenu = useCallback(
        (value) => () => {
            setStateHeaderMinhaContaMenu(!value);
        },
        []
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

                        <Box alignItems="center" display={{ d: 'none', md: 'flex' }} height="50px" textAlign="right">
                            <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                                <Grid display="grid" gridAutoColumns="1fr" px={2}>
                                    <Cell width="100%">
                                        <Input maxLength="50" name="pesquisa" placeholder="Procure" obj={{ color: stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark' }} onKeyDown={keyPress()} />
                                    </Cell>
                                </Grid>
                            </HeaderPesquisaStyled>

                            <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={handlePesquisa(statePesquisa)} />

                            {/* <Social change={stateChangeHeaderScroll} /> */}

                            {stateUserContext && stateUserContext.nome ? (
                                <Box display="inline-block" ml={3}>
                                    <Button onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)} textTransform="none" themeSize="none" themeType="none">
                                        Olá {stateUserContext.nome}
                                        <Svg active={stateHeaderMinhaContaMenu} change={stateChangeHeaderScroll} height="6px" ml={2} name="svg-arrow-down" />
                                    </Button>

                                    <HeaderMinhaContaMenuStyled active={stateHeaderMinhaContaMenu} change={stateChangeHeaderScroll}>
                                        <ul>
                                            <li>
                                                <LinkTo link="/minha-conta/inicio" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }} text="Minha Conta" />
                                            </li>

                                            <li>
                                                <LinkTo link="/minha-conta/cursos" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }} text="Cursos" />
                                            </li>

                                            <li>
                                                <LinkTo link="/minha-conta/entrevistas" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }} text="Entrevistas" />
                                            </li>

                                            <li>
                                                <Button onClick={handleChangeModalLogout(true)} text="Sair" themeSize="none" themeType="none" />
                                            </li>
                                        </ul>
                                    </HeaderMinhaContaMenuStyled>
                                </Box>
                            ) : (
                                <>
                                    <LinkTo ariaLabel="Seja Membro" link="/cadastro" mx={3}>
                                        <Button text="Seja Membro" textTransform="none" themeSize="small" />
                                    </LinkTo>

                                    <LinkTo fontWeight="700" link="/login" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} text="Login" />
                                </>
                            )}
                        </Box>
                    </Flex>
                </Container>
            </HeaderStyled>

            <ModalLogout visible={stateChangeModalLogout} />
        </HeaderContext.Provider>
    ) : null;
};
