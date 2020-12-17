import React, { useCallback } from 'react';

import { getLocalStorageUser } from '../../store/auth/auth';
import { useHeader } from '../../store/header/header';

import { Input } from '../Form/Form';
import { LinkTo } from '../Link/LinkTo';
import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderMenuMobileStyled, HeaderMenuPesquisaStyled, HeaderMenuStyled } from './HeaderMenuStyled';

import { Box } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const { stateMenuMobileContext, setStateMenuMobileContext } = useHeader();

    // FUNCTION
    const handleMenuMobile = useCallback(
        (value) => () => {
            setStateMenuMobileContext(value);
        },
        [setStateMenuMobileContext]
    );

    const keyPress = useCallback(
        () => (event) => {
            if (event.keyCode == 13) {
                window.location.assign(`/pesquisa/${event.target.value}`);
            }
        },
        []
    );

    const search = useCallback(
        () => () => {
            window.location.assign(`/pesquisa/${document.querySelector('input[name="pesquisa_mobile"]').value}`);
        },
        []
    );

    // DATA
    const user = getLocalStorageUser();

    return (
        <HeaderMenuStyled active={stateMenuMobileContext} {...props}>
            <ul>
                <li>
                    <LinkTo
                        link="/inicio"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                        onClick={handleMenuMobile(false)}
                        text="Início"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/noticias"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                        onClick={handleMenuMobile(false)}
                        text="Notícias"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/aprenda"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                        onClick={handleMenuMobile(false)}
                        text="Aprenda"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/inicio/home-video"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                        onClick={handleMenuMobile(false)}
                        text="Vídeos"
                    />
                </li>
            </ul>

            <Box display={{ d: 'block', md: 'none' }}>
                {user && user.nome ? (
                    <ul>
                        <li>
                            <LinkTo
                                fontWeight="700"
                                link="/minha-conta/cursos"
                                obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                                onClick={handleMenuMobile(false)}
                                text={`Olá ${user.nome}`}
                            />
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <LinkTo
                                fontWeight="700"
                                link="/cadastro"
                                obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }}
                                text="Seja Membro"
                            />
                        </li>

                        <li>
                            <LinkTo fontWeight="700" link="/login" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} text="Login" />
                        </li>
                    </ul>
                )}
            </Box>

            <HeaderMenuMobileStyled display={{ d: 'block', md: 'none' }}>
                <HeaderMenuPesquisaStyled>
                    <Grid display="grid" gridAutoColumns="1fr" px={2}>
                        <Cell width="100%">
                            <Input maxLength="50" name="pesquisa_mobile" obj={{ color: 'colorWhite' }} onKeyDown={keyPress()} placeholder="Procure" />
                        </Cell>
                    </Grid>
                </HeaderMenuPesquisaStyled>

                <Svg change={true} name="svg-search" onClick={search()} />

                <Social color="colorGray4" />
            </HeaderMenuMobileStyled>
        </HeaderMenuStyled>
    );
};
