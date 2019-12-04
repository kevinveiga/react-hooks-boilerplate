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

                {/* <li>
                    <LinkTo href="https://libertainvestimentos.com.br" target="_blank" text="Quero Investir" />
                </li> */}

                {/* <li>
                    <LinkTo link="/noticias">Mercado Internacional</LinkTo>
                </li>

                <li>
                    <LinkTo link="/noticias">Renda Fixa</LinkTo>
                </li>

                <li>
                    <LinkTo link="/noticias">Renda Variável</LinkTo>
                </li> */}
            </ul>

            {/* <ul>
                <li>
                    <LinkTo link="/">Produtos</LinkTo>
                </li>

                <li>
                    <LinkTo link="/">Cursos</LinkTo>
                </li>

                <li>
                    <LinkTo link="/quem-somos">Quem Somos</LinkTo>
                </li>
            </ul> */}
        </FooterMenuStyled>
    );
};
