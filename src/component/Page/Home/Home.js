import React from 'react';
import { Helmet } from 'react-helmet-async';

// import { useChangeBannerScroll } from '../../../store/banner/banner';
// import { useMeasure } from '../../../store/util/measure';

import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';
import { Svg } from '../../Svg/Svg';

import { BannerCell, BannerContainer } from '../../Banner/BannerStyled';
import { Author, DateTime, Tag, Title } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay1, BgImageOverlay3 } from '../../../style/image';
import { Background, Container, Main } from '../../../style/layout';
import { Title4 } from '../../../style/text';

export const Home = () => {
    // const changeBannerScroll = useChangeBannerScroll('home-noticias-container');

    // const [bannerRef, bannerMeasure] = useMeasure(true);

    const stateDestaques = [];
    const stateNoticias = [];

    const destaquesLength = 5;
    const noticiasLength = 5;

    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Home" />
            </Helmet>

            <Main>
                {destaquesLength > 0 && (
                    <BannerContainer display="grid" gridAutoColumns={{ d: '90%', md: '1fr' }} gridAutoRows={{ d: '50vh', md: destaquesLength > 2 ? '30vh' : '50vh' }}>
                        <BannerCell display="flex" gridRow={{ d: 1, md: destaquesLength > 2 ? '1 / span 2' : 1 }} hover="true">
                            <LinkTo ariaLabel={stateDestaques.data[0].title} display="flex" height="100%" to={`/noticia/${stateDestaques.data[0].slug}`} width="100%">
                                <NoticiaBox alignContent="flex-end" color={stateDestaques.data[0].category.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 2, sm: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                    <BgImageOverlay3 grayscale="true" url={stateDestaques.data[0].thumbnail.attachment.url} />

                                    <Box>
                                        <Tag>{stateDestaques.data[0].category.title}</Tag>

                                        <Title fontSize={{ d: 24, md: 32 }}>{stateDestaques.data[0].title}</Title>

                                        <Author>{`Por ${stateDestaques.data[0].author}`}</Author>
                                    </Box>
                                </NoticiaBox>
                            </LinkTo>
                        </BannerCell>

                        {stateDestaques.data[1] && (
                            <BannerCell display="flex" gridRow={1} hover="true">
                                <LinkTo ariaLabel={stateDestaques.data[1].title} display="flex" height="100%" to={`/noticia/${stateDestaques.data[1].slug}`} width="100%">
                                    <NoticiaBox alignContent="flex-end" color={stateDestaques.data[1].category.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 2, sm: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                        <BgImageOverlay3 grayscale="true" url={stateDestaques.data[1].thumbnail.attachment.url} />

                                        <Box>
                                            <Tag>{stateDestaques.data[1].category.title}</Tag>

                                            <Title fontSize={{ d: 24, md: 32 }}>{stateDestaques.data[1].title}</Title>

                                            <Author>{`Por ${stateDestaques.data[1].author}`}</Author>
                                        </Box>
                                    </NoticiaBox>
                                </LinkTo>
                            </BannerCell>
                        )}

                        {stateDestaques.data[2] && (
                            <BannerCell display="flex" gridRow={{ d: 1, md: 2 }} hover="true">
                                <LinkTo ariaLabel={stateDestaques.data[2].title} display="flex" height="100%" to={`/noticia/${stateDestaques.data[2].slug}`} width="100%">
                                    <NoticiaBox alignContent="flex-end" color={stateDestaques.data[2].category.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 2, sm: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                        <BgImageOverlay3 grayscale="true" url={stateDestaques.data[2].thumbnail.attachment.url} />

                                        <Box>
                                            <Tag>{stateDestaques.data[2].category.title}</Tag>

                                            <Title fontSize={{ d: 24, md: 32 }}>{stateDestaques.data[2].title}</Title>

                                            <Author>{`Por ${stateDestaques.data[2].author}`}</Author>
                                        </Box>
                                    </NoticiaBox>
                                </LinkTo>
                            </BannerCell>
                        )}
                    </BannerContainer>
                )}

                {noticiasLength > 0 && (
                    <Background backgroundColor="colorGrayLight4">
                        <Container id="home-noticias-container" mx="auto" py={{ d: 3, md: 4 }} px={3}>
                            <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                                <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 5 / 10 }}>
                                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" pb={3}>
                                            <LinkTo ariaLabel={stateNoticias.data[0].title} height="100%" to={`/noticia/${stateNoticias.data[0].slug}`} width="100%">
                                                <Box height="300px" mb={4} overflow="hidden" width="100%">
                                                    <BgImageOverlay1 url={stateNoticias.data[0].thumbnail.attachment.url} />
                                                </Box>

                                                <NoticiaBox color={stateNoticias.data[0].category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                    <Box>
                                                        <Tag>{stateNoticias.data[0].category.title}</Tag>

                                                        <Title>{stateNoticias.data[0].title}</Title>
                                                    </Box>

                                                    <Author>{`Por ${stateNoticias.data[0].author}`}</Author>
                                                </NoticiaBox>
                                            </LinkTo>
                                        </Cell>

                                        {stateNoticias.data.slice(1, 4).map((noticia, i, newArray) => {
                                            return (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle" width={{ d: 3 / 5, lg: 4 / 5 }}>
                                                            <Box>
                                                                <Tag>{noticia.category.title}</Tag>

                                                                <Title>{noticia.title}</Title>
                                                            </Box>

                                                            <Author>{`Por ${noticia.author}`}</Author>
                                                        </NoticiaBox>

                                                        <Box display="inline-block" height="100px" overflow="hidden" verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                                            <BgImageOverlay1 url={noticia.thumbnail.attachment.url} />
                                                        </Box>
                                                    </LinkTo>
                                                </Cell>
                                            );
                                        })}
                                    </Grid>

                                    <Flex display="flex" justifyContent="flex-end">
                                        <LinkTo hover="primary" fontWeight="600" to="/noticias">
                                            <span>Ver mais</span>

                                            <Svg className="svg-next" name="svg-next" pl={2} />
                                        </LinkTo>
                                    </Flex>
                                </Box>

                                <Box mb={5} px={{ d: 0, md: 3 }} width={{ d: 1, sm: 7 / 10, md: 3 / 10 }}>
                                    <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                                        Últimas
                                    </Title4>

                                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                        {stateNoticias.data.slice(4).map((noticia, i, newArray) => {
                                            return (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                                            <Box>
                                                                <Tag>{noticia.category.title}</Tag>

                                                                <Title fontSize="18px">{noticia.title}</Title>

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

                                {/* <Box display={{ d: 'none', sm: 'block' }} pl={{ d: 0, sm: 5, md: 3 }} ref={bannerRef} width={{ d: 0, sm: 3 / 10, md: 2 / 10 }}>
                                    <BannerPerfilInvestidor change={changeBannerScroll} boxMeasure={bannerMeasure} boxMeasurePadding={16} />
                                </Box> */}
                            </Flex>
                        </Container>
                    </Background>
                )}
            </Main>
        </>
    );
};
