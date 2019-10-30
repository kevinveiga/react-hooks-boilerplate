import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { LinkTo } from '../Link/LinkTo';
import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderMenuPesquisaStyled, HeaderMenuStyled } from './HeaderMenuStyled';

import { Cell, Grid } from '../../style/grid';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderContext);

    // ACTION
    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    const search = () => {
        window.location.pathname = `/pesquisa/${document.querySelector('input[name="pesquisa_mobile"]').value}`;
    };

    return (
        <HeaderMenuStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo link="/inicio" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <LinkTo link="/noticias" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Notícias" />
                </li>

                <li>
                    <LinkTo link="/aprenda" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Aprenda" />
                </li>

                <li>
                    <LinkTo link="/inicio/home-video-container" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Vídeos" />
                </li>

                <li>
                    <LinkTo link="/login" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Login" />
                </li>
            </ul>

            <div className="d-block d-lg-none header-menu-Social">
                <HeaderMenuPesquisaStyled>
                    <Grid display="grid" gridAutoColumns="1fr" px={2}>
                        <Cell width="100%">
                            <Input
                                maxLength="50"
                                name="pesquisa_mobile"
                                placeholder="Procure"
                                obj={{ color: 'colorWhite' }}
                                onKeyDown={(e) => {
                                    keyPress(e);
                                }}
                            />
                        </Cell>
                    </Grid>
                </HeaderMenuPesquisaStyled>

                <Svg change={true} name="svg-search" onClick={() => search()} />

                <Social color="colorGray4" />
            </div>
        </HeaderMenuStyled>
    );
};
