import React, { lazy, Suspense, useEffect } from 'react';

import Slider from 'react-slick';

import { apiUrlHome } from '../../../config';

import { useDestaqueApi } from '../../../service/destaque';
import { useNoticiaApi } from '../../../service/noticia';
import { useSeoApi } from '../../../service/seo';
import { useSuperDestaqueApi } from '../../../service/superDestaque';

// import { useMeasure } from '../../../store/util/measure';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { groupByMod } from '../../../util/groupBy';
import { scrollTo } from '../../../util/scrollTo';

import { Button } from '../../Button/Button';
import { DotBtn, DotContainer, NextBtn, PrevBtn } from '../../Carousel/CarouselButton';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { LinkToExternal } from '../../Link/LinkToExternal';
import { LoaderComponent } from '../../Loader/LoaderComponent';
import { NoticiaBox } from '../Noticia/NoticiaBox';
import { Seo } from '../../Seo/Seo';
import { Svg } from '../../Svg/Svg';

import { BannerCellStyled, BannerContainerStyled } from '../../Banner/BannerStyled';
import { CarouselStyled } from '../../Carousel/CarouselStyled';
import { VideoContainerStyled } from './HomeStyled';
import { NoticiaBoxAuthorStyled, NoticiaBoxDateTimeStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Main, Wrap } from '../../../style/layout';
import { Span, Title2, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
const HomeVideo = lazy(() => import('./HomeVideo'));

export const Home = ({ location }) => {
    // API
    const stateDestaques = useDestaqueApi(`${apiUrlHome}/destaques`, {});
    const [stateNoticias] = useNoticiaApi(`${apiUrlHome}/ultimas_noticias`, {});
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});
    const stateSuperDestaques = useSuperDestaqueApi(`${apiUrlHome}/super_destaques`, {});

    const destaquesLength = stateDestaques.data && stateDestaques.data.length;
    const noticiasLength = stateNoticias.data && stateNoticias.data.length;
    const superDestaquesLength = stateSuperDestaques.data && stateSuperDestaques.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = destaquesLength > 0 && noticiasLength > 0 && superDestaquesLength > 0;

    // Agrupando itens com um grupo de 3
    const objectItens = superDestaquesLength > 0 ? groupByMod(stateSuperDestaques.data, 3) : {};

    // ACTION
    // const [stateBannerRef, stateBannerMeasure] = useMeasure(true);
    const windowWidth = useWindowWidth();

    // Scroll para o topo ou para a section de vídeo
    const ancorId = location.pathname === '/inicio/home-video-container' ? '#home-video-container' : null;

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(ancorId, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [ancorId, isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // CAROUSEL
    const carouselOptions = {
        appendDots: (dots) => <DotContainer>{dots}</DotContainer>,
        autoplay: true,
        autoplaySpeed: 4250,
        customPaging: () => <DotBtn />,
        dots: true,
        infinite: true,
        nextArrow: <NextBtn />,
        pauseOnHover: true,
        prevArrow: <PrevBtn />,
        speed: 1250,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false
    };

    return (
        <>
            <Seo>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Seo>

            <Main>
                {superDestaquesLength > 0 &&
                    (windowWidth < parseInt(variable.md, 10) ? (
                        <BannerContainerStyled display="grid" gridAutoColumns="90%" gridAutoRows="50vh">
                            {stateSuperDestaques.data.map((item) => {
                                return (
                                    <BannerCellStyled display="flex" gridRow={1} hover="true" key={item.id}>
                                        <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                            <NoticiaBox
                                                alignItems="flex-end"
                                                color={item.category.featured_color}
                                                display="flex"
                                                flexWrap="wrap"
                                                height="100%"
                                                overflow="hidden"
                                                p={{ d: 2, sm: 3, md: 4 }}
                                                themeColor="light"
                                                verticalAlign="middle"
                                                width="100%"
                                            >
                                                <BgImageLazyLoad grayscale="true" key={item.id} overlayColor="colorBlackTransparent3" url={item.thumbnail.attachment.url} />

                                                <Box>
                                                    <NoticiaBoxTagStyled>{item.category.title}</NoticiaBoxTagStyled>

                                                    <NoticiaBoxTitleStyled fontSize={{ d: 24, md: 32 }}>{item.title}</NoticiaBoxTitleStyled>

                                                    <span>{`Por ${item.author}`}</span>
                                                </Box>
                                            </NoticiaBox>
                                        </LinkTo>
                                    </BannerCellStyled>
                                );
                            })}
                        </BannerContainerStyled>
                    ) : (
                        <CarouselStyled>
                            <Slider {...carouselOptions}>
                                {Object.keys(objectItens).map((key) => {
                                    const group = objectItens[key];

                                    return (
                                        <div key={key}>
                                            <BannerContainerStyled key={key} display="grid" gridAutoColumns="1fr" gridAutoRows={{ d: '50vh', md: superDestaquesLength > 2 ? '30vh' : '50vh' }}>
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
                                                        <BannerCellStyled display="flex" gridRow={row} hover="true" key={item.id}>
                                                            <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                                                <NoticiaBox
                                                                    alignItems="flex-end"
                                                                    color={item.category.featured_color}
                                                                    display="flex"
                                                                    flexWrap="wrap"
                                                                    height="100%"
                                                                    overflow="hidden"
                                                                    p={{ d: 2, sm: 3, md: 4 }}
                                                                    themeColor="light"
                                                                    verticalAlign="middle"
                                                                    width="100%"
                                                                >
                                                                    <BgImageLazyLoad grayscale="true" key={item.id} overlayColor="colorBlackTransparent3" url={item.thumbnail.attachment.url} />

                                                                    <Box>
                                                                        <NoticiaBoxTagStyled>{item.category.title}</NoticiaBoxTagStyled>

                                                                        <NoticiaBoxTitleStyled fontSize={{ d: 24, md: 32 }}>{item.title}</NoticiaBoxTitleStyled>

                                                                        <span>{`Por ${item.author}`}</span>
                                                                    </Box>
                                                                </NoticiaBox>
                                                            </LinkTo>
                                                        </BannerCellStyled>
                                                    );
                                                })}
                                            </BannerContainerStyled>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </CarouselStyled>
                    ))}

                <Wrap>
                    <Container id="home-noticias-container" mx="auto" px={3} py={{ d: 3, md: 4 }}>
                        <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                            {destaquesLength > 0 && (
                                <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 'calc(60% - (321px / 2))' }}>
                                    <Grid display="grid">
                                        {stateDestaques.data.slice(0, 4).map((noticia, i, newArray) => {
                                            return i === 0 ? (
                                                <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={noticia.id} pb={3}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <Box height="300px" mb={4} overflow="hidden" width="100%">
                                                            <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                                        </Box>

                                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                            <Box>
                                                                <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                                                <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                                            </Box>

                                                            <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
                                                        </NoticiaBox>
                                                    </LinkTo>
                                                </Cell>
                                            ) : (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox
                                                            color={noticia.category.featured_color}
                                                            display="inline-block"
                                                            pr={{ d: 1, sm: 4 }}
                                                            themeColor="dark"
                                                            verticalAlign="middle"
                                                            width={{ d: 3 / 5, lg: 4 / 5 }}
                                                        >
                                                            <Box>
                                                                <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                                                <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                                            </Box>

                                                            <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
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
                                        <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary' }} link="/noticias">
                                            <span>Ver mais</span>

                                            <Svg name="svg-next" pl={2} />
                                        </LinkTo>
                                    </Flex>
                                </Box>
                            )}

                            {noticiasLength > 0 && (
                                <>
                                    <Box mb={5} px={{ d: 0, sm: 3 }} width={{ d: 1, sm: 'calc(100% - 321px)', md: 'calc(40% - (321px / 2))' }}>
                                        <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                                            Últimas
                                        </Title4>

                                        <Grid display="grid">
                                            {stateNoticias.data.slice(0, 4).map((noticia, i, newArray) => {
                                                return (
                                                    <Cell
                                                        borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'}
                                                        display="flex"
                                                        hover="true"
                                                        key={noticia.id}
                                                        pb={3}
                                                        pt={4}
                                                    >
                                                        <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                            <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                                <Box>
                                                                    <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                                                    <NoticiaBoxTitleStyled fontSize={18}>{noticia.title}</NoticiaBoxTitleStyled>

                                                                    <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>

                                                                    <NoticiaBoxDateTimeStyled themeColor="dark">{noticia.date}</NoticiaBoxDateTimeStyled>
                                                                </Box>
                                                            </NoticiaBox>
                                                        </LinkTo>
                                                    </Cell>
                                                );
                                            })}
                                        </Grid>
                                    </Box>
                                </>
                            )}
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
