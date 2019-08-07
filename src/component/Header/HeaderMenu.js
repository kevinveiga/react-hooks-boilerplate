import React, { useContext } from 'react';

import { HeaderContext } from '../../store/header/headerContext';

import { LinkTo } from '../Link/LinkTo';

import { HeaderMenuStyled } from './HeaderMenuStyled';

export const HeaderMenu = ({ ...props }) => {
    // CONTEXT
    const [changeMenuMobile, setChangeMenuMobile] = useContext(HeaderContext);

    return (
        <HeaderMenuStyled active={changeMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo to="/" onClick={() => setChangeMenuMobile(false)}>
                        Início
                    </LinkTo>
                </li>

                <li>
                    <LinkTo to="/noticias" onClick={() => setChangeMenuMobile(false)}>
                        Notícias
                    </LinkTo>
                </li>
            </ul>
        </HeaderMenuStyled>
    );
};
