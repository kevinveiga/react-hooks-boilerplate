import React, { useContext, useEffect, useState } from 'react';

import parse from 'html-react-parser';
import { Helmet } from 'react-helmet-async';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoCategoriasApi } from '../../../service/curso';
// import { useSeoApi } from '../../../service/seo';

import { Context } from '../../../store/context';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { MinhaContaMenu } from './MinhaContaMenu';

import { Svg } from '../../Svg/Svg';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { ListBox, ListLevel, ListTitle, ListTime } from '../../../style/list';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { Tab, TabContent, TabsContent, TabSelect } from '../../../style/tab';
import { Span, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

const MinhaContaCursos = ({ ...breadcrumb }) => {
    // API
    const [stateCursos] = useCursoApi(`${apiUrlCursos}/meus-cursos`, {});
    const stateCursosCategorias = useCursoCategoriasApi(`${apiUrlCursos}/categorias`, {});

    // const stateSeo = useSeoApi(`${apiUrlCursos}/seo`, {});

    const cursosLength = stateCursos.data && stateCursos.data.data ? Object.keys(stateCursos.data.data).length : 0;
    const cursosCategoriasLength = stateCursosCategorias.data && stateCursosCategorias.data.data && Object.keys(stateCursosCategorias.data.data).length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursosLength > 0 && cursosCategoriasLength > 0;

    // CONTEXT
    const { setStateLoaderContext } = useContext(Context);

    // ACTION
    const [stateCursosCategoriaSelected, setStateCursosCategoriaSelected] = useState('todos');
    const windowWidth = useWindowWidth();

    const handleCursoCategoriaChange = () => (e) => {
        e.preventDefault();
        setStateCursosCategoriaSelected(e.target.value);
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // Loader
    useEffect(() => {
        if (stateCursos.isLoading || stateCursosCategorias.isLoading) {
            setStateLoaderContext(true);
        } else {
            setTimeout(() => {
                setStateLoaderContext(false);
            }, variable.timeout1s);
        }

        return undefined;
    }, [stateCursos.isLoading, stateCursosCategorias.isLoading, setStateLoaderContext]);

    // DATA
    const meusCursos = cursosLength > 0 && stateCursos.data.data;

    let noData;

    return (
        <>
            <Helmet>{/* <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} /> */}</Helmet>

            <HeaderAlternate currentBreadcrumbLabel="Cursos" {...breadcrumb} />

            <Main header="minhaConta">
                <Container mx="auto" px={{ d: 0, lg: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <MinhaContaMenu />

                        <MinhaContaCenterStyled p={{ d: 3, md: 5 }} width={{ d: '100%', lg: 8 / 10 }}>
                            {windowWidth < parseInt(variable.md, 10) && <Breadcrumb currentLabel="Cursos" obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                            <Flex display="flex" flexWrap="wrap">
                                <Tab group="tab-group-course" total={4} width="100%">
                                    <input
                                        checked={stateCursosCategoriaSelected === 'todos'}
                                        id="tab-id-course-todos"
                                        name="tab-group-course"
                                        onChange={handleCursoCategoriaChange()}
                                        type="radio"
                                        value="todos"
                                    />

                                    {cursosCategoriasLength > 0 &&
                                        stateCursosCategorias.data.data.map((categoria, i) => {
                                            return (
                                                i > 0 && (
                                                    <input
                                                        checked={stateCursosCategoriaSelected === categoria.slug}
                                                        id={`tab-id-course-${categoria.slug}`}
                                                        key={`${categoria.slug}-input`}
                                                        name="tab-group-course"
                                                        onChange={handleCursoCategoriaChange()}
                                                        type="radio"
                                                        value={categoria.slug}
                                                    />
                                                )
                                            );
                                        })}

                                    <TabSelect ml="auto" mr="auto">
                                        <select onChange={handleCursoCategoriaChange()}>
                                            <option value="todos">Todos</option>

                                            {cursosCategoriasLength > 0 &&
                                                stateCursosCategorias.data.data.map((categoria, i) => {
                                                    return (
                                                        i > 0 && (
                                                            <option key={`${categoria.slug}-option`} value={categoria.slug}>
                                                                {categoria.title}
                                                            </option>
                                                        )
                                                    );
                                                })}
                                        </select>

                                        <Svg name="svg-arrow-down" />
                                    </TabSelect>

                                    <TabsContent>
                                        <TabContent>
                                            <Flex display="flex" flexWrap="wrap">
                                                {meusCursos &&
                                                    Object.keys(meusCursos).map((key) => {
                                                        const cursos = meusCursos[key];

                                                        noData = true;

                                                        return (
                                                            cursos.data.length > 0 &&
                                                            cursos.data.map((curso) => {
                                                                noData = false;

                                                                return (
                                                                    <Box key={curso.id} mb={5} width="100%">
                                                                        <LinkTo ariaLabel={curso.title} height="100%" to={`/minha-conta/curso/${curso.id}`} width="100%">
                                                                            <ListBox color={curso.featured_color} display="flex" flexWrap="wrap" height="100%" mx={{ d: 0, md: 2 }} themeColor="dark">
                                                                                <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                                    <Box height={{ d: '200px', md: '100%' }} overflow="hidden" width={{ d: 1, md: 1 / 2 }}>
                                                                                        <BgImageLazyLoad key={curso.id} url={curso.imagens && curso.imagens.meus_cursos.curso_usuario} />
                                                                                    </Box>

                                                                                    <Box alignContent="space-between" display="flex" flexWrap="wrap" p={{ d: 3, md: 4 }} width={{ d: 1, md: 1 / 2 }}>
                                                                                        <Box height={{ d: 'auto', md: '200px' }} mb={4} overflowY="hidden" width="100%">
                                                                                            <ListTitle mb={3}>{curso.title}</ListTitle>

                                                                                            <div>{parse(`${curso.content}`)}</div>
                                                                                        </Box>

                                                                                        <Box width="100%">
                                                                                            <Svg fill="colorSecondary" height="13px" name="svg-time" />

                                                                                            <ListTime ml={1} mr={3}>
                                                                                                {curso.carga_horaria}
                                                                                            </ListTime>

                                                                                            <Svg fill="colorSecondary" height="14px" name="svg-level" />

                                                                                            <ListLevel ml={1}>{curso.nivel}</ListLevel>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Box>

                                                                                <Box width="100%">
                                                                                    <ProgressBar
                                                                                        alignItems="center"
                                                                                        display={{ d: 'block', md: 'flex' }}
                                                                                        px={{ d: 3, md: 4 }}
                                                                                        py={2}
                                                                                        progressPercent={curso.progresso}
                                                                                        themeColor="light"
                                                                                    >
                                                                                        <Box width="170px">
                                                                                            <Span fontSize="16px" fontWeight="600" themeColor="light">
                                                                                                PROGRESSO {parseInt(curso.progresso, 10)}%
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
                                                            })
                                                        );
                                                    })}

                                                {noData && (
                                                    <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                                        {/* TODO: colocar layout */}
                                                        Nenhum curso encontrado
                                                    </Title4>
                                                )}
                                            </Flex>
                                        </TabContent>

                                        {cursosLength > 0 &&
                                            stateCursos.data &&
                                            Object.keys(stateCursos.data.data).map((key) => {
                                                const cursos = stateCursos.data.data[key];

                                                return (
                                                    <TabContent key={key}>
                                                        <Flex display="flex" flexWrap="wrap">
                                                            {cursos.data.length > 0 ? (
                                                                cursos.data.map((curso) => {
                                                                    return (
                                                                        <Box key={curso.id} mb={5} width="100%">
                                                                            <LinkTo ariaLabel={curso.title} height="100%" to={`/minha-conta/curso/${curso.id}`} width="100%">
                                                                                <ListBox
                                                                                    color={curso.featured_color}
                                                                                    display="flex"
                                                                                    flexWrap="wrap"
                                                                                    height="100%"
                                                                                    mx={{ d: 0, md: 2 }}
                                                                                    themeColor="dark"
                                                                                >
                                                                                    <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                                        <Box height={{ d: '200px', md: '100%' }} overflow="hidden" width={{ d: 1, md: 1 / 2 }}>
                                                                                            <BgImageLazyLoad key={curso.id} url={curso.imagens && curso.imagens.meus_cursos.curso_usuario} />
                                                                                        </Box>

                                                                                        <Box
                                                                                            alignContent="space-between"
                                                                                            display="flex"
                                                                                            flexWrap="wrap"
                                                                                            p={{ d: 3, md: 4 }}
                                                                                            width={{ d: 1, md: 1 / 2 }}
                                                                                        >
                                                                                            <Box height="200px" mb={4} overflowY="hidden" width="100%">
                                                                                                <ListTitle mb={3}>{curso.title}</ListTitle>

                                                                                                <div>{parse(`${curso.content}`)}</div>
                                                                                            </Box>

                                                                                            <Box width="100%">
                                                                                                <Svg fill="colorSecondary" height="13px" name="svg-time" />

                                                                                                <ListTime ml={1} mr={3}>
                                                                                                    {curso.carga_horaria}
                                                                                                </ListTime>

                                                                                                <Svg fill="colorSecondary" height="14px" name="svg-level" />

                                                                                                <ListLevel ml={1}>{curso.nivel}</ListLevel>
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Box>

                                                                                    <Box width="100%">
                                                                                        <ProgressBar
                                                                                            alignItems="center"
                                                                                            display={{ d: 'block', md: 'flex' }}
                                                                                            px={{ d: 3, md: 4 }}
                                                                                            py={2}
                                                                                            progressPercent={curso.progresso}
                                                                                            themeColor="light"
                                                                                        >
                                                                                            <Box width="170px">
                                                                                                <Span fontSize="16px" fontWeight="600" themeColor="light">
                                                                                                    PROGRESSO {parseInt(curso.progresso, 10)}%
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
                                                                })
                                                            ) : (
                                                                <Title4 color="colorPrimary" key={key} mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                                                    {/* TODO: colocar layout */}
                                                                    Nenhum curso encontrado
                                                                </Title4>
                                                            )}
                                                        </Flex>
                                                    </TabContent>
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

export default MinhaContaCursos;
