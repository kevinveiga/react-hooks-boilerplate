import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi, useNoticiaCategoriaApi, useNoticiaCategoriasApi } from '../../../service/noticia';
import { useSeoApi } from '../../../service/seo';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from './NoticiaBox';

import { DateTime, Text } from './NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay3, Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Tab } from '../../../style/tab';
import { Title3, Title4 } from '../../../style/text';

export const Noticias = () => {
    const [stateNoticias] = useNoticiaApi(apiUrlNoticias, {});
    const [stateNoticiasCategoria, setNoticiaCategoria] = useNoticiaCategoriaApi(null, {});
    const [stateNoticiasCategorias] = useNoticiaCategoriasApi(`${apiUrlNoticias}/categorias`, {});
    const [stateSeo] = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const noticiasLength = stateNoticias.data.length;
    const noticiasCategoriasLength = stateNoticiasCategorias.data.length;

    return (
        <>
            <Helmet>
                <title>{stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data.description} />
            </Helmet>

            <Main>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Title3 fontWeight="600" themeColor="dark">
                        News
                    </Title3>

                    <Tab group="tab-group-news" total={4}>
                        <input id="tab-id-news-0" type="radio" name="tab-group-news" defaultChecked></input>
                        <input id="tab-id-news-1" type="radio" name="tab-group-news"></input>
                        <input id="tab-id-news-2" type="radio" name="tab-group-news"></input>
                        <input id="tab-id-news-3" type="radio" name="tab-group-news"></input>

                        <ul className="tabs-nav">
                            <li className="tab-nav">
                                <Label className="btn btn-tab" forLabel="tab-id-news-0" text="Últimas" />
                            </li>

                            {noticiasCategoriasLength > 0 &&
                                stateNoticiasCategorias.data.map((categoria, i) => {
                                    return (
                                        <li className="tab-nav" key={categoria.slug}>
                                            <Label className="btn btn-tab" forLabel={`tab-id-news-${i + 1}`} onClick={() => setNoticiaCategoria({ page: 1, url: `${apiUrlNoticias}/categoria/${categoria.slug}` })} text={categoria.title} />
                                        </li>
                                    );
                                })}
                        </ul>

                        <ul className="tabs-content">
                            <li className="tab-content">
                                <Flex display="flex" flexWrap="wrap">
                                    {noticiasLength > 0 &&
                                        stateNoticias.data.map((categoriaUltimas, i) => {
                                            return (
                                                i > 0 && (
                                                    <Box key={categoriaUltimas.slug} mb={5} px={{ d: 0, md: 2 }} width={{ d: 1, md: 1 / 3 }}>
                                                        <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={3}>
                                                            {categoriaUltimas &&
                                                                categoriaUltimas.posts.data.map((noticia, j) => {
                                                                    return j === 0 ? (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" key={noticia.id} pb={3}>
                                                                            <Box width={1}>
                                                                                <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                                                                    <Image height="200px" mb={4} src={noticia.thumbnail.attachment.url} text={noticia.title} width={1} />

                                                                                    <NoticiaBox author={`Por ${noticia.author}`} color={categoriaUltimas.featured_color} tag={categoriaUltimas.title} themeColor="dark" title={noticia.title} />
                                                                                </LinkTo>
                                                                            </Box>
                                                                        </Cell>
                                                                    ) : (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" key={noticia.id} py={3}>
                                                                            <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                                                                <NoticiaBox author={`Por ${noticia.author}`} color={categoriaUltimas.featured_color} tag={categoriaUltimas.title} themeColor="dark" title={noticia.title} />
                                                                            </LinkTo>
                                                                        </Cell>
                                                                    );
                                                                })}
                                                        </Grid>
                                                    </Box>
                                                )
                                            );
                                        })}
                                </Flex>

                                {/* TODO: Posteriormente esses dados devem vir da API de Aprenda */}
                                {/* <Title4 color="colorGray2" fontWeight="700" my="30px" themeColor="dark">
                                    Renda Fixa
                                </Title4>

                                <hr />

                                <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridColumnGap={4} gridRowGap={3} gridTemplateColumns={{ d: '1fr', md: 'repeat(auto-fit, minmax(280px, 1fr))', lg: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                                    <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" pb={3}>
                                        <Box width={1}>
                                            <LinkTo ariaLabel="Como a mudança de postura do FED pode afetar seus investimentos?" to="/noticia/titulo-noticia-1">
                                                <Image height="200px" mb={4} src="https://picsum.photos/id/1059/480" text="Notícia" width={1} />

                                                <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                            </LinkTo>
                                        </Box>
                                    </Cell>

                                    <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" pb={3}>
                                        <Box width={1}>
                                            <LinkTo ariaLabel="Como a mudança de postura do FED pode afetar seus investimentos?" to="/noticia/titulo-noticia-1">
                                                <Image height="200px" mb={4} src="https://picsum.photos/id/1060/480" text="Notícia" width={1} />

                                                <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                            </LinkTo>
                                        </Box>
                                    </Cell>

                                    <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" pb={3}>
                                        <Box width={1}>
                                            <LinkTo ariaLabel="Como a mudança de postura do FED pode afetar seus investimentos?" to="/noticia/titulo-noticia-1">
                                                <Image height="200px" mb={4} src="https://picsum.photos/id/1061/480" text="Notícia" width={1} />

                                                <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                            </LinkTo>
                                        </Box>
                                    </Cell>

                                    <Cell display="flex" py={3}>
                                        <LinkTo ariaLabel="Como a mudança de postura do FED pode afetar seus investimentos?" to="/noticia/titulo-noticia-1">
                                            <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                        </LinkTo>
                                    </Cell>
                                </Grid> */}

                                {/* TODO: Posteriormente esses dados devem vir da API de Aprenda */}
                                {/* <Title4 color="colorGray2" fontWeight="700" my="30px" themeColor="dark">
                                    Renda Variável
                                </Title4>

                                <hr />

                                <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridColumnGap={4} gridRowGap={3} gridTemplateColumns={{ d: '1fr', md: 'repeat(auto-fit, minmax(280px, 1fr))', lg: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                                    <Cell display="flex" pb={3}>
                                        <Box width={1}>
                                            <LinkTo ariaLabel="Como a mudança de postura do FED pode afetar seus investimentos?" to="/noticia/titulo-noticia-1">
                                                <Image height="200px" mb={4} src="https://picsum.photos/id/1059/480" text="Notícia" width={1} />

                                                <NoticiaBox author="Por Alexandre Stormer" color="colorBlueDark" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                            </LinkTo>
                                        </Box>
                                    </Cell>
                                </Grid> */}
                            </li>

                            {noticiasLength > 0 &&
                                stateNoticias.data.map((categoria, i) => {
                                    return (
                                        i > 0 && (
                                            <li className="tab-content" key={categoria.slug}>
                                                <Flex display="flex" flexWrap="wrap">
                                                    <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.6)' }} mb={5} pl={{ d: 0, md: 2 }} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 4 / 5 }}>
                                                        <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={3}>
                                                            {Object.keys(stateNoticiasCategoria.data).length > 0 &&
                                                                stateNoticiasCategoria.data.data.map((noticia, j) => {
                                                                    return j === 0 ? (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" height="315px" key={noticia.id} p={{ d: 3, md: 4 }}>
                                                                            <BgImageOverlay3 url={noticia.thumbnail.attachment.url} />

                                                                            <Flex alignItems="flex-end" display="flex">
                                                                                <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                                                                    <NoticiaBox color={categoria.featured_color} tag={categoria.title} themeColor="light" title={noticia.title}>
                                                                                        <p>
                                                                                            <span>Postado em </span>

                                                                                            <DateTime color={categoria.featured_color} fontSize="16px" themeColor="light">
                                                                                                {noticia.date}
                                                                                            </DateTime>
                                                                                        </p>
                                                                                    </NoticiaBox>
                                                                                </LinkTo>
                                                                            </Flex>
                                                                        </Cell>
                                                                    ) : (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" key={noticia.id} py={3}>
                                                                            <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                                                                <NoticiaBox color={categoria.featured_color} tag={categoria.title} themeColor="dark" title={noticia.title} width={3 / 5}>
                                                                                    <Text display={{ d: 'none', md: 'block' }}>{noticia.title}</Text>

                                                                                    <p>
                                                                                        <span>Postado em </span>

                                                                                        <DateTime color={categoria.featured_color} fontSize="16px" themeColor="dark">
                                                                                            {noticia.date}
                                                                                        </DateTime>
                                                                                    </p>
                                                                                </NoticiaBox>

                                                                                <Image height={{ d: '100px', xs: '150px', md: '200px' }} pl={3} src={noticia.thumbnail.attachment.url} text={noticia.title} width={2 / 5} />
                                                                            </LinkTo>
                                                                        </Cell>
                                                                    );
                                                                })}

                                                            {stateNoticiasCategoria.data.current_page < stateNoticiasCategoria.data.last_page && (
                                                                <Cell display="flex" justifyContent="center" py={3}>
                                                                    <Button className="btn btn-border" text="Ver mais" onClick={() => setNoticiaCategoria({ page: parseInt(stateNoticiasCategoria.data.current_page, 10) + 1, url: `${apiUrlNoticias}/categoria/${categoria.slug}` })} />
                                                                </Cell>
                                                            )}
                                                        </Grid>
                                                    </Box>
                                                </Flex>
                                            </li>
                                        )
                                    );
                                })}
                        </ul>
                    </Tab>
                </Container>
            </Main>
        </>
    );
};
