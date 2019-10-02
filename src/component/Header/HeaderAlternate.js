import React from 'react';

import { LinkTo } from '../Link/LinkTo';

import { Box, Flex } from '../../style/flex';
import { Container, Wrap } from '../../style/layout';

export const HeaderAlternate = () => {
    return (
        <Wrap backgroundColor="colorBlack3">
            <Container mx="auto" p={{ d: 2, md: 3 }}>
                <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                    <Box>
                        <LinkTo color="colorPrimary" fontWeight="600" hover="primaryHover" link="/minha-conta" text="Minha Conta" />
                    </Box>

                    <Box>
                        <LinkTo color="colorGray2" obj={{ hoverColor: 'colorWhite' }} fontWeight="600" link="/minha-conta" text="Logout" />
                    </Box>
                </Flex>
            </Container>
        </Wrap>
    );
};
