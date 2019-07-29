import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi, useNoticiaCategoriaApi, useNoticiaCategoriasApi } from '../../../service/noticia';
import { useSeoApi } from '../../../service/seo';

// import { useChangeBannerScroll } from '../../../store/banner/banner';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from './NoticiaBox';

import { Svg } from '../../Svg/Svg';

import { Author, DateTime, Tag, Title } from './NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay1, BgImageOverlay3, Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Tab } from '../../../style/tab';
import { Title3 } from '../../../style/text';

export const Noticias = () => {
    // const changeBannerScroll = useChangeBannerScroll();

    const [stateNoticias] = useNoticiaApi(apiUrlNoticias, {});
    const [stateNoticiasCategoria, setNoticiaCategoria] = useNoticiaCategoriaApi(null, {});
    const [stateNoticiasCategorias] = useNoticiaCategoriasApi(`${apiUrlNoticias}/categorias`, {});
    const [stateNoticiasCategoriaSelected, setNoticiasCategoriaSelected] = useState('ultimas');
    const [stateSeo] = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const noticiasLength = stateNoticias.data.length;
    const noticiasCategoriasLength = stateNoticiasCategorias.data.length;

    const handleNoticiaCategoriaChange = (e) => {
        let apiValue = `${apiUrlNoticias}/categoria/${e.target.value}`;

        if (e.target.value === 'ultimas') {
            apiValue = apiUrlNoticias;
        }

        setNoticiaCategoria({ page: 1, url: apiValue });
        setNoticiasCategoriaSelected(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>{stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data.description} />
            </Helmet>

            <Main>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Title3 fontWeight="600" themeColor="dark">
                        Notícias
                    </Title3>

                    <Tab group="tab-group-news" total={4}>
                        <input
                            checked={stateNoticiasCategoriaSelected === 'ultimas'}
                            id="tab-id-news-ultimas"
                            name="tab-group-news"
                            onChange={(e) => {
                                e.preventDefault();
                                handleNoticiaCategoriaChange(e);
                            }}
                            type="radio"
                            value="ultimas"
                        ></input>

                        {noticiasCategoriasLength > 0 &&
                            stateNoticiasCategorias.data.map((categoria) => {
                                return (
                                    <input
                                        checked={stateNoticiasCategoriaSelected === categoria.slug}
                                        id={`tab-id-news-${categoria.slug}`}
                                        key={categoria.slug}
                                        name="tab-group-news"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleNoticiaCategoriaChange(e);
                                        }}
                                        type="radio"
                                        value={categoria.slug}
                                    ></input>
                                );
                            })}

                        <div className="custom-select-container icon-right">
                            <select
                                className="btn btn-tab btn-tab-select"
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleNoticiaCategoriaChange(e);
                                }}
                            >
                                <option value="ultimas">Últimas</option>

                                {noticiasCategoriasLength > 0 &&
                                    stateNoticiasCategorias.data.map((categoria) => {
                                        return (
                                            <option key={categoria.slug} value={categoria.slug}>
                                                {categoria.title}
                                            </option>
                                        );
                                    })}
                            </select>

                            <Svg name="svg-arrow-down" />
                        </div>

                        <ul className="tabs-nav">
                            <li className="tab-nav">
                                <Label className="btn btn-tab" forLabel="tab-id-news-ultimas" text="Últimas" />
                            </li>

                            {noticiasCategoriasLength > 0 &&
                                stateNoticiasCategorias.data.map((categoria) => {
                                    return (
                                        <li className="tab-nav" key={categoria.slug}>
                                            <Label className="btn btn-tab" forLabel={`tab-id-news-${categoria.slug}`} text={categoria.title} />
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
                                                i > 0 &&
                                                (categoriaUltimas &&
                                                    categoriaUltimas.posts.data.map((noticia, j) => {
                                                        return (
                                                            <Box hover="true" key={noticia.id} mb={5} order={`${j}${i}`} px={{ d: 0, md: 2 }} width={{ d: 1, md: 1 / 3 }}>
                                                                <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                                    <NoticiaBox alignContent="space-between" color={categoriaUltimas.featured_color} display="flex" flexWrap="wrap" height="100%" themeColor="dark" verticalAlign="middle">
                                                                        <Box width="100%">
                                                                            {j / 3 === 0 && (
                                                                                <Box height="200px" mb={4} overflow="hidden" width="100%">
                                                                                    <BgImageOverlay1 url={noticia.thumbnail && noticia.thumbnail.attachment.url} />
                                                                                </Box>
                                                                            )}

                                                                            <Tag>{categoriaUltimas.title}</Tag>

                                                                            <Title>{noticia.title}</Title>
                                                                        </Box>

                                                                        <Author>{`Por ${noticia.author}`}</Author>
                                                                    </NoticiaBox>
                                                                </LinkTo>
                                                            </Box>
                                                        );
                                                    }))
                                            );
                                        })}
                                </Flex>
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
                                                                stateNoticiasCategoria.data.data &&
                                                                stateNoticiasCategoria.data.data.map((noticia, j) => {
                                                                    return j === 0 ? (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" height="315px" hover="true" key={noticia.id}>
                                                                            <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                                                <NoticiaBox alignContent="flex-end" color={categoria.featured_color} display="flex" flexWrap="wrap" height="100%" overflow="hidden" p={{ d: 3, md: 4 }} themeColor="light" verticalAlign="middle" width="100%">
                                                                                    <BgImageOverlay3 url={noticia.thumbnail && noticia.thumbnail.attachment.url} />

                                                                                    <Box>
                                                                                        <Tag>{categoria.title}</Tag>

                                                                                        <Title>{noticia.title}</Title>

                                                                                        <p>
                                                                                            <span>Postado em </span>

                                                                                            <DateTime fontSize="16px" themeColor="light">
                                                                                                {noticia.date}
                                                                                            </DateTime>
                                                                                        </p>
                                                                                    </Box>
                                                                                </NoticiaBox>
                                                                            </LinkTo>
                                                                        </Cell>
                                                                    ) : (
                                                                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={noticia.id} py={3}>
                                                                            <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                                                <NoticiaBox alignContent="space-between" color={categoria.featured_color} display="inline-flex" flexWrap="wrap" minHeight={{ d: '100px', xs: '150px', md: '200px' }} themeColor="dark" verticalAlign="middle" width={3 / 5}>
                                                                                    <Box width="100%">
                                                                                        <Tag>{categoria.title}</Tag>

                                                                                        <Title>{noticia.title}</Title>

                                                                                        <p>Resumo</p>
                                                                                    </Box>

                                                                                    <p>
                                                                                        <span>Postado em </span>

                                                                                        <DateTime color={categoria.featured_color} fontSize="16px" themeColor="dark">
                                                                                            {noticia.date}
                                                                                        </DateTime>
                                                                                    </p>
                                                                                </NoticiaBox>

                                                                                <Box display="inline-block" height={{ d: '100px', xs: '150px', md: '200px' }} overflow="hidden" verticalAlign="middle" width={2 / 5}>
                                                                                    <BgImageOverlay1 url={noticia.thumbnail && noticia.thumbnail.attachment.url} />
                                                                                </Box>
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

                                                    {/* <Box display={{ d: 'none', md: 'block' }} pl={3} width={1 / 5}>
                                                        <BannerPerfilInvestidor change={changeBannerScroll} />
                                                    </Box> */}
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
