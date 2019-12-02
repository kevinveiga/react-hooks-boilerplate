import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { FooterAlternateStyled } from './FooterAlternateStyled';

import { Container } from '../../style/layout';
import { P } from '../../style/text';

export const FooterAlternate = () => {
    return (
        <FooterAlternateStyled>
            <Container mx="auto" p={3}>
                <P color="colorGray2" fontSize="12px" mb={0} textAlign="center" themeColor="dark">
                    <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary' }} link="/falta-link" text="Termos de serviço" /> | <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary' }} link="/falta-link" text="Política de privacidade" />
                </P>
            </Container>
        </FooterAlternateStyled>
    );
};
