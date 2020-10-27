import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { FooterMenuStyled } from './FooterMenuStyled';

export const FooterMenu = ({ ...props }) => {
    return (
        <FooterMenuStyled {...props}>
            <ul>
                <li>
                    <LinkTo link="/inicio" text="Início" />
                </li>

                <li>
                    <LinkTo link="/noticias" text="Notícias" />
                </li>

                <li>
                    <LinkTo link="/aprenda" text="Aprenda" />
                </li>

                <li>
                    <LinkTo link="/inicio/home-video" text="Vídeos" />
                </li>
            </ul>
        </FooterMenuStyled>
    );
};
