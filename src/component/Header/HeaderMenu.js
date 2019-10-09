import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { Input } from '../Form/Form';
import { LinkTo } from '../Link/LinkTo';
import { Social } from '../Social/Social';
import { Svg } from '../Svg/Svg';

import { HeaderMenuPesquisa, HeaderMenuStyled } from './HeaderMenuStyled';

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
                    <LinkTo link="/inicio" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <LinkTo link="/noticias" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Notícias" />
                </li>

                <li>
                    <LinkTo link="/aprenda" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Aprenda" />
                </li>

                <li>
                    <LinkTo link="/inicio/home-video-container" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Vídeos" />
                </li>

                <li>
                    <LinkTo link="/login" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Login" />
                </li>

                {/* <li>
                    <LinkToExternal obj={{ hoverColor: 'colorPrimary' }} link="https://assistente.liberta.com.vc" target="_blank" text="Perfil de Investidor" />
                </li>

                {/* <li>
                    <LinkToExternal obj={{ hoverColor: 'colorPrimary' }} link="https://eventos.ibmec.br/fintech/" target="_blank" text="Fintech Week" />
                </li> */}

                {/* <li>
                    <LinkTo link="/aprenda" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Aprenda" />
                </li>

                <li>
                    <LinkTo link="/quem-somos" obj={{ activeNav: true, hoverColor: 'colorPrimary' }} onClick={() => setStateChangeMenuMobile(false)} text="Quem Somos" />
                </li> */}
            </ul>

            <div className="d-block d-lg-none header-menu-Social">
                <HeaderMenuPesquisa>
                    <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
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
                </HeaderMenuPesquisa>

                <Svg change={true} name="svg-search" onClick={() => search()} />

                <Social color="colorGray4" />
            </div>
        </HeaderMenuStyled>
    );
};
