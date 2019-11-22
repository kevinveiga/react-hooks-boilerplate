import parse from 'html-react-parser';
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoConteudoApi, useCursoConteudoVisualizadoApi } from '../../../service/curso';

import { Context } from '../../../store/context';
import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';

import { MinhaContaCenterStyled, MinhaContaExibirConteudoStyled } from './MinhaContaStyled';
import { TabContentStyled, TabsContentStyled, TabNavStyled, TabsNavStyled, TabStyled } from './MinhaContaTabStyled';

import { Box, Flex } from '../../../style/flex';
import { Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { P, Title2, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const MinhaContaConversacao = lazy(() => import('./MinhaContaConversacao'));
const MinhaContaCursoMenu = lazy(() => import('./MinhaContaCursoMenu'));
const MinhaContaCursoVideo = lazy(() => import('./MinhaContaCursoVideo'));

export const MinhaContaCurso = ({ match, ...breadcrumb }) => {
    // API CURSO
    const [stateCurso] = useCursoApi(`${apiUrlCursos}/meus-cursos/${match.params.slug}`, {});
    const [stateCursoConteudo, stateCursoConteudoPrevNextId, setStateCursoConteudoData] = useCursoConteudoApi(null, {});
    const [stateCursoConteudoVisualizado, setStateCursoConteudoVisualizadoUrl] = useCursoConteudoVisualizadoApi(null, {});

    const cursoLength = stateCurso.data.data ? Object.keys(stateCurso.data.data).length : 0;
    const cursoConteudoLength = stateCursoConteudo.data.data ? Object.keys(stateCursoConteudo.data.data).length : 0;

    // Redirecionamento temporário
    if (stateCurso.isError == true) {
        window.location.pathname = '/';
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursoLength > 0;

    // CONTEXT
    const { setStateLoaderContext } = useContext(Context);

    // ACTION
    const [stateMenuConteudo, setStateMenuConteudo] = useState(true);
    const [stateTabSelected, setStateTabSelected] = useState('resumo');
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded, stateCursoConteudo]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // Loader
    useEffect(() => {
        if (stateCurso.isLoading || stateCursoConteudo.isLoading) {
            setStateLoaderContext(true);
        } else {
            setTimeout(() => {
                setStateLoaderContext(false);
            }, variable.timeout1s);
        }

        return undefined;
    }, [stateCurso.isLoading, stateCursoConteudo.isLoading, setStateLoaderContext]);

    const handleTabChange = (e) => {
        setStateTabSelected(e.target.value);
    };

    // DATA
    const curso = cursoLength > 0 && stateCurso.data.data;
    const conteudo = cursoConteudoLength > 0 && stateCursoConteudo.data.data;

    return (
        <>
            <Helmet>
                <title>{curso && curso.title}</title>
                <meta name="description" content={curso && curso.description} />
            </Helmet>

            <HeaderAlternate currentBreadcrumbLabel={curso.title} {...breadcrumb} />

            <MinhaContaCursoContext.Provider
                value={{
                    setStateCursoConteudoDataContext: setStateCursoConteudoData,
                    setStateMenuConteudoContext: setStateMenuConteudo
                }}
            >
                <Main header="minhaConta">
                    {stateCurso.isError == true && (
                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                            <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                {/* TODO: colocar layout */}
                                Curso não encontrado
                            </Title4>
                        </Container>
                    )}

                    {curso && (
                        <Container mx="auto" px={{ d: 0, lg: 3 }}>
                            <Flex display="flex" flexWrap="wrap">
                                <MinhaContaCenterStyled pl={{ d: 3, sm: 5 }} py={{ d: 3, sm: 5 }} width="100%">
                                    {windowWidth < parseInt(variable.md, 10) && <Breadcrumb currentLabel={curso.title} obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                                    <Flex display="flex" flexWrap="wrap">
                                        <Box pr={{ d: 3, sm: 5 }} width={{ d: 1, md: stateMenuConteudo ? 7 / 10 : 1 }}>
                                            <Box maxHeight="80vh" minHeight="25vh" mb={3} overflowY={conteudo.tipo === 'video' ? 'hidden' : 'auto'}>
                                                {conteudo.tipo === 'audio' && ''}
                                                {conteudo.tipo === 'download' && ''}
                                                {conteudo.tipo === 'imagem' && <Image maxHeight="55vh" minHeight="25vh" text={conteudo.title} url={conteudo.imagem} width="100%" />}
                                                {conteudo.tipo === 'post' && parse(`${conteudo && conteudo.content}`)}
                                                {conteudo.tipo === 'video' && (
                                                    <Suspense fallback={<P themeColor="light">Carregando...</P>}>
                                                        <MinhaContaCursoVideo conteudo={conteudo} apiUrl={`${apiUrlCursos}/meus-cursos/${match.params.slug}/${conteudo.id}/registrar-visualizacao`} />
                                                    </Suspense>
                                                )}
                                            </Box>

                                            <Flex display="flex" justifyContent="space-between" mb={3} flexWrap="wrap">
                                                <Box>
                                                    <Button
                                                        borderColor="colorGray"
                                                        color="colorBlack3"
                                                        disabled={!stateCursoConteudoPrevNextId.prevId}
                                                        display="inline-block"
                                                        fontSize={{ d: '12px', sm: '16px' }}
                                                        height={{ d: '40px', sm: '50px' }}
                                                        onClick={() =>
                                                            setStateCursoConteudoData({
                                                                conteudoId: stateCursoConteudoPrevNextId.prevId,
                                                                modulos: curso.modulos,
                                                                url: `${apiUrlCursos}/meus-cursos/${curso.id}`
                                                            })
                                                        }
                                                        text="Conteúdo anterior"
                                                        themeSize={windowWidth < parseInt(variable.sm, 10) ? 'small' : undefined}
                                                        themeType="border"
                                                        width={{ d: '100%', sm: 'auto' }}
                                                    />
                                                </Box>

                                                <Box>
                                                    <Button
                                                        borderColor="colorGray"
                                                        color="colorBlack3"
                                                        disabled={!stateCursoConteudoPrevNextId.nextId}
                                                        display="inline-block"
                                                        fontSize={{ d: '12px', sm: '16px' }}
                                                        height={{ d: '40px', sm: '50px' }}
                                                        onClick={() => {
                                                            document.getElementById(`${curso.id}${conteudo.id}`).checked = true;
                                                            setStateCursoConteudoVisualizadoUrl(`${apiUrlCursos}/meus-cursos/${curso.id}/${conteudo.id}/registrar-visualizacao`);
                                                            setStateCursoConteudoData({
                                                                conteudoId: stateCursoConteudoPrevNextId.nextId,
                                                                modulos: curso.modulos,
                                                                url: `${apiUrlCursos}/meus-cursos/${curso.id}`
                                                            });
                                                        }}
                                                        text="Próximo Conteúdo"
                                                        themeSize={windowWidth < parseInt(variable.sm, 10) ? 'small' : undefined}
                                                        themeType="border"
                                                        width={{ d: '100%', sm: 'auto' }}
                                                    />
                                                </Box>
                                            </Flex>

                                            {/* MinhaContaCursoMenu Mobile */}
                                            {windowWidth < parseInt(variable.md, 10) && (
                                                <>
                                                    <MinhaContaExibirConteudoStyled display={stateMenuConteudo ? 'none' : 'block'} p={4}>
                                                        <Button
                                                            display="block"
                                                            fontWeight="400"
                                                            mx="auto"
                                                            onClick={() => setStateMenuConteudo(true)}
                                                            text="Exibir aulas"
                                                            textDecoration="underline"
                                                            themeSize="none"
                                                            themeType="none"
                                                        />
                                                    </MinhaContaExibirConteudoStyled>

                                                    <Box>
                                                        <Suspense fallback={<P>Carregando...</P>}>
                                                            <MinhaContaCursoMenu active={stateMenuConteudo} objectCurso={curso} />
                                                        </Suspense>
                                                    </Box>
                                                </>
                                            )}

                                            <Box>
                                                <TabStyled group="tab-group" total={1}>
                                                    <input
                                                        checked={stateTabSelected === 'resumo'}
                                                        id="tab-id-resumo"
                                                        name="tab-group"
                                                        onChange={(e) => {
                                                            handleTabChange(e);
                                                        }}
                                                        type="radio"
                                                        value="resumo"
                                                    />

                                                    <input
                                                        checked={stateTabSelected === 'conteudo'}
                                                        id="tab-id-conteudo"
                                                        name="tab-group"
                                                        onChange={(e) => {
                                                            handleTabChange(e);
                                                        }}
                                                        type="radio"
                                                        value="conteudo"
                                                    />

                                                    <input
                                                        checked={stateTabSelected === 'duvidas'}
                                                        id="tab-id-duvidas"
                                                        name="tab-group"
                                                        onChange={(e) => {
                                                            handleTabChange(e);
                                                        }}
                                                        type="radio"
                                                        value="duvidas"
                                                    />

                                                    <TabsNavStyled>
                                                        <TabNavStyled>
                                                            <label htmlFor="tab-id-resumo">Resumo</label>
                                                        </TabNavStyled>

                                                        {/* <TabNavStyled>
                                                            <label htmlFor="tab-id-conteudo">Conteúdo</label>
                                                        </TabNavStyled> */}

                                                        {/* <TabNavStyled>
                                                            <label htmlFor="tab-id-duvidas">Dúvidas</label>
                                                        </TabNavStyled> */}
                                                    </TabsNavStyled>

                                                    <TabsContentStyled>
                                                        <TabContentStyled>
                                                            {stateCursoConteudo.isError == true || conteudo == false ? (
                                                                <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                                                    {/* TODO: colocar layout */}
                                                                    Conteúdo não encontrado
                                                                </Title4>
                                                            ) : (
                                                                <>
                                                                    <Title2>{conteudo && conteudo.title}</Title2>

                                                                    <div>{parse(`${conteudo && conteudo.content}`)}</div>
                                                                </>
                                                            )}
                                                        </TabContentStyled>

                                                        {/* <TabContentStyled>
                                                            <Title2>Conteúdo</Title2>

                                                            <div>{parse(`${curso.content}`)}</div>
                                                        </TabContentStyled> */}

                                                        {/* <TabContentStyled>
                                                            <Title2>Dúvidas</Title2>

                                                            <Suspense fallback={<P>Carregando...</P>}>
                                                                <MinhaContaConversacao obj={null} />
                                                            </Suspense>
                                                        </TabContentStyled> */}
                                                    </TabsContentStyled>
                                                </TabStyled>
                                            </Box>
                                        </Box>

                                        {/* MinhaContaCursoMenu Desktop */}
                                        {windowWidth > parseInt(variable.md, 10) && (
                                            <>
                                                <MinhaContaExibirConteudoStyled display={stateMenuConteudo ? 'none' : 'block'} position="absolute" right="50px" top="-35px">
                                                    <Button
                                                        fontWeight="400"
                                                        onClick={() => setStateMenuConteudo(true)}
                                                        text="Exibir aulas"
                                                        textDecoration="underline"
                                                        themeSize="none"
                                                        themeType="none"
                                                    />
                                                </MinhaContaExibirConteudoStyled>

                                                <Box height={stateMenuConteudo ? 'auto' : 0} width={{ d: 1, md: stateMenuConteudo ? 3 / 10 : 0 }}>
                                                    <Suspense fallback={<P>Carregando...</P>}>
                                                        <MinhaContaCursoMenu active={stateMenuConteudo} objectCurso={curso} />
                                                    </Suspense>
                                                </Box>
                                            </>
                                        )}
                                    </Flex>
                                </MinhaContaCenterStyled>
                            </Flex>
                        </Container>
                    )}
                </Main>
            </MinhaContaCursoContext.Provider>

            <FooterAlternate />
        </>
    );
};
