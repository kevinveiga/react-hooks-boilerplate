import React, { lazy, Suspense, useEffect } from 'react';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Button } from '../../Button/Button';

import { LinkToExternal } from '../../Link/LinkToExternal';
import { LoaderComponent } from '../../Loader/LoaderComponent';

import { Seo } from '../../Seo/Seo';
import { Svg } from '../../Svg/Svg';

import { VideoContainerStyled } from './HomeStyled';

import { Box, Flex } from '../../../style/flex';
import { Container, Main, Wrap } from '../../../style/layout';
import { Span, Title2 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
const HomeDestaque = lazy(() => import('./HomeDestaque'));
const HomeNoticia = lazy(() => import('./HomeNoticia'));
const HomeSuperDestaque = lazy(() => import('./HomeSuperDestaque'));
const HomeVideo = lazy(() => import('./HomeVideo'));

export const Home = ({ location }) => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    // Verificação de todos os dados da API dos componentes estão carregados
    /* eslint-disable no-underscore-dangle */
    const isDataLoaded = HomeDestaque._status > 0 && HomeNoticia._status > 0 && HomeSuperDestaque._status > 0 && HomeVideo._status > 0;
    /* eslint-enable no-underscore-dangle */

    // ACTION
    const windowWidth = useWindowWidth();

    // Scroll para o topo ou para a section de vídeo
    const ancorId = location.pathname === '/inicio/home-video-container' ? '#home-video-container' : null;

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(ancorId, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80, 500);

        return undefined;
    }, [ancorId, isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            <Seo>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Seo>

            <Main>
                <Suspense fallback={LoaderComponent()}>
                    <HomeSuperDestaque />
                </Suspense>

                <Wrap>
                    <Container id="home-noticias-container" mx="auto" px={3} py={{ d: 3, md: 4 }}>
                        <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                            <Suspense fallback={LoaderComponent()}>
                                <HomeDestaque />
                            </Suspense>

                            <Suspense fallback={LoaderComponent()}>
                                <HomeNoticia />
                            </Suspense>
                        </Flex>
                    </Container>
                </Wrap>

                <VideoContainerStyled id="home-video-container">
                    <Container mx="auto" px={3} py={{ d: 4, md: variable.spacingXL }}>
                        <Title2 themeColor="light">Vídeos Liberta</Title2>

                        <Suspense fallback={LoaderComponent()}>
                            <HomeVideo ancor={{ elementId: '#home-video-container', offset: windowWidth < parseInt(variable.md, 10) ? 0 : 80 }} />
                        </Suspense>

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
            </Main>
        </>
    );
};
