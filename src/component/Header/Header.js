import React, { useCallback, useState } from 'react';

import { useApp } from '../../store/app/app';
import { getLocalStorageUser } from '../../store/auth/auth';
import { useChangeHeaderScroll, useHeader } from '../../store/header/header';

import { removeLastName } from '../../util/removeLastName';

import { Button } from '../Button/Button';
import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { LinkTo } from '../Link/LinkTo';
import { LinkToExternal } from '../Link/LinkToExternal';
import { Svg } from '../Svg/Svg';

import {
    HeaderBtnMenuStyled,
    HeaderMinhaContaMenuBackgroundStyled,
    HeaderMinhaContaMenuStyled,
    HeaderMinhaContaNomeStyled,
    HeaderPesquisaStyled,
    HeaderStyled
} from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';
import { variable } from '../../style/variable';

export const Header = () => {
    // CONTEXT
    const { setStateModalLogoutContext } = useApp();
    const { stateMenuMobileContext, setStateMenuMobileContext } = useHeader();

    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header');
    const [statePesquisa, setStatePesquisa] = useState(false);
    const [stateHeaderMinhaContaMenu, setStateHeaderMinhaContaMenu] = useState(false);

    // FUNCTION
    const handleMenuMobile = useCallback(
        (value) => () => {
            setStateMenuMobileContext(value);
        },
        [setStateMenuMobileContext]
    );

    const handleModalLogout = useCallback(
        (value) => () => {
            setStateModalLogoutContext(value);
        },
        [setStateModalLogoutContext]
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
                window.location.assign(`/noticia-pesquisa/${element.target.value}`);
            }
        },
        []
    );

    // DATA
    const user = getLocalStorageUser();

    return (
        <>
            <HeaderStyled active={stateMenuMobileContext} change={stateChangeHeaderScroll} id="header">
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
                                <HeaderBtnMenuStyled
                                    active={stateMenuMobileContext}
                                    change={stateChangeHeaderScroll}
                                    onClick={handleMenuMobile(true)}
                                >
                                    <ul>
                                        <li />
                                        <li />
                                        <li />
                                    </ul>
                                </HeaderBtnMenuStyled>

                                <Svg active={stateMenuMobileContext} name="svg-menu-close" onClick={handleMenuMobile(false)} />
                            </Box>

                            <HeaderMenu change={stateChangeHeaderScroll} />
                        </Box>

                        <Box alignItems="center" display={{ d: 'none', md: 'flex' }} height="50px" textAlign="right">
                            <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                                <Grid display="grid" gridAutoColumns="1fr" px={2}>
                                    <Cell width="100%">
                                        <Input
                                            maxLength="50"
                                            name="pesquisa"
                                            placeholder="Procure"
                                            obj={{ color: stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark' }}
                                            onKeyDown={keyPress()}
                                        />
                                    </Cell>
                                </Grid>
                            </HeaderPesquisaStyled>

                            <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={handlePesquisa(statePesquisa)} />

                            {user && user.nome ? (
                                <Box display="inline-block" minWidth="150px" ml={3}>
                                    <HeaderMinhaContaNomeStyled onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)}>
                                        Olá {removeLastName(user.nome)}
                                        <Svg
                                            active={stateHeaderMinhaContaMenu}
                                            change={stateChangeHeaderScroll}
                                            height="6px"
                                            ml={2}
                                            name="svg-arrow-down"
                                        />
                                    </HeaderMinhaContaNomeStyled>

                                    <HeaderMinhaContaMenuStyled active={stateHeaderMinhaContaMenu} change={stateChangeHeaderScroll}>
                                        <ul>
                                            <li>
                                                <LinkTo
                                                    link="/minha-conta/meus-dados"
                                                    obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }}
                                                    onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)}
                                                    text="Minha Conta"
                                                />
                                            </li>

                                            <li>
                                                <LinkTo
                                                    link="/minha-conta/cursos"
                                                    obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }}
                                                    onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)}
                                                    text="Cursos"
                                                />
                                            </li>

                                            <li>
                                                <LinkTo
                                                    link="/minha-conta/entrevistas"
                                                    obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover' }}
                                                    onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)}
                                                    text="Entrevistas"
                                                />
                                            </li>

                                            <li>
                                                <Button onClick={handleModalLogout(true)} text="Sair" themeSize="none" themeType="none" />
                                            </li>
                                        </ul>
                                    </HeaderMinhaContaMenuStyled>

                                    <HeaderMinhaContaMenuBackgroundStyled
                                        active={stateHeaderMinhaContaMenu}
                                        onClick={handleHeaderMinhaContaMenu(stateHeaderMinhaContaMenu)}
                                    />
                                </Box>
                            ) : (
                                <>
                                    <LinkTo ariaLabel="Seja Membro" link="/cadastro" mx={3}>
                                        <Button text="Seja Membro" themeSize="small" />
                                    </LinkTo>

                                    <LinkTo
                                        fontWeight="700"
                                        link="/login"
                                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                                        text="Login"
                                    />
                                </>
                            )}
                        </Box>
                    </Flex>
                </Container>
            </HeaderStyled>
        </>
    );
};
