import React, { lazy, Suspense } from 'react';
// import { isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet-async';
// import Slider from 'react-slick';

// import { apiUrlHome } from '../../../config';

// import { useDestaqueApi } from '../../../service/destaque';
// import { useNoticiaApi } from '../../../service/noticia';
// import { useParceiroApi } from '../../../service/parceiro';
// import { useSeoApi } from '../../../service/seo';
// import { useSuperDestaqueApi } from '../../../service/superDestaque';
// import { useVideoApi } from '../../../service/video';

// import { useMeasure } from '../../../store/util/measure';

// import { groupByMod } from '../../../util/groupBy';
// import { scrollTo } from '../../../util/scrollTo';

// import { BannerRight } from '../../Banner/BannerRight';
// import { DotBtn, DotContainer, NextBtn, PrevBtn } from '../../Carousel/CarouselButton';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
// import { LinkToExternal } from '../../Link/LinkToExternal';
import { NoticiaBox } from '../Noticia/NoticiaBox';
import { Svg } from '../../Svg/Svg';

// import { BannerCell, BannerContainer } from '../../Banner/BannerStyled';
// import { CarouselStyled } from '../../Carousel/CarouselStyled';
// import { VideoContainer } from './HomeStyled';
import { Author, DateTime, Tag, Title } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Background, Container, Main } from '../../../style/layout';
import { Span, Title2, Title4, Title5 } from '../../../style/text';
// import { variable } from '../../../style/variable';

// LAZY
// const HomeVideo = lazy(() => import('./HomeVideo'));

