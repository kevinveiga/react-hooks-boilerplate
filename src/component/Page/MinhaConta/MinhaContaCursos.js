import React, { useCallback, useEffect, useState } from 'react';

import parse from 'html-react-parser';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoCategoriasApi } from '../../../service/curso';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Box, Flex } from '../../../style/flex';
import { ListBox, ListLevel, ListTitle, ListTime } from '../../../style/list';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { Tab, TabContent, TabsContent, TabSelect } from '../../../style/tab';
import { Span, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

const MinhaContaCursos = () => {
    // VARIABLE
    let noData = true;

    // API
    const [stateCursos] = useCursoApi(`${apiUrlCursos}/meus-cursos`);
    const stateCursosCategorias = useCursoCategoriasApi(`${apiUrlCursos}/categorias`);

    const cursosLength = stateCursos.data && stateCursos.data.data ? Object.keys(stateCursos.data.data).length : 0;
    const cursosCategoriasLength =
        stateCursosCategorias.data && stateCursosCategorias.data.data && Object.keys(stateCursosCategorias.data.data).length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursosLength > 0 && cursosCategoriasLength > 0;

    // ACTION
    const [stateCursosCategoriaSelected, setStateCursosCategoriaSelected] = useState('todos');
    const windowWidth = useWindowWidth();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // FUNCTION
    const handleCursoCategoriaChange = useCallback(
        () => (element) => {
            element.preventDefault();

            setStateCursosCategoriaSelected(element.target.value);
        },
        []
    );

    // DATA
    const meusCursos = cursosLength > 0 && stateCursos.data.data;

    return (
        <MinhaContaCenterStyled px={{ d: 3, sm: 5 }} py={{ d: 4, sm: 5 }}>
            {windowWidth < parseInt(variable.lg, 10) && <Breadcrumb currentLabel="Cursos" obj={{ hoverColor: 'colorPrimary' }} pb={4} />}

            <Flex display="flex" flexWrap="wrap">
                <Tab group="tab-group-course" total={4}>
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

                                        return (
                                            cursos.data.length > 0 &&
                                            cursos.data.map((curso) => {
                                                noData = false;

                                                return (
                                                    <Box key={curso.id} mb={5} width="100%">
                                                        <LinkTo
                                                            ariaLabel={curso.title}
                                                            height="100%"
                                                            link={`/minha-conta/curso/${curso.id}`}
                                                            width="100%"
                                                        >
                                                            <ListBox
                                                                display="flex"
                                                                flexWrap="wrap"
                                                                height="100%"
                                                                mx={{ d: 0, md: 2 }}
                                                                themeColor="dark"
                                                            >
                                                                <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                    <Box overflow="hidden" width={{ d: 1, md: 7 / 12 }}>
                                                                        <Box height={{ d: '200px', md: '100%' }} pt="calc((9 / 16) * 100%)">
                                                                            <BgImageLazyLoad
                                                                                key={curso.id}
                                                                                url={curso.imagens && curso.imagens.meus_cursos.curso_usuario}
                                                                            />
                                                                        </Box>
                                                                    </Box>

                                                                    <Box
                                                                        alignContent="space-between"
                                                                        display="flex"
                                                                        flexWrap="wrap"
                                                                        p={{ d: 3, md: 4 }}
                                                                        width={{ d: 1, md: 5 / 12 }}
                                                                    >
                                                                        <Box
                                                                            height={{ d: 'auto', md: '160px' }}
                                                                            mb={4}
                                                                            overflowY="hidden"
                                                                            width="100%"
                                                                        >
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
                                                                        <Box pr={3}>
                                                                            <Span fontSize="16px" fontWeight="700" themeColor="light">
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

                                {noData && stateCursos.isLoading && (
                                    <Box mb={5} textAlign="center" width="100%">
                                        <Title4 color="colorPrimary" themeColor="dark">
                                            Carregando...
                                        </Title4>
                                    </Box>
                                )}

                                {noData && cursosLength === 0 && !stateCursos.isLoading && (
                                    <>
                                        <Box mb={5} textAlign="center" width="100%">
                                            <Title4 color="colorPrimary" themeColor="dark">
                                                Nenhum curso encontrado.
                                            </Title4>
                                        </Box>

                                        <Box mb={5} textAlign="center" width="100%">
                                            <LinkTo link="/aprenda">
                                                <Button text="Ver mais cursos" />
                                            </LinkTo>
                                        </Box>
                                    </>
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
                                                            <LinkTo
                                                                ariaLabel={curso.title}
                                                                height="100%"
                                                                link={`/minha-conta/curso/${curso.id}`}
                                                                width="100%"
                                                            >
                                                                <ListBox
                                                                    display="flex"
                                                                    flexWrap="wrap"
                                                                    height="100%"
                                                                    mx={{ d: 0, md: 2 }}
                                                                    themeColor="dark"
                                                                >
                                                                    <Box display={{ d: 'block', md: 'flex' }} width="100%">
                                                                        <Box overflow="hidden" width={{ d: 1, md: 7 / 12 }}>
                                                                            <Box height={{ d: '200px', md: '100%' }} pt="calc((9 / 16) * 100%)">
                                                                                <BgImageLazyLoad
                                                                                    key={curso.id}
                                                                                    url={curso.imagens && curso.imagens.meus_cursos.curso_usuario}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <Box
                                                                            alignContent="space-between"
                                                                            display="flex"
                                                                            flexWrap="wrap"
                                                                            p={{ d: 3, md: 4 }}
                                                                            width={{ d: 1, md: 5 / 12 }}
                                                                        >
                                                                            <Box
                                                                                height={{ d: 'auto', md: '160px' }}
                                                                                mb={4}
                                                                                overflowY="hidden"
                                                                                width="100%"
                                                                            >
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
                                                                            <Box pr={3}>
                                                                                <Span fontSize="16px" fontWeight="700" themeColor="light">
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
                                                <Title4
                                                    color="colorPrimary"
                                                    key={key}
                                                    my={{ d: 4, md: 5 }}
                                                    mx="auto"
                                                    textAlign="center"
                                                    themeColor="dark"
                                                >
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
    );
};

export default MinhaContaCursos;
