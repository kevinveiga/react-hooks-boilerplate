import React from 'react';

import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { HeaderMenu } from './HeaderMenu';
import { Svg } from '../Svg/Svg';

import { BtnMenu, HeaderStyled } from './HeaderStyled';

import { Container } from '../../style/layout';

export const Header = () => {
    const stateChangeHeaderScroll = useChangeHeaderScroll('header');

    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useChangeMenuMobile();

    return (
        <HeaderContext.Provider value={[stateChangeMenuMobile, setStateChangeMenuMobile]}>
            <HeaderStyled active={stateChangeMenuMobile} change={stateChangeHeaderScroll} id="header">
                <Container mx="auto" px={{ d: 4, md: 3 }}>
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
