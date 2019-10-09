import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { MinhaContaMenu } from './MinhaContaMenu';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { P, Title2, Title3, Title4, Title5 } from '../../../style/text';

export const MinhaContaCursos = () => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <HeaderAlternate />

            <Main>
                <Container mx="auto" px={{ d: 2, lg: 3 }}>
                    <Flex minHeight="calc(100vh - 120px)" display="flex" flexWrap="wrap">
                        <MinhaContaMenu />

                        <MinhaContaCenterStyled p={5} width={{ d: '100%', lg: 8 / 10 }}>
                            Cursos
                        </MinhaContaCenterStyled>
                    </Flex>
                </Container>
            </Main>

            <FooterAlternate />
        </>
    );
};
