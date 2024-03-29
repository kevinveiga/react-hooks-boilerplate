import React, { useCallback, useEffect, useState } from 'react';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi, useNoticiaCategoriaApi, useNoticiaCategoriasApi } from '../../../service/noticia';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Button } from '../../Button/Button';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from './NoticiaBox';
import { NoticiasSeo } from './NoticiasSeo';
import { Svg } from '../../Svg/Svg';

import { NoticiaBoxAuthorStyled, NoticiaBoxDateTimeStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from './NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container } from '../../../style/layout';
import { Tab, TabContent, TabsContent, TabLabel, TabNav, TabsNav, TabSelect } from '../../../style/tab';
import { Title3 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Noticias = () => {
    // API
    const [stateNoticias] = useNoticiaApi(apiUrlNoticias);
    const [stateNoticiasCategoria, setStateNoticiasCategoriaData] = useNoticiaCategoriaApi();
    const stateNoticiasCategorias = useNoticiaCategoriasApi(`${apiUrlNoticias}/categorias`);

    const noticiasLength = stateNoticias.data.length;
    const noticiasCategoriasLength = stateNoticiasCategorias.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = noticiasLength > 0 && noticiasCategoriasLength > 0;

    // ACTION
    const [stateNoticiasCategoriaSelected, setStateNoticiasCategoriaSelected] = useState('ultimas');
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // FUNCTION
    const handleNoticiaCategoriaChange = useCallback(
        () => (event) => {
            event.preventDefault();

            let apiValue = `${apiUrlNoticias}/categoria/${event.target.value}`;

            if (event.target.value === 'ultimas') {
                apiValue = apiUrlNoticias;
            }

            setStateNoticiasCategoriaData({ page: 1, url: apiValue });
            setStateNoticiasCategoriaSelected(event.target.value);
        },
        [setStateNoticiasCategoriaData]
    );

    const handleNoticiaCategoriaVerMais = useCallback(
        (value) => () => {
            const apiValue = `${apiUrlNoticias}/categoria/${value}`;

            setStateNoticiasCategoriaData({ page: 1, url: apiValue });
            setStateNoticiasCategoriaSelected(value);

            scrollTo(null, isDataLoaded);
        },
        [isDataLoaded, setStateNoticiasCategoriaData]
    );

    return (
        <>
            <NoticiasSeo />

            <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                <Title3 fontWeight="700" themeColor="dark">
                    Notícias
                </Title3>

                <Tab group="tab-group-news" total={4}>
                    <input
                        checked={stateNoticiasCategoriaSelected === 'ultimas'}
                        id="tab-id-news-ultimas"
                        name="tab-group-news"
                        onChange={handleNoticiaCategoriaChange()}
                        type="radio"
                        value="ultimas"
                    />

                    {noticiasCategoriasLength > 0 &&
                        stateNoticiasCategorias.data.map((categoria) => {
                            return (
                                <input
                                    checked={stateNoticiasCategoriaSelected === categoria.slug}
                                    id={`tab-id-news-${categoria.slug}`}
                                    key={categoria.slug}
                                    name="tab-group-news"
                                    onChange={handleNoticiaCategoriaChange()}
                                    type="radio"
                                    value={categoria.slug}
                                />
                            );
                        })}

                    {windowWidth < parseInt(variable.md, 10) && (
                        <TabSelect>
                            <select onChange={handleNoticiaCategoriaChange()}>
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
                        </TabSelect>
                    )}

                    <TabsNav display={{ d: 'none', md: 'block' }}>
                        <TabNav>
                            <TabLabel htmlFor="tab-id-news-ultimas">Últimas</TabLabel>
                        </TabNav>

                        {noticiasCategoriasLength > 0 &&
                            stateNoticiasCategorias.data.map((categoria) => {
                                return (
                                    <TabNav key={categoria.slug}>
                                        <TabLabel htmlFor={`tab-id-news-${categoria.slug}`}>{categoria.title}</TabLabel>
                                    </TabNav>
                                );
                            })}
                    </TabsNav>

                    <TabsContent id="noticias-tabs-content">
                        <TabContent>
                            <Flex display="flex" flexWrap="wrap">
                                {noticiasLength > 0 &&
                                    stateNoticias.data.map((categoriaUltimas, i) => {
                                        return (
                                            i > 0 &&
                                            categoriaUltimas &&
                                            categoriaUltimas.posts.data.map((noticia, j) => {
                                                return (
                                                    <Box
                                                        display="flex"
                                                        flexWrap="wrap"
                                                        key={`${categoriaUltimas.title}-${noticia.id}`}
                                                        px={{ d: 0, md: 2 }}
                                                        order={`${j}${i}`}
                                                        width={{ d: 1, md: 1 / 3 }}
                                                    >
                                                        <Box hover="true" mb={5} width={1}>
                                                            <LinkTo
                                                                ariaLabel={noticia.title}
                                                                height="100%"
                                                                link={`/noticia/${noticia.slug}`}
                                                                width="100%"
                                                            >
                                                                <NoticiaBox
                                                                    alignContent="space-between"
                                                                    color={categoriaUltimas.featured_color}
                                                                    display="flex"
                                                                    flexWrap="wrap"
                                                                    height="100%"
                                                                    themeColor="dark"
                                                                    verticalAlign="middle"
                                                                >
                                                                    <Box width="100%">
                                                                        {j / 3 === 0 && (
                                                                            <Box height="200px" mb={4} overflow="hidden" width="100%">
                                                                                <BgImageLazyLoad
                                                                                    key={noticia.id}
                                                                                    url={noticia.thumbnail && noticia.thumbnail.attachment.url}
                                                                                />
                                                                            </Box>
                                                                        )}

                                                                        <NoticiaBoxTagStyled>{categoriaUltimas.title}</NoticiaBoxTagStyled>

                                                                        <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                                                    </Box>

                                                                    <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
                                                                </NoticiaBox>
                                                            </LinkTo>
                                                        </Box>

                                                        {j === categoriaUltimas.posts.data.length - 1 && (
                                                            <Box alignSelf="flex-end" px={{ d: 0, md: 2 }} width={1}>
                                                                <Box borderRight="1px solid rgba(216, 221, 225, 0.8)" textAlign="right">
                                                                    <Button
                                                                        display="inline-block"
                                                                        fontWeight="700"
                                                                        onClick={handleNoticiaCategoriaVerMais(categoriaUltimas.slug)}
                                                                        themeSize="none"
                                                                        themeType="none"
                                                                    >
                                                                        <span>Ver mais</span>

                                                                        <Svg name="svg-next" pl={2} pr={3} />
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                );
                                            })
                                        );
                                    })}
                            </Flex>
                        </TabContent>

                        {noticiasLength > 0 &&
                            stateNoticias.data.map((categoria, i) => {
                                return (
                                    i > 0 && (
                                        <TabContent key={categoria.slug}>
                                            <Flex display="flex" flexWrap="wrap">
                                                <Box
                                                    borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.6)' }}
                                                    mb={5}
                                                    pl={{ d: 0, md: 2 }}
                                                    pr={{ d: 0, md: 3 }}
                                                    width={{ d: 1, md: 4 / 5 }}
                                                >
                                                    <Grid display="grid">
                                                        {stateNoticiasCategoria.data &&
                                                            stateNoticiasCategoria.data.data &&
                                                            stateNoticiasCategoria.data.data.map((noticia, j) => {
                                                                return j === 0 ? (
                                                                    <Cell
                                                                        borderBottom="1px solid rgba(216, 221, 225, 0.8)"
                                                                        display="flex"
                                                                        height="315px"
                                                                        hover="true"
                                                                        key={noticia.id}
                                                                    >
                                                                        <LinkTo
                                                                            ariaLabel={noticia.title}
                                                                            height="100%"
                                                                            link={`/noticia/${noticia.slug}`}
                                                                            width="100%"
                                                                        >
                                                                            <NoticiaBox
                                                                                alignItems="flex-end"
                                                                                color={categoria.featured_color}
                                                                                display="flex"
                                                                                flexWrap="wrap"
                                                                                height="100%"
                                                                                overflow="hidden"
                                                                                p={{ d: 3, md: 4 }}
                                                                                themeColor="light"
                                                                                verticalAlign="middle"
                                                                                width="100%"
                                                                            >
                                                                                <BgImageLazyLoad
                                                                                    key={noticia.id}
                                                                                    overlayColor="colorBlackTransparent3"
                                                                                    url={noticia.thumbnail && noticia.thumbnail.attachment.url}
                                                                                />

                                                                                <Box>
                                                                                    <NoticiaBoxTagStyled>{categoria.title}</NoticiaBoxTagStyled>

                                                                                    <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>

                                                                                    <p>
                                                                                        <span>Postado em </span>

                                                                                        <NoticiaBoxDateTimeStyled fontSize="16px" themeColor="light">
                                                                                            {noticia.date}
                                                                                        </NoticiaBoxDateTimeStyled>
                                                                                    </p>
                                                                                </Box>
                                                                            </NoticiaBox>
                                                                        </LinkTo>
                                                                    </Cell>
                                                                ) : (
                                                                    <Cell
                                                                        borderBottom="1px solid rgba(216, 221, 225, 0.8)"
                                                                        display="flex"
                                                                        hover="true"
                                                                        key={noticia.id}
                                                                        py={3}
                                                                    >
                                                                        <LinkTo
                                                                            ariaLabel={noticia.title}
                                                                            height="100%"
                                                                            link={`/noticia/${noticia.slug}`}
                                                                            width="100%"
                                                                        >
                                                                            <NoticiaBox
                                                                                alignContent="space-between"
                                                                                color={categoria.featured_color}
                                                                                display="inline-flex"
                                                                                flexWrap="wrap"
                                                                                minHeight={{ d: '100px', xs: '150px', md: '200px' }}
                                                                                pr={{ d: 1, sm: 4 }}
                                                                                themeColor="dark"
                                                                                verticalAlign="middle"
                                                                                width={3 / 5}
                                                                            >
                                                                                <Box width="100%">
                                                                                    <NoticiaBoxTagStyled>{categoria.title}</NoticiaBoxTagStyled>

                                                                                    <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>

                                                                                    <p>{noticia.excerpt}</p>
                                                                                </Box>

                                                                                <p>
                                                                                    <span>Postado em </span>

                                                                                    <NoticiaBoxDateTimeStyled
                                                                                        color={categoria.featured_color}
                                                                                        fontSize="16px"
                                                                                        themeColor="dark"
                                                                                    >
                                                                                        {noticia.date}
                                                                                    </NoticiaBoxDateTimeStyled>
                                                                                </p>
                                                                            </NoticiaBox>

                                                                            <Box
                                                                                display="inline-block"
                                                                                height={{ d: '100px', xs: '150px', md: '200px' }}
                                                                                overflow="hidden"
                                                                                verticalAlign="middle"
                                                                                width={2 / 5}
                                                                            >
                                                                                <BgImageLazyLoad
                                                                                    key={noticia.id}
                                                                                    url={noticia.thumbnail && noticia.thumbnail.attachment.url}
                                                                                />
                                                                            </Box>
                                                                        </LinkTo>
                                                                    </Cell>
                                                                );
                                                            })}

                                                        {stateNoticiasCategoria.data &&
                                                            stateNoticiasCategoria.data.current_page < stateNoticiasCategoria.data.last_page && (
                                                                <Cell display="flex" justifyContent="center" py={3}>
                                                                    <Button
                                                                        text="Ver mais"
                                                                        themeType="border"
                                                                        onClick={() =>
                                                                            setStateNoticiasCategoriaData({
                                                                                page: parseInt(stateNoticiasCategoria.data.current_page, 10) + 1,
                                                                                url: `${apiUrlNoticias}/categoria/${categoria.slug}`
                                                                            })
                                                                        }
                                                                    />
                                                                </Cell>
                                                            )}
                                                    </Grid>
                                                </Box>
                                            </Flex>
                                        </TabContent>
                                    )
                                );
                            })}
                    </TabsContent>
                </Tab>
            </Container>
        </>
    );
};
