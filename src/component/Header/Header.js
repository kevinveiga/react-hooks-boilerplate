import React from 'react';

import { useChangeHeaderScroll, useChangeMenuMobile } from '../../store/header/header';
import { HeaderContext } from '../../store/header/headerContext';

import { HeaderMenu } from './HeaderMenu';
import { Svg } from '../Svg/Svg';

import { BtnMenu, HeaderStyled } from './HeaderStyled';

import { Container } from '../../style/layout';

export const Header = () => {
    const changeHeaderScroll = useChangeHeaderScroll('header');

    const [changeMenuMobile, setChangeMenuMobile] = useChangeMenuMobile();

    return (
        <HeaderContext.Provider value={[changeMenuMobile, setChangeMenuMobile]}>
            <HeaderStyled id="header" active={changeMenuMobile} change={changeHeaderScroll}>
                <Container mx="auto" px={{ d: 4, md: 3 }}>
                    <BtnMenu active={changeMenuMobile} change={changeHeaderScroll} onClick={() => setChangeMenuMobile(true)}>
                        <ul>
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                            <li className="menu-lines" />
                        </ul>
                    </BtnMenu>

                    <Svg active={changeMenuMobile} name="svg-close" onClick={() => setChangeMenuMobile(false)} />

                    <HeaderMenu change={changeHeaderScroll} />
                </Container>
            </HeaderStyled>
        </HeaderContext.Provider>
    );
};
