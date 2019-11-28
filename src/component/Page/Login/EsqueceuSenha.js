import React, { lazy, Suspense } from 'react';

import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { FooterAlternate } from '../../Footer/FooterAlternate';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { P, Title2, Title5 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
const EsqueceuSenhaForm = lazy(() => import('../../Form/EsqueceuSenhaForm'));

export const EsqueceuSenha = ({ location }) => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <Main backgroundColor="colorGrayLight5" header={false}>
                <Flex display="flex" flexWrap="wrap" minHeight={`calc(100vh - ${variable.footerAlternateHeight})`}>
                    <Box alignContent="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                        <Box p={4} width="100%">
                            <P align="right" fontSize="24px" mb={4} textAlign="right" themeColor="light">
                                &quot;Aqui vai uma super frase de
                                <br />
                                propósito para encantar o
                                <br />
                                cliente maroto.&quot;
                            </P>

                            <Title5 fontSize="16px" color="colorPrimary" textAlign="right" themeColor="dark">
                                Autor
                            </Title5>
                        </Box>
                    </Box>

                    <Box width={{ d: '100%', lg: 3 / 7 }}>
                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                            <Box mb={{ d: 4, md: '75px' }} mt={{ d: 0, lg: 4 }} textAlign="center">
                                <Svg name="svg-logo-liberta" />
                            </Box>

                            <Title2 textAlign="center" themeColor="dark">
                                Esqueceu a senha?
                                <br />
                                Receba uma nova por e-mail
                            </Title2>

                            <Suspense fallback={<P themeColor="dark">Carregando...</P>}>
                                <EsqueceuSenhaForm location={location} obj={{ colorLine: 'colorPrimary' }} />
                            </Suspense>
                        </Container>
                    </Box>

                    <Box order={{ d: '-1', lg: '2' }} textAlign={{ d: 'center', lg: 'left' }} width={{ d: '100%', lg: 1 / 7 }}>
                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                            <LinkTo ariaLabel="Home" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/inicio" text="Voltar para home" />
                        </Container>
                    </Box>
                </Flex>
            </Main>

            <FooterAlternate />
        </>
    );
};
