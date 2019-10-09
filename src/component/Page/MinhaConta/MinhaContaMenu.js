import React from 'react';

import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuStyled } from './MinhaContaMenuStyled';
import { MinhaContaLeftStyled } from './MinhaContaStyled';

export const MinhaContaMenu = () => {
    return (
        <MinhaContaLeftStyled alignContent="flex-start" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" justifyContent="flex-start" pr={2} py={5} width={2 / 10}>
            <LinkTo ariaLabel="Home" link="/inicio" mb={5}>
                <Svg className="svg-logo-liberta" name="svg-logo-liberta" />
            </LinkTo>

            <MinhaContaMenuStyled>
                <ul>
                    <li>
                        <LinkTo link="/minha-conta/inicio" obj={{ activeColor: 'colorPrimaryHover', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} text="Minha Conta" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/cursos" obj={{ activeColor: 'colorPrimaryHover', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} text="Cursos" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/entrevistas" obj={{ activeColor: 'colorPrimaryHover', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} text="Entrevistas" />
                    </li>

                    <li>
                        <LinkTo link="/minha-conta/contato" obj={{ activeColor: 'colorPrimaryHover', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} text="Contato" />
                    </li>
                </ul>
            </MinhaContaMenuStyled>
        </MinhaContaLeftStyled>
    );
};
