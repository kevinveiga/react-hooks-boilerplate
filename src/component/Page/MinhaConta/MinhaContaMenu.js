import React from 'react';

import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuStyled } from './MinhaContaMenuStyled';
import { MinhaContaLeft } from './MinhaContaStyled';

export const MinhaContaMenu = ({ ...props }) => {
    return (
        <MinhaContaLeft alignContent="flex-start" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" justifyContent="flex-start" px={2} py={5} width={2 / 10}>
            <LinkTo ariaLabel="Home" link="/inicio" mb={5}>
                <Svg className="svg-logo-liberta" name="svg-logo-liberta" />
            </LinkTo>

            <MinhaContaMenuStyled {...props}>
                <ul>
                    <li>
                        <LinkTo link="/minha-conta/inicio" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} text="Minha Conta" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/cursos" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} text="Cursos" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/entrevistas" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} text="Entrevistas" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/contato" obj={{ hoverColor: 'colorPrimary', hoverLine: 'colorPrimary' }} text="Contato" />
                    </li>
                </ul>
            </MinhaContaMenuStyled>
        </MinhaContaLeft>
    );
};