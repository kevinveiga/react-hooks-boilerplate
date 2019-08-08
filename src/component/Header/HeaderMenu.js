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
                    <LinkTo to="/" onClick={() => setStateChangeMenuMobile(false)}>
                        Início
                    </LinkTo>
                </li>

                <li>
                    <LinkTo to="/noticias" onClick={() => setStateChangeMenuMobile(false)}>
                        Notícias
                    </LinkTo>
                </li>
            </ul>
        </HeaderMenuStyled>
    );
};
