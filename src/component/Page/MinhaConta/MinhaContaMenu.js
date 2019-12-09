import React from 'react';

import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { MinhaContaMenuStyled } from './MinhaContaMenuStyled';
import { MinhaContaLeftStyled } from './MinhaContaStyled';

import { variable } from '../../../style/variable';

export const MinhaContaMenu = () => {
    return (
        <MinhaContaLeftStyled
            alignItems="flex-start"
            display={{ d: 'none', lg: 'flex' }}
            flexWrap="wrap"
            justifyContent="flex-start"
            minHeight={`calc(100vh - ${variable.headerHeightMobile} - ${variable.FooterAlternativeHeight})`}
            pr={2}
            py={5}
            width={2 / 10}
        >
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
                </ul>
            </MinhaContaMenuStyled>
        </MinhaContaLeftStyled>
    );
};
