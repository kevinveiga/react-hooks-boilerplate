import React from 'react';

import { useApp } from '../../../store/app/app';
import { useHeaderAlternative } from '../../../store/header/headerAlternative';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // CONTEXT
    const { setStateModalLogoutContext } = useApp();
    const { stateMinhaContaMenuMobileContext, setStateMinhaContaMenuMobileContext } = useHeaderAlternative();

    return (
        <MinhaContaMenuMobileStyled active={stateMinhaContaMenuMobileContext} {...props}>
            <ul>
                <li>
                    <LinkTo
                        link="/minha-conta/meus-dados"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobileContext(false)}
                        text="Minha Conta"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/cursos"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobileContext(false)}
                        text="Cursos"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/entrevistas"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobileContext(false)}
                        text="Entrevistas"
                    />
                </li>

                {/* <li>
                    <LinkTo link="/minha-conta/contato" obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }} onClick={() => setStateMinhaContaMenuMobile(false)} text="Contato" />
                </li> */}

                <li>
                    <Button
                        color="colorWhite"
                        fontWeight="700"
                        obj={{ hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateModalLogoutContext(true)}
                        text="Sair"
                        themeSize="none"
                        themeType="none"
                    />
                </li>

                <li>
                    <LinkTo
                        ariaLabel="Home"
                        link="/inicio"
                        obj={{ hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobileContext(false)}
                        text="Voltar para Home"
                    />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