export const Home = ({ location }) => {
    // API
    // const stateDestaques = useDestaqueApi(`${apiUrlHome}/destaques`, {});
    // const [stateNoticias] = useNoticiaApi(`${apiUrlHome}/ultimas_noticias`, {});
    // const stateParceiros = useParceiroApi(`${apiUrlHome}/parceiros`, {});
    // const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});
    // const stateSuperDestaques = useSuperDestaqueApi(`${apiUrlHome}/super_destaques`, {});
    // const stateVideos = useVideoApi(`${apiUrlHome}/videos`, {});

    // const destaquesLength = stateDestaques.data.length;
    // const noticiasLength = stateNoticias.data.length;
    // const parceirosLength = stateParceiros.data.length;
    // const superDestaquesLength = stateSuperDestaques.data.length;
    // const videosLength = stateVideos.data.length;

    const stateDestaques = [];
    const stateNoticias = [];
    const destaquesLength = 5;
    const noticiasLength = 5;

    // Verificação se todos os dados de API estão carregados
    // const isDataLoaded = destaquesLength > 0 && noticiasLength > 0 && parceirosLength > 0 && superDestaquesLength > 0 && videosLength > 0;

    // Agrupando itens com um grupo de 3
    // const objectItens = superDestaquesLength > 0 ? groupByMod(stateSuperDestaques.data, 3) : {};

    // ACTION
    // const [stateCurrentVideo, setStateCurrentVideo] = useCurrentVideo({});
    // const [stateBannerRef, stateBannerMeasure] = useMeasure(true);

    // Scroll para o topo ou para a section de vídeo
    // const ancorId = window.location.pathname === '/inicio/home-video-container' ? '#home-video-container' : null;

    // scrollTo(ancorId, isDataLoaded, isMobile ? 0 : 80);

    // CAROUSEL
    // const carouselOptions = {
    //     appendDots: (dots) => <DotContainer>{dots}</DotContainer>,
    //     autoplay: true,
    //     autoplaySpeed: 4250,
    //     customPaging: () => <DotBtn />,
    //     dots: true,
    //     infinite: true,
    //     nextArrow: <NextBtn />,
    //     pauseOnHover: true,
    //     prevArrow: <PrevBtn />,
    //     speed: 1250,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     swipe: false
    // };

    return (
        <>
            <Helmet>{/* <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} /> */}</Helmet>

            <Main>
                {/* {superDestaquesLength > 0 &&
                    (isMobile ? (
                        <BannerContainer display="grid" gridAutoColumns="90%" gridAutoRows="50vh">
                            {stateSuperDestaques.data.map((item) => {
                                return (
                                    <BannerCell display="flex" gridRow={1} hover="true" key={item.id}>
                                        <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                            <NoticiaBox alignContent="flex-end" color={item.category.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 2, sm: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                                <BgImageLazyLoad key={item.id} overlayColor="colorBlackTransparent3" grayscale="true" url={item.thumbnail.attachment.url} />

                                                <Box>
                                                    <Tag>{item.category.title}</Tag>

                                                    <Title fontSize={{ d: 24, md: 32 }}>{item.title}</Title>

                                                    <Author>{`Por ${item.author}`}</Author>
                                                </Box>
                                            </NoticiaBox>
                                        </LinkTo>
                                    </BannerCell>
                                );
                            })}
                        </BannerContainer>
                    ) : (
                        <CarouselStyled>
                            <Slider {...carouselOptions}>
                                {Object.keys(objectItens).map((key) => {
                                    const group = objectItens[key];

                                    return (
                                        <div key={key}>
                                            <BannerContainer key={key} display="grid" gridAutoColumns={{ d: '90%', md: '1fr' }} gridAutoRows={{ d: '50vh', md: stateSuperDestaques.data.length > 2 ? '30vh' : '50vh' }}>
                                                {group.map((item, i, newArray) => {
                                                    let row = {};

                                                    if (i === 0) {
                                                        row = { d: 1, md: newArray.length > 0 ? '1 / span 2' : 1 };
                                                    }

                                                    if (i === 1) {
                                                        row = { d: 1, md: newArray.length === 2 ? '1 / span 2' : 1 };
                                                    }

                                                    if (i === 2) {
                                                        row = { d: 1, md: 2 };
                                                    }

                                                    return (
                                                        <BannerCell display="flex" gridRow={row} hover="true" key={item.id}>
                                                            <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                                                <NoticiaBox alignContent="flex-end" color={item.category.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 2, sm: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                                                    <BgImageLazyLoad key={item.id} overlayColor="colorBlackTransparent3" grayscale="true" url={item.thumbnail.attachment.url} />

                                                                    <Box>
                                                                        <Tag>{item.category.title}</Tag>

                                                                        <Title fontSize={{ d: 24, md: 32 }}>{item.title}</Title>

                                                                        <Author>{`Por ${item.author}`}</Author>
                                                                    </Box>
                                                                </NoticiaBox>
                                                            </LinkTo>
                                                        </BannerCell>
                                                    );
                                                })}
                                            </BannerContainer>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </CarouselStyled>
                    ))} */}

                <Background backgroundColor="colorGrayLight4">
                    <Container id="home-noticias-container" mx="auto" px={3} py={{ d: 3, md: 4 }}>
                        <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                            {destaquesLength > 0 && (
                                <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 5 / 10 }}>
                                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                        {stateDestaques.data.slice(0, 4).map((noticia, i, newArray) => {
                                            return i === 0 ? (
                                                <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={noticia.id} pb={3}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <Box height="300px" mb={4} overflow="hidden" width="100%">
                                                            <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                                        </Box>

                                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                            <Box>
                                                                <Tag>{noticia.category.title}</Tag>

                                                                <Title>{noticia.title}</Title>
                                                            </Box>

                                                            <Author>{`Por ${noticia.author}`}</Author>
                                                        </NoticiaBox>
                                                    </LinkTo>
                                                </Cell>
                                            ) : (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" pr={{ d: 1, sm: 4 }} themeColor="dark" verticalAlign="middle" width={{ d: 3 / 5, lg: 4 / 5 }}>
                                                            <Box>
                                                                <Tag>{noticia.category.title}</Tag>

                                                                <Title>{noticia.title}</Title>
                                                            </Box>

                                                            <Author>{`Por ${noticia.author}`}</Author>
                                                        </NoticiaBox>

                                                        <Box display="inline-block" height="100px" overflow="hidden" verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                                            <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                                        </Box>
                                                    </LinkTo>
                                                </Cell>
                                            );
                                        })}
                                    </Grid>

                                    <Flex display="flex" justifyContent="flex-end">
                                        <LinkTo fontWeight="600" hover="primary" link="/noticias">
                                            <span>Ver mais</span>

                                            <Svg className="svg-next" name="svg-next" pl={2} />
                                        </LinkTo>
                                    </Flex>
                                </Box>
                            )}

                            {noticiasLength > 0 && (
                                <>
                                    <Box mb={5} px={{ d: 0, md: 3 }} width={{ d: 1, sm: 7 / 10, md: 3 / 10 }}>
                                        <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                                            Últimas
                                        </Title4>

                                        <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                            {stateNoticias.data.slice(0, 4).map((noticia, i, newArray) => {
                                                return (
                                                    <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                        <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                            <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                                <Box>
                                                                    <Tag>{noticia.category.title}</Tag>

                                                                    <Title fontSize={18}>{noticia.title}</Title>

                                                                    <Author>{`Por ${noticia.author}`}</Author>

                                                                    <DateTime themeColor="dark">{noticia.date}</DateTime>
                                                                </Box>
                                                            </NoticiaBox>
                                                        </LinkTo>
                                                    </Cell>
                                                );
                                            })}
                                        </Grid>
                                    </Box>

                                    {/* <Box display={{ d: 'none', sm: 'block' }} pl={{ d: 0, sm: 5, md: 3 }} ref={stateBannerRef} width={{ d: 0, sm: 3 / 10, md: 2 / 10 }}>
                                        <BannerRight boxMeasure={stateBannerMeasure} boxMeasurePadding={16} elementChange={{ elementId: 'home-noticias-container', offset: -20 }} elementFadeOut={{ elementId: 'home-video-container', offset: -500 }} />
                                    </Box> */}
                                </>
                            )}
                        </Flex>
                    </Container>
                </Background>

                {/* {videosLength > 0 && (
                    <VideoContainer id="home-video-container">
                        <Container mx="auto" px={3} py={{ d: 4, md: variable.spacingXL }}>
                            <Title2 themeColor="light">Vídeos Liberta</Title2>

                            <Suspense fallback={<Title5 themeColor="light">Carregando...</Title5>}>
                                <HomeVideo ancor={{ elementId: '#home-video-container', offset: isMobile ? 0 : 80 }} objectVideos={stateVideos} />
                            </Suspense>

                            <Box textAlign="center">
                                <LinkToExternal className="btn btn-primary icon-left" href="https://www.youtube.com/channel/UCzIIAGs9UiniQgKtXsgFPnQ" target="_blank">
                                    <Svg display={{ d: 'none', lg: 'block' }} name="svg-youtube" />
                                    Siga nosso canal no Youtube
                                </LinkToExternal>
                            </Box>
                        </Container>
                    </VideoContainer>
                )} */}
            </Main>
        </>
    );
};
