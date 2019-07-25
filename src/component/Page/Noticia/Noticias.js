import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi, useNoticiaCategoriaApi, useNoticiaCategoriasApi } from '../../../service/noticia';
import { useSeoApi } from '../../../service/seo';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from './NoticiaBox';

import { Svg } from '../../Svg/Svg';

import { Author, DateTime, Tag, Title } from './NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay3, Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Tab } from '../../../style/tab';
import { Title3 } from '../../../style/text';

export const Noticias = () => {
    const [stateNoticias] = useNoticiaApi(apiUrlNoticias, {});
    const [stateNoticiasCategoria, setNoticiaCategoria] = useNoticiaCategoriaApi(null, {});
    const [stateNoticiasCategorias] = useNoticiaCategoriasApi(`${apiUrlNoticias}/categorias`, {});
    const [stateNoticiasCategoriaSelected, setNoticiasCategoriaSelected] = useState('ultimas');
    const [stateSeo] = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const noticiasLength = stateNoticias.data.length;
    const noticiasCategoriasLength = stateNoticiasCategorias.data.length;

    const handleNoticiaCategoriaChange = (e) => {
        setNoticiaCategoria({ page: 1, url: `${apiUrlNoticias}/categoria/${e.target.value}` });
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
                                                            <Box key={noticia.id} mb={5} order={`${j}${i}`} px={{ d: 0, md: 2 }} width={{ d: 1, md: 1 / 3 }}>
                                                                <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`}>
                                                                    <NoticiaBox alignContent="space-between" color={categoriaUltimas.featured_color} display="inline-flex" flexWrap="wrap" height="100%" themeColor="dark">
                                                                        <Box>
                                                                            {j / 3 === 0 && <Image height="200px" mb={4} src={noticia.thumbnail && noticia.thumbnail.attachment.url} text={noticia.title} width="100%" />}

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

                                <Grid display="grid">
                                    <Image src={bannerAnuncio} text="Anúncio" />
                                </Grid>
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
                                                                            <BgImageOverlay3 url={noticia.thumbnail && noticia.thumbnail.attachment.url} />

                                                                            <Flex alignItems="flex-end" display="flex">
                                                                                <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                                                                    <NoticiaBox color={categoria.featured_color} height="100%" themeColor="light">
                                                                                        <Tag>{categoria.title}</Tag>

                                                                                        <Title>{noticia.title}</Title>

                                                                                        <p>
                                                                                            <span>Postado em </span>

                                                                                            <DateTime fontSize="16px" themeColor="light">
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
                                                                                <NoticiaBox alignContent="space-between" color={categoria.featured_color} display="inline-flex" flexWrap="wrap" height="100%" themeColor="dark" width={3 / 5}>
                                                                                    <Tag>{categoria.title}</Tag>

                                                                                    <Title>{noticia.title}</Title>

                                                                                    <p>
                                                                                        <span>Postado em </span>

                                                                                        <DateTime color={categoria.featured_color} fontSize="16px" themeColor="dark">
                                                                                            {noticia.date}
                                                                                        </DateTime>
                                                                                    </p>
                                                                                </NoticiaBox>

                                                                                <Image height={{ d: '100px', xs: '150px', md: '200px' }} pl={3} src={noticia.thumbnail && noticia.thumbnail.attachment.url} text={noticia.title} width={2 / 5} />
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
