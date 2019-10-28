import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useCursoApi, useCursoCategoriaApi, useCursoCategoriasApi } from '../../../service/curso';
import { useSeoApi } from '../../../service/seo';

import { Context } from '../../../store/context';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { MinhaContaMenu } from './MinhaContaMenu';

import { Svg } from '../../Svg/Svg';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { ListBox, ListLevel, ListTag, ListTitle, ListTime } from '../../../style/list';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { Tab, TabContent, TabsContent, TabSelect } from '../../../style/tab';
import { Span } from '../../../style/text';
import { variable } from '../../../style/variable';

export const MinhaContaCursos = ({ ...breadcrumb }) => {
    // API
    const [stateCursos] = useCursoApi(apiUrlNoticias, {});
    const [stateCursosCategoria, setStateCursosCategoriaData] = useCursoCategoriaApi(null, {});
    const stateCursosCategorias = useCursoCategoriasApi(`${apiUrlNoticias}/categorias`, {});
    const [stateCursosCategoriaSelected, setStateCursosCategoriaSelected] = useState('mais-acessados');

    const stateSeo = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const cursosLength = stateCursos.data.length;
    const cursosCategoriasLength = stateCursosCategorias.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursosLength > 0 && cursosCategoriasLength > 0;

    // CONTEXT
    const { setStateLoaderGlobal } = useContext(Context);

    // ACTION
    const windowWidth = useWindowWidth();

    const handleCursoCategoriaChange = (e) => {
        let apiValue = `${apiUrlNoticias}/categoria/${e.target.value}`;

        if (e.target.value === 'mais-acessados') {
            apiValue = apiUrlNoticias;
        }

        setStateCursosCategoriaData({ page: 1, url: apiValue });
        setStateCursosCategoriaSelected(e.target.value);
    };

    // // Scroll para o topo
    // if (!stateCursosCategoria.data) {
    //     scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);
    // }

    useEffect(() => {
        if (stateCursos.isLoading || stateCursosCategoria.isLoading) {
            setStateLoaderGlobal(true);
        } else {
            setTimeout(() => {
                setStateLoaderGlobal(false);
            }, variable.timeout1s);
        }
    }, [setStateLoaderGlobal, stateCursos.isLoading, stateCursosCategoria.isLoading]);

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <HeaderAlternate currentBreadcrumbLabel="Cursos" {...breadcrumb} />

            <Main header="minhaConta">
                <Container mx="auto" px={{ d: 0, lg: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <MinhaContaMenu />

                        <MinhaContaCenterStyled p={{ d: 3, md: 5 }} width={{ d: '100%', lg: 8 / 10 }}>
                            {windowWidth < parseInt(variable.md, 10) && <Breadcrumb currentLabel="Cursos" obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                            <Flex display="flex" flexWrap="wrap">
                                <Tab group="tab-group-course" total={4}>
                                    <input
                                        checked={stateCursosCategoriaSelected === 'mais-acessados'}
                                        id="tab-id-mais-acessados"
                                        name="tab-group-course"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleCursoCategoriaChange(e);
                                        }}
                                        type="radio"
                                        value="mais-acessados"
                                    />

                                    {cursosCategoriasLength > 0 &&
                                        stateCursosCategorias.data.map((categoria) => {
                                            return (
                                                <input
                                                    checked={stateCursosCategoriaSelected === categoria.slug}
                                                    id={`tab-id-course-${categoria.slug}`}
                                                    key={categoria.slug}
                                                    name="tab-group-course"
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        handleCursoCategoriaChange(e);
                                                    }}
                                                    type="radio"
                                                    value={categoria.slug}
                                                />
                                            );
                                        })}

                                    <TabSelect ml="auto" mr="auto">
                                        <select
                                            onChange={(e) => {
                                                e.preventDefault();
                                                handleCursoCategoriaChange(e);
                                            }}
                                        >
                                            <option value="mais-acessados">Últimas</option>

                                            {cursosCategoriasLength > 0 &&
                                                stateCursosCategorias.data.map((categoria) => {
                                                    return (
                                                        <option key={categoria.slug} value={categoria.slug}>
                                                            {categoria.title}
                                                        </option>
                                                    );
                                                })}
                                        </select>

                                        <Svg name="svg-arrow-down" />
                                    </TabSelect>

                                    <TabsContent>
                                        <TabContent>
                                            <Flex display="flex" flexWrap="wrap">
                                                {cursosLength > 0 &&
                                                    stateCursos.data.map((categoriaMaisAcessadas, i) => {
                                                        return (
                                                            i > 0 &&
                                                            (categoriaMaisAcessadas &&
                                                                categoriaMaisAcessadas.posts.data.map((curso) => {
                                                                    return (
                                                                        <Box key={curso.id} mb={5} width="100%">
                                                                            <LinkTo ariaLabel={curso.title} height="100%" to={`/minha-conta/curso/${curso.slug}`} width="100%">
                                                                                <ListBox color={categoriaMaisAcessadas.featured_color} display="flex" flexWrap="wrap" height="100%" mx={{ d: 0, md: 2 }} themeColor="dark">
                                                                                    <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                                        <Box height={{ d: '200px', md: '100%' }} overflow="hidden" width={{ d: 1, md: 1 / 2 }}>
                                                                                            <BgImageLazyLoad key={curso.id} url={curso.thumbnail && curso.thumbnail.attachment.url} />

                                                                                            <ListTag>{categoriaMaisAcessadas.title}</ListTag>
                                                                                        </Box>

                                                                                        <Box alignContent="space-between" display="flex" flexWrap="wrap" p={{ d: 3, md: 4 }} width={{ d: 1, md: 1 / 2 }}>
                                                                                            <Box width="100%">
                                                                                                <ListTitle mb={3}>{curso.title}</ListTitle>

                                                                                                <p>
                                                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                                                                    tempor incididunt ut labore et dolore magna aliqua.
                                                                                                </p>
                                                                                            </Box>

                                                                                            <Box width="100%">
                                                                                                <Svg fill="colorSecondary" height="13px" name="svg-time" />

                                                                                                <ListTime ml={1} mr={3}>
                                                                                                    30 min
                                                                                                </ListTime>

                                                                                                <Svg fill="colorSecondary" height="14px" name="svg-level" />

                                                                                                <ListLevel ml={1}>Iniciante</ListLevel>
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Box>

                                                                                    <Box width="100%">
                                                                                        <ProgressBar alignItems="center" display={{ d: 'block', md: 'flex' }} px={{ d: 3, md: 4 }} py={2} progressPercent={30} themeColor="light">
                                                                                            <Box mb={{ d: 2, md: 0 }} width="170px">
                                                                                                <Span fontSize="16px" fontWeight="600" themeColor="light">
                                                                                                    PROGRESSO {30}%
                                                                                                </Span>
                                                                                            </Box>

                                                                                            <BarContainer my={{ d: 2, md: 0 }}>
                                                                                                <Bar />
                                                                                            </BarContainer>
                                                                                        </ProgressBar>
                                                                                    </Box>
                                                                                </ListBox>
                                                                            </LinkTo>
                                                                        </Box>
                                                                    );
                                                                }))
                                                        );
                                                    })}
                                            </Flex>
                                        </TabContent>

                                        {cursosLength > 0 &&
                                            stateCursos.data.map((categoria, i) => {
                                                return (
                                                    i > 0 && (
                                                        <TabContent key={categoria.slug}>
                                                            <Flex display="flex" flexWrap="wrap">
                                                                {stateCursosCategoria.data &&
                                                                    stateCursosCategoria.data.data &&
                                                                    stateCursosCategoria.data.data.map((curso) => {
                                                                        return (
                                                                            <Box key={curso.id} mb={5} width="100%">
                                                                                <LinkTo ariaLabel={curso.title} height="100%" to={`/minha-conta/curso/${curso.slug}`} width="100%">
                                                                                    <ListBox color={curso.featured_color} display="flex" flexWrap="wrap" height="100%" mx={{ d: 0, md: 2 }} themeColor="dark">
                                                                                        <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                                            <Box height={{ d: '200px', md: '100%' }} overflow="hidden" width={{ d: 1, md: 1 / 2 }}>
                                                                                                <BgImageLazyLoad key={curso.id} url={curso.thumbnail && curso.thumbnail.attachment.url} />

                                                                                                <ListTag>{categoria.title}</ListTag>
                                                                                            </Box>

                                                                                            <Box alignContent="space-between" display="flex" flexWrap="wrap" p={{ d: 3, md: 4 }} width={{ d: 1, md: 1 / 2 }}>
                                                                                                <Box width="100%">
                                                                                                    <ListTitle mb={3}>{curso.title}</ListTitle>

                                                                                                    <p>
                                                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                                                                        tempor incididunt ut labore et dolore magna aliqua.
                                                                                                    </p>
                                                                                                </Box>

                                                                                                <Box width="100%">
                                                                                                    <Svg fill="colorSecondary" height="13px" name="svg-time" />

                                                                                                    <ListTime ml={1} mr={3}>
                                                                                                        30 min
                                                                                                    </ListTime>

                                                                                                    <Svg fill="colorSecondary" height="14px" name="svg-level" />

                                                                                                    <ListLevel ml={1}>Iniciante</ListLevel>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Box>

                                                                                        <Box width="100%">
                                                                                            <ProgressBar alignItems="center" display={{ d: 'block', md: 'flex' }} px={{ d: 3, md: 4 }} py={2} progressPercent={30} themeColor="light">
                                                                                                <Box width="170px">
                                                                                                    <Span fontSize="16px" fontWeight="600" themeColor="light">
                                                                                                        PROGRESSO {30}%
                                                                                                    </Span>
                                                                                                </Box>

                                                                                                <BarContainer my={{ d: 2, md: 0 }}>
                                                                                                    <Bar />
                                                                                                </BarContainer>
                                                                                            </ProgressBar>
                                                                                        </Box>
                                                                                    </ListBox>
                                                                                </LinkTo>
                                                                            </Box>
                                                                        );
                                                                    })}

                                                                {stateCursosCategoria.data && stateCursosCategoria.data.current_page < stateCursosCategoria.data.last_page && (
                                                                    <Box display="flex" justifyContent="center" py={3} width="100%">
                                                                        <Button text="Ver mais" themeType="border" onClick={() => setStateCursosCategoriaData({ page: parseInt(stateCursosCategoria.data.current_page, 10) + 1, url: `${apiUrlNoticias}/categoria/${categoria.slug}` })} />
                                                                    </Box>
                                                                )}
                                                            </Flex>
                                                        </TabContent>
                                                    )
                                                );
                                            })}
                                    </TabsContent>
                                </Tab>
                            </Flex>
                        </MinhaContaCenterStyled>
                    </Flex>
                </Container>
            </Main>

            <FooterAlternate />
        </>
    );
};