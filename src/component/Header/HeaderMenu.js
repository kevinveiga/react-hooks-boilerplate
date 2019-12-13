import React, { useCallback, useContext } from 'react';

import { getLocalStorageUser } from '../../store/auth/auth';
import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { LinkTo } from '../Link/LinkTo';
import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderMenuMobileStyled, HeaderMenuPesquisaStyled, HeaderMenuStyled } from './HeaderMenuStyled';

import { Box } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobileContext, setStateChangeMenuMobileContext] = useContext(HeaderContext);

    // Function
    const handleChangeMenuMobile = useCallback(
        (value) => () => {
            setStateChangeMenuMobileContext(value);
        },
        [setStateChangeMenuMobileContext]
    );

    const keyPress = useCallback(
        () => (element) => {
            if (element.keyCode == 13) {
                window.location.pathname = `/pesquisa/${element.target.value}`;
            }
        },
        []
    );

    const search = useCallback(
        () => () => {
            window.location.pathname = `/pesquisa/${document.querySelector('input[name="pesquisa_mobile"]').value}`;
        },
        []
    );

    // DATA
    const user = getLocalStorageUser();

    return (
        <HeaderMenuStyled active={stateChangeMenuMobileContext} {...props}>
            <ul>
                <li>
                    <LinkTo link="/inicio" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={handleChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <LinkTo link="/noticias" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={handleChangeMenuMobile(false)} text="Notícias" />
                </li>

                <li>
                    <LinkTo link="/aprenda" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={handleChangeMenuMobile(false)} text="Aprenda" />
                </li>

                <li>
                    <LinkTo link="/inicio/home-video-container" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={handleChangeMenuMobile(false)} text="Vídeos" />
                </li>

                {/* <li>
                    <LinkToExternal obj={{ hoverColor: 'colorPrimary' }} link="https://assistente.liberta.com.vc" target="_blank" text="Perfil de Investidor" />
                </li>

                {/* <li>
                    <LinkToExternal obj={{ hoverColor: 'colorPrimary' }} link="https://pages.liberta.com.vc/fintech-week-2019/" target="_blank" text="Fintech Week" />
                </li> */}

                {/* <li>
                    <LinkTo link="/quem-somos" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={handleChangeMenuMobile(false)} text="Quem Somos" />
                </li> */}
            </ul>

            <Box display={{ d: 'block', md: 'none' }}>
                {user && user.nome ? (
                    <ul>
                        <li>
                            <LinkTo
                                color="colorWhite"
                                fontWeight="700"
                                link="/minha-conta/inicio"
                                obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                                onClick={handleChangeMenuMobile(false)}
                                text={`Olá ${user.nome}`}
                            />
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <LinkTo color="colorWhite" fontWeight="700" link="/cadastro" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} text="Seja Membro" />
                        </li>

                        <li>
                            <LinkTo color="colorWhite" fontWeight="700" link="/login" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} text="Login" />
                        </li>
                    </ul>
                )}
            </Box>

            <HeaderMenuMobileStyled display={{ d: 'block', md: 'none' }}>
                <HeaderMenuPesquisaStyled>
                    <Grid display="grid" gridAutoColumns="1fr" px={2}>
                        <Cell width="100%">
                            <Input maxLength="50" name="pesquisa_mobile" placeholder="Procure" obj={{ color: 'colorWhite' }} onKeyDown={keyPress()} />
                        </Cell>
                    </Grid>
                </HeaderMenuPesquisaStyled>

                <Svg change={true} name="svg-search" onClick={search()} />

                <Social color="colorGray4" />
            </HeaderMenuMobileStyled>
        </HeaderMenuStyled>
    );
};
