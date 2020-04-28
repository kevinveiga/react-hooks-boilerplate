import React from 'react';

import { useApp } from '../../../store/app/app';
import { useHeaderAlternative } from '../../../store/header/headerAlternative';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';

import { MinhaContaMenuMobileStyled } from './MinhaContaMenuStyled';

export const MinhaContaMenuMobile = ({ ...props }) => {
    // ACTION
    const { setStateModalLogoutContext } = useApp();
    const [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile] = useHeaderAlternative();

    return (
        <MinhaContaMenuMobileStyled active={stateMinhaContaMenuMobile} {...props}>
            <ul>
                <li>
                    <LinkTo
                        link="/minha-conta/inicio"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobile(false)}
                        text="Minha Conta"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/cursos"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobile(false)}
                        text="Cursos"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/minha-conta/entrevistas"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobile(false)}
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
                        onClick={() => setStateModalLogoutContext(true)}
                        text="Sair"
                        themeSize="none"
                        themeType="none"
                    />
                </li>

                <li>
                    <LinkTo
                        link="/inicio"
                        obj={{ activeColor: 'colorPrimary', hoverColor: 'colorPrimary', hoverColorLine: 'colorPrimary' }}
                        onClick={() => setStateMinhaContaMenuMobile(false)}
                        text="Voltar para Home"
                    />
                </li>
            </ul>
        </MinhaContaMenuMobileStyled>
    );
};
