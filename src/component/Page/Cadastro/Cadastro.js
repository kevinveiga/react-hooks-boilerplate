import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { Context } from '../../../store/context';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container, Wrap } from '../../../style/layout';
import { P, Title2, Title3, Title4, Title5 } from '../../../style/text';

// LAZY
const CadastroForm = lazy(() => import('../../Form/CadastroForm'));

export const Cadastro = () => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    // CONTEXT
    const { setStateHideFooterGlobal, setStateHideHeaderGlobal } = useContext(Context);

    // ACTION
    useEffect(() => {
        setStateHideFooterGlobal(true);
        setStateHideHeaderGlobal(true);
    }, [setStateHideFooterGlobal, setStateHideHeaderGlobal]);

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <main>
                <Wrap>
                    <Flex display="flex" flexWrap="wrap">
                        <Box alignContent="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                            <BgImageLazyLoad overlayColor="colorBlackTransparent3" url="https://picsum.photos/id/1011/1024/768" />

                            <Box p={4} width="100%">
                                <P align="right" fontSize="24px" mb={4} textAlign="right" themeColor="light">
                                    Aqui vai uma super frase de
                                    <br />
                                    propósito para encantar o
                                    <br />
                                    cliente maroto.
                                </P>

                                <Title5 fontSize="16px" color="colorPrimary" textAlign="right" themeColor="dark">
                                    Autor
                                </Title5>
                            </Box>
                        </Box>

                        <Box width={{ d: '100%', lg: 3 / 7 }}>
                            <Container minHeight="100vh" mx="auto" px={3} py={{ d: 4, md: 5 }}>
                                <Box mb={{ d: 4, md: '75px' }} mt={{ d: 0, lg: 4 }} textAlign="center">
                                    <Svg className="svg-logo-liberta" name="svg-logo-liberta" />
                                </Box>

                                <Title4 align="center" color="colorGray2" themeColor="dark">
                                    Faça seu cadastro
                                </Title4>

                                <Title2 align="center" fontWeight="600" themeColor="dark">
                                    e comece a aprender
                                </Title2>

                                <Suspense fallback={<Title5 themeColor="dark">Carregando...</Title5>}>
                                    <CadastroForm obj={{ colorLine: 'colorPrimary' }} />
                                </Suspense>
                            </Container>
                        </Box>

                        <Box order={{ d: '-1', lg: '2' }} textAlign={{ d: 'center', lg: 'left' }} width={{ d: '100%', lg: 1 / 7 }}>
                            <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                                <LinkTo ariaLabel="Home" hover="primary" link="/inicio" text="Voltar para home" underline={true} />
                            </Container>
                        </Box>
                    </Flex>
                </Wrap>

                <Wrap backgroundColor="colorGrayLight2">
                    <Container mx="auto" p={{ d: 2, md: 3 }}>
                        <P color="colorGray2" fontSize="12px" mb={0} textAlign="center" themeColor="dark">
                            <LinkTo fontWeight="600" hover="primary" link="" text="Termos de serviço" /> | <LinkTo fontWeight="600" hover="primary" link="" text="Política de privacidade" />
                        </P>
                    </Container>
                </Wrap>
            </main>
        </>
    );
};
