import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';
import { Svg } from '../../Svg/Svg';

import { BannerCell, BannerContainer } from '../../Banner/BannerStyled';
import { DateTime } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageHover, BgImageOverlay1, BgImageOverlay3, BgImageOverlay5, Image } from '../../../style/image';
import { Background, Container, Main } from '../../../style/layout';
import { Title4 } from '../../../style/text';

export const Home = () => {
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
                        <BannerCell display="flex" gridRow={{ d: 1, md: destaquesLength > 2 ? '1 / span 2' : 1 }}>
                            <LinkTo ariaLabel={stateDestaques.data[0].title} display="inline-flex" height="100%" to={`/noticia/${stateDestaques.data[0].slug}`} width="100%">
                                <BgImageOverlay5 hover="true" url={stateDestaques.data[0].thumbnail.attachment.url} />

                                <Flex alignItems="flex-end" display="flex" p={{ d: 2, sm: 3, md: 4 }}>
                                    <NoticiaBox author={`Por ${stateDestaques.data[0].author}`} color={stateDestaques.data[0].category.featured_color} tag={stateDestaques.data[0].category.title} themeColor="light" title={stateDestaques.data[0].title} titleSize={{ d: 24, md: 32 }} />
                                </Flex>
                            </LinkTo>
                        </BannerCell>

                        {stateDestaques.data[1] && (
                            <BannerCell display="flex" gridRow={1}>
                                <LinkTo ariaLabel={stateDestaques.data[1].title} display="inline-flex" height="100%" to={`/noticia/${stateDestaques.data[1].slug}`} width="100%">
                                    <BgImageOverlay5 hover="true" url={stateDestaques.data[1].thumbnail.attachment.url} />

                                    <Flex alignItems="flex-end" display="flex" p={{ d: 2, sm: 3, md: 4 }}>
                                        <NoticiaBox author={`Por ${stateDestaques.data[1].author}`} color={stateDestaques.data[1].category.featured_color} tag={stateDestaques.data[1].category.title} themeColor="light" title={stateDestaques.data[1].title} titleSize={{ d: 24, md: 32 }} />
                                    </Flex>
                                </LinkTo>
                            </BannerCell>
                        )}

                        {stateDestaques.data[2] && (
                            <BannerCell display="flex" gridRow={{ d: 1, md: 2 }}>
                                <LinkTo ariaLabel={stateDestaques.data[2].title} display="inline-flex" height="100%" to={`/noticia/${stateDestaques.data[2].slug}`} width="100%">
                                    <BgImageOverlay5 hover="true" url={stateDestaques.data[2].thumbnail.attachment.url} />

                                    <Flex alignItems="flex-end" display="flex" p={{ d: 2, sm: 3, md: 4 }}>
                                        <NoticiaBox author={`Por ${stateDestaques.data[2].author}`} color={stateDestaques.data[2].category.featured_color} tag={stateDestaques.data[2].category.title} themeColor="light" title={stateDestaques.data[2].title} titleSize={{ d: 24, md: 32 }} />
                                    </Flex>
                                </LinkTo>
                            </BannerCell>
                        )}
                    </BannerContainer>
                )}

                {noticiasLength > 0 && (
                    <Background backgroundColor="colorGrayLight4">
                        <Container mx="auto" py={{ d: 3, md: 4 }} px={3}>
                            <Flex display="flex" flexWrap="wrap">
                                <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} mr={{ d: 0, md: 3 }} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 1 / 2 }}>
                                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" pb={3}>
                                            <LinkTo ariaLabel={stateNoticias.data[0].title} height="100%" to={`/noticia/${stateNoticias.data[0].slug}`} width="100%">
                                                <Box height="300px" mb={4} width="100%">
                                                    <BgImageOverlay1 hover="true" url={stateNoticias.data[0].thumbnail.attachment.url} />
                                                </Box>

                                                <NoticiaBox author={`Por ${stateNoticias.data[0].author}`} color={stateNoticias.data[0].category.featured_color} tag={stateNoticias.data[0].category.title} themeColor="dark" title={stateNoticias.data[0].title} />
                                            </LinkTo>
                                        </Cell>

                                        {stateNoticias.data.slice(1, 4).map((noticia, i, newArray) => {
                                            return (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox author={`Por ${noticia.author}`} color={noticia.category.featured_color} tag={noticia.category.title} themeColor="dark" title={noticia.title} width={{ d: 3 / 5, lg: 4 / 5 }} />

                                                        <Box display="inline-block" height="100px" pl={3} verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                                            <BgImageHover hover="true" url={noticia.thumbnail.attachment.url} />
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

                                <Box mb={5} mr={{ d: 0, md: 3 }} width={{ d: 1, sm: 2 / 4, md: 1 / 4 }}>
                                    <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                                        Últimas
                                    </Title4>

                                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto">
                                        {stateNoticias.data.slice(4).map((noticia, i, newArray) => {
                                            return (
                                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox author={`Por ${noticia.author}`} color={noticia.category.featured_color} themeColor="dark" title={noticia.title} titleSize="18px">
                                                            <DateTime themeColor="dark">{noticia.date}</DateTime>
                                                        </NoticiaBox>
                                                    </LinkTo>
                                                </Cell>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            </Flex>
                        </Container>
                    </Background>
                )}
            </Main>
        </>
    );
};
