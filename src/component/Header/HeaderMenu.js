import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { LinkTo } from '../Link/LinkTo';

import { HeaderMenuStyled } from './HeaderMenuStyled';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useContext(HeaderContext);

    return (
        <HeaderMenuStyled active={stateChangeMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo link="/" onClick={() => setStateChangeMenuMobile(false)} text="Início" />
                </li>

                <li>
                    <LinkTo link="/noticias" onClick={() => setStateChangeMenuMobile(false)} text="Notícias" />
                </li>
            </ul>
        </HeaderMenuStyled>
    );
};
