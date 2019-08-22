import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { HeaderMenuLinkTo } from './HeaderMenuLinkTo';

import { HeaderMenuStyled } from './HeaderMenuStyled';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderContext);

    return (
        <HeaderMenuStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <HeaderMenuLinkTo link="/" onClick={() => setStateChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <HeaderMenuLinkTo link="/noticias" onClick={() => setStateChangeMenuMobile(false)} text="Notícias" />
                </li>
            </ul>
        </HeaderMenuStyled>
    );
};
