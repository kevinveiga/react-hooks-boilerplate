import React from 'react';

import { LinkTo } from '../../Link/LinkTo';

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
                        <LinkTo
                            link="/minha-conta/meus-dados"
                            obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover', hoverColorLine: 'colorPrimaryHover' }}
                            text="Minha Conta"
                        />
                    </li>

                    <li>
                        <LinkTo
                            link="/minha-conta/cursos"
                            obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover', hoverColorLine: 'colorPrimaryHover' }}
                            text="Cursos"
                        />
                    </li>

                    <li>
                        <LinkTo
                            link="/minha-conta/entrevistas"
                            obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimaryHover', hoverColorLine: 'colorPrimaryHover' }}
                            text="Entrevistas"
                        />
                    </li>
                </ul>
            </MinhaContaMenuStyled>
        </MinhaContaLeftStyled>
    );
};
