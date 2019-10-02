import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { Container, Wrap } from '../../style/layout';
import { P } from '../../style/text';

export const FooterAlternate = () => {
    return (
        <Wrap backgroundColor="colorGrayLight2">
            <Container mx="auto" p={{ d: 2, md: 3 }}>
                <P color="colorGray2" fontSize="12px" mb={0} textAlign="center" themeColor="dark">
                    <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary' }} link="" text="Termos de serviço" /> | <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary' }} link="" text="Política de privacidade" />
                </P>
            </Container>
        </Wrap>
    );
};
