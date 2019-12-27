import React, { lazy, Suspense } from 'react';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { HomeProvider } from '../../../store/home/home';
import { useMeasure } from '../../../store/util/measure';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { Button } from '../../Button/Button';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { HomeDestaque } from './HomeDestaque';
// import { HomeEquipe } from './HomeEquipe';
import { HomeNoticia } from './HomeNoticia';
// import { HomeParceiro } from './HomeParceiro';
import { HomeSuperDestaque } from './HomeSuperDestaque';
import { LinkToExternal } from '../../Link/LinkToExternal';
import { LoaderComponent } from '../../Loader/LoaderComponent';

import { Seo } from '../../Seo/Seo';
import { Svg } from '../../Svg/Svg';

import { VideoContainerStyled } from './HomeStyled';

import { Box, Flex } from '../../../style/flex';
// import { Image } from '../../../style/image';
import { Container, Main, Wrap } from '../../../style/layout';
import { Span, Title2 } from '../../../style/text';
import { variable } from '../../../style/variable';

// import brasilParalelo from '../../../asset/image/brasil-paralelo.png';
// import infomoney from '../../../asset/image/infomoney.png';
// import misesBrasil from '../../../asset/image/mises-brasil.png';
// import nelogica from '../../../asset/image/nelogica.png';
// import xpInvestimentos from '../../../asset/image/xp-investimentos.png';

// LAZY
const HomeVideo = lazy(() => import('./HomeVideo'));

export const Home = ({ location }) => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    // ACTION
    const [stateBannerRef, stateBannerMeasure] = useMeasure(true);
    const windowWidth = useWindowWidth();

    return (
        <>
            <Seo>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Seo>

            <Main>
                <HomeProvider location={location}>
                    <HomeSuperDestaque />

                    <Wrap>
                        <Container id="home-noticias-container" mx="auto" px={3} py={{ d: 3, md: 4 }}>
                            <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                                <HomeDestaque />

                                <HomeNoticia />
                            </Flex>
                        </Container>
                    </Wrap>

                    <VideoContainerStyled id="home-video-container">
                        <Container mx="auto" px={3} py={{ d: 4, md: variable.spacingXL }}>
                            <Title2 themeColor="light">Vídeos Liberta</Title2>

                            <ErrorBoundary>
                                <Suspense fallback={LoaderComponent()}>
                                    <HomeVideo anchor={{ elementId: '#home-video-container', offset: windowWidth < parseInt(variable.md, 10) ? 0 : 80 }} />
                                </Suspense>
                            </ErrorBoundary>

                            <Box textAlign="center">
                                <LinkToExternal link="https://www.youtube.com/channel/UCzIIAGs9UiniQgKtXsgFPnQ" target="_blank">
                                    <Button>
                                        <Svg display={{ d: 'none', lg: 'inline-block' }} height="25px" mr={2} name="svg-youtube" />
                                        <Span verticalAlign="middle">Siga nosso canal no Youtube</Span>
                                    </Button>
                                </LinkToExternal>
                            </Box>
                        </Container>
                    </VideoContainerStyled>

                    {/* <Container mx="auto" my={{ d: 3, md: 4 }} px={3}>
                        <Title2 align="center" themeColor="dark">
                            As lendas do Mercado Financeiro e as grandes empresas com um objetivo: <Span color="colorGreen">a sua Liberdade</Span>
                        </Title2>

                        <Title4 align="center" color="colorGray2" mb={5} themeColor="dark">
                            Conheça alguns de nossos parceiros.
                        </Title4>

                        <Title3 color="colorGray2" fontWeight="700" themeColor="dark">
                            Equipe
                        </Title3>

                        <HomeEquipe />

                        <Title3 color="colorGray2" fontWeight="700" themeColor="dark">
                            Parceiros
                        </Title3>

                        <HomeParceiro />

                        <Title2 align="center" color="colorGray2" themeColor="dark">
                            Empresas Parceiras
                        </Title2>

                        <Flex alignItems="center" display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'space-between' }} mb={5}>
                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Xp Investimentos" url={xpInvestimentos} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Nelogica" url={nelogica} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="InfoMoney" url={infomoney} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Brasil Paralelo" url={brasilParalelo} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Mises Brasil" url={misesBrasil} />
                            </Box>
                        </Flex>
                    </Container> */}
                </HomeProvider>
            </Main>
        </>
    );
};
