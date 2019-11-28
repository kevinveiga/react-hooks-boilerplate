import React, { useCallback, useState } from 'react';

import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { Button } from '../Button/Button';
import { Input } from '../Form/Form';
import { HeaderMenu } from './HeaderMenu';
import { LinkTo } from '../Link/LinkTo';
import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderBtnMenuStyled, HeaderPesquisaStyled, HeaderStyled } from './HeaderStyled';

import { Cell, Grid } from '../../style/grid';
import { Container } from '../../style/layout';

export const Header = ({ ...hide }) => {
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

    return (
        <HeaderContext.Provider value={[stateChangeMenuMobileContext, setStateChangeMenuMobileContext]}>
            <HeaderStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} id="header" {...hide}>
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <div className="row align-items-center justify-content-end justify-content-lg-between no-gutters">
                        <div className="col-10 col-lg-auto text-center text-lg-left">
                            <LinkTo ariaLabel="Home" link="/inicio">
                                <Svg className="svg-logo-liberta" name="svg-logo-liberta" />
                            </LinkTo>
                        </div>

                        <div className="col-auto col-xl-7">
                            <div className="d-block d-lg-none text-center">
                                <HeaderBtnMenuStyled active={stateChangeMenuMobileContext} change={stateChangeHeaderScroll} onClick={handleChangeMenuMobile(true)}>
                                    <ul>
                                        <li className="menu-lines" />
                                        <li className="menu-lines" />
                                        <li className="menu-lines" />
                                    </ul>
                                </HeaderBtnMenuStyled>

                                <Svg active={stateChangeMenuMobileContext} name="svg-close" onClick={handleChangeMenuMobile(false)} />
                            </div>

                            <HeaderMenu change={stateChangeHeaderScroll} />
                        </div>

                        <div className="col-auto d-none d-lg-block text-right header-right">
                            <HeaderPesquisaStyled active={statePesquisa} change={stateChangeHeaderScroll}>
                                <Grid display="grid" gridAutoColumns="1fr" px={2}>
                                    <Cell width="100%">
                                        <Input maxLength="50" name="pesquisa" placeholder="Procure" obj={{ color: stateChangeHeaderScroll ? 'colorWhite' : 'colorGrayDark' }} onKeyDown={keyPress()} />
                                    </Cell>
                                </Grid>
                            </HeaderPesquisaStyled>

                            <Svg change={stateChangeHeaderScroll} name="svg-search" onClick={handlePesquisa(statePesquisa)} />

                            <Social change={stateChangeHeaderScroll} />

                            <LinkTo ariaLabel="Cadastra-se" link="/cadastro">
                                <Button text="Cadastra-se" textTransform="none" themeSize="small" />
                            </LinkTo>
                        </div>
                    </div>
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    );
};
