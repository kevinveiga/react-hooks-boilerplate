import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container, Wrap } from '../../../style/layout';
import { P, Title2, Title3, Title4, Title5 } from '../../../style/text';

export const MinhaConta = () => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <HeaderAlternate />

            <main>
                <Container mx="auto" p={{ d: 2, md: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <Box alignContent="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={2 / 7}>
                            <P>teste</P>
                        </Box>

                        <Box alignContent="center" flexWrap="wrap" width={5 / 7}>
                            <Wrap>teste</Wrap>
                        </Box>
                    </Flex>
                </Container>
            </main>

            <FooterAlternate />
        </>
    );
};
