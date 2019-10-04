import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { FooterAlternate } from '../../Footer/FooterAlternate';
import { MinhaContaForm } from '../../Form/MinhaContaForm';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { MinhaContaMenu } from './MinhaContaMenu';

import { MinhaContaCenter } from './MinhaContaStyled';

import { Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';

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

            <Main header="minhaConta">
                <Container mx="auto" px={{ d: 2, lg: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <MinhaContaMenu />

                        <MinhaContaCenter p={5} width={{ d: '100%', lg: 8 / 10 }}>
                            <MinhaContaForm obj={{ colorLine: 'colorPrimary' }} data={{ nome: 'teste', email: 'teste@teste.com', telefone: '(51) 9-8135-7941', senha: '123456' }} />
                        </MinhaContaCenter>
                    </Flex>
                </Container>
            </Main>

            <FooterAlternate />
        </>
    );
};
