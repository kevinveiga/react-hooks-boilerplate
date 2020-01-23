import React, { useCallback, useEffect, useState } from 'react';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoCategoriaApi, useCursoCategoriasApi } from '../../../service/curso';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

// import { Button } from '../../Button/Button';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container } from '../../../style/layout';
import { ListBox, ListBoxHover, ListLevel, ListTag, ListTime, ListTitle } from '../../../style/list';
import { Tab, TabContent, TabsContent, TabLabel, TabNav, TabsNav, TabSelect } from '../../../style/tab';
import { Title3, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Aprenda = () => {
    // API
    const [stateCursos] = useCursoApi(apiUrlCursos, {});
    const [stateCursosCategoria, setStateCursosCategoriaData] = useCursoCategoriaApi(null, {});
    const stateCursosCategorias = useCursoCategoriasApi(`${apiUrlCursos}/categorias`, {});

    const cursosLength = stateCursos.data && stateCursos.data.data ? Object.keys(stateCursos.data.data).length : 0;
    const cursosCategoriasLength = stateCursosCategorias.data && stateCursosCategorias.data.data && stateCursosCategorias.data.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursosLength > 0 && cursosCategoriasLength > 0;

    // ACTION
    const [stateCursosCategoriaSelected, setStateCursosCategoriaSelected] = useState('mais-vistos');
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // FUNCTION
    const handleCursoCategoriaChange = useCallback(
        () => (element) => {
            element.preventDefault();

            let apiValue = `${apiUrlCursos}/categorias/${element.target.value}`;

            if (element.target.value === 'mais-vistos') {
                apiValue = apiUrlCursos;
            }

            // Paginação desativada
            // setStateCursosCategoriaData({ page: 1, url: apiValue });
            setStateCursosCategoriaData({ url: apiValue });
            setStateCursosCategoriaSelected(element.target.value);
        },
        [setStateCursosCategoriaData]
    );

    return (
        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
            <Title3 align="center" fontWeight="700" themeColor="dark">
                Conheça os cursos da Liberta
            </Title3>

            <Title4 align="center" color="colorGray2" mb={5} themeColor="dark">
                Ele é considerado uma das alternativas preferidas de quem está começando.
            </Title4>

            <Tab group="tab-group-course" total={4}>
                {cursosCategoriasLength > 0 &&
                    stateCursosCategorias.data.data.map((categoria) => {
                        return (
                            <input
                                checked={stateCursosCategoriaSelected === categoria.slug}
                                id={`tab-id-course-${categoria.slug}`}
                                key={categoria.slug}
                                name="tab-group-course"
                                onChange={handleCursoCategoriaChange()}
                                type="radio"
                                value={categoria.slug}
                            />
                        );
                    })}

                {windowWidth < parseInt(variable.md, 10) && (
                    <TabSelect ml="auto" mr="auto">
                        <select onChange={handleCursoCategoriaChange()}>
                            {cursosCategoriasLength > 0 &&
                                stateCursosCategorias.data.data.map((categoria) => {
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

                <TabsNav display={{ d: 'none', md: 'block' }} textAlign="center">
                    {cursosCategoriasLength > 0 &&
                        stateCursosCategorias.data.data.map((categoria) => {
                            return (
                                <TabNav key={categoria.slug}>
                                    <TabLabel htmlFor={`tab-id-course-${categoria.slug}`}>{categoria.title}</TabLabel>
                                </TabNav>
                            );
                        })}
                </TabsNav>

                <TabsContent>
                    {cursosLength > 0 &&
                        stateCursos.data &&
                        Object.keys(stateCursos.data.data).map((key) => {
                            const categoria = stateCursos.data.data[key];

                            return (
                                <TabContent key={key}>
                                    <Flex display="flex" flexWrap="wrap">
                                        {categoria &&
                                            categoria.data.map((curso) => {
                                                return (
                                                    <Box key={curso.id} mb={5} width={{ d: 1, md: 1 / 3 }}>
                                                        <LinkTo ariaLabel={curso.title} height="100%" to={`/curso/${curso.id}`} width="100%">
                                                            <ListBox
                                                                alignContent="space-between"
                                                                color={categoria.featured_color}
                                                                display="flex"
                                                                flexWrap="wrap"
                                                                height="100%"
                                                                hover="true"
                                                                mx={2}
                                                                themeColor="dark"
                                                                verticalAlign="middle"
                                                            >
                                                                <ListBoxHover zindex="3">
                                                                    <Flex alignItems="center" display="flex" flexWrap="wrap" height="100%" justifyContent="center">
                                                                        <Box textAlign="center">
                                                                            <Svg fill="colorWhite" height="50px" mb={2} name="svg-plus" />

                                                                            <p>Saber mais</p>
                                                                        </Box>
                                                                    </Flex>
                                                                </ListBoxHover>

                                                                <Box width="100%">
                                                                    <Box overflow="hidden" pt="calc((9 / 16) * 100%)" width="100%">
                                                                        <BgImageLazyLoad key={curso.id} url={curso.imagens && curso.imagens.galeria.curso_listagem} />

                                                                        <ListTag>Gratuito</ListTag>
                                                                    </Box>

                                                                    <Box px={3} py={2} width="100%">
                                                                        <p>Curso {curso.modalidade}</p>

                                                                        <ListTitle>{curso.title}</ListTitle>
                                                                    </Box>
                                                                </Box>

                                                                <Box pb={3} px={3} width="100%">
                                                                    <Svg fill="colorSecondary" height="15px" name="svg-time" />

                                                                    <ListTime ml={1} mr={3}>
                                                                        {curso.carga_horaria}
                                                                    </ListTime>

                                                                    <Svg fill="colorSecondary" height="16px" name="svg-level" />

                                                                    <ListLevel ml={1}>{curso.nivel}</ListLevel>
                                                                </Box>
                                                            </ListBox>
                                                        </LinkTo>
                                                    </Box>
                                                );
                                            })}

                                        {/* {stateCursosCategoria.data && stateCursosCategoria.data.current_page < stateCursosCategoria.data.last_page && (
                                            <Box display="flex" justifyContent="center" py={3}>
                                                <Button text="Ver mais" themeType="border" onClick={() => setStateCursosCategoriaData({ page: parseInt(stateCursosCategoria.data.current_page, 10) + 1, url: `${apiUrlCursos}/categoria/${categoria.slug}` })} />
                                            </Box>
                                        )} */}
                                    </Flex>
                                </TabContent>
                            );
                        })}
                </TabsContent>
            </Tab>
        </Container>
    );
};
