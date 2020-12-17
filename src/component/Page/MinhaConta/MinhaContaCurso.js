import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import parse from 'html-react-parser';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoConteudoApi, useCursoConteudoVisualizadoApi } from '../../../service/curso';

import * as ACTION from '../../../store/action/action';
import { useBreadcrumb } from '../../../store/breadcrumb/breadcrumb';
import { MinhaContaCursoContext } from '../../../store/minhaConta/minhaContaCursoContext';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';
import { getStorage } from '../../../util/storage';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LoaderComponent } from '../../Loader/LoaderComponent';
import { Seo } from '../../Seo/Seo';

import { MinhaContaCenterStyled, MinhaContaExibirConteudoStyled } from './MinhaContaStyled';
import { TabContentStyled, TabsContentStyled, TabNavStyled, TabsNavStyled, TabStyled } from './MinhaContaTabStyled';

import { Box, Flex } from '../../../style/flex';
import { Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const MinhaContaConversacao = lazy(() => import('./MinhaContaConversacao'));
const MinhaContaCursoMenu = lazy(() => import('./MinhaContaCursoMenu'));
const MinhaContaCursoVideo = lazy(() => import('./MinhaContaCursoVideo'));

const MinhaContaCurso = ({ breadcrumb, match }) => {
    // API
    const [stateCurso] = useCursoApi(`${apiUrlCursos}/meus-cursos/${match.params.slug}`);
    const [stateCursoConteudo, stateCursoConteudoPrevNext, setStateCursoConteudoData] = useCursoConteudoApi();
    const [stateCursoProgresso, setStateCursoConteudoVisualizadoData] = useCursoConteudoVisualizadoApi();

    const cursoLength = stateCurso.data && stateCurso.data.data ? Object.keys(stateCurso.data.data).length : 0;
    const cursoConteudoLength = stateCursoConteudo.data && stateCursoConteudo.data.data ? Object.keys(stateCursoConteudo.data.data).length : 0;

    // Redirecionamento temporário
    if (stateCurso.isError == true) {
        window.location.assign('/minha-conta/cursos');
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursoLength > 0;

    // ACTION
    const { setStateBreadcrumbContext } = useBreadcrumb();
    const [stateCursoMenuConteudo, setStateCursoMenuConteudo] = useState(true);
    const [stateTabSelected, setStateTabSelected] = useState('resumo');
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (isDataLoaded) {
            setStateBreadcrumbContext({ breadcrumb: breadcrumb, currentLabel: curso.title });
        }

        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded, stateCursoConteudo]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // FUNCTION
    const handleTabChange = useCallback(
        () => (event) => {
            setStateTabSelected(event.target.value);
        },
        []
    );

    const handleMenuConteudo = useCallback(
        (value) => () => {
            setStateCursoMenuConteudo(value);
        },
        []
    );

    const handleCursoConteudoNext = useCallback(
        (curso, conteudo) => () => {
            if (conteudo) {
                // Muda checked do input checkbox
                const element = document.getElementById(`${curso.id}${conteudo.id}`);

                if (!element.checked) {
                    element.checked = true;

                    setStateCursoConteudoVisualizadoData({
                        action: ACTION.add(),
                        cursoId: curso.id,
                        url: `${apiUrlCursos}/meus-cursos/${curso.id}/${conteudo.id}`
                    });
                }

                if (stateCursoConteudoPrevNext.nextId) {
                    setStateCursoConteudoData({
                        conteudoId: stateCursoConteudoPrevNext.nextId,
                        cursoId: curso.id,
                        moduloCurrentId: stateCursoConteudoPrevNext.moduloCurrentId,
                        modulos: curso.modulos,
                        url: `${apiUrlCursos}/meus-cursos`
                    });
                }
            }
        },
        [stateCursoConteudoPrevNext, setStateCursoConteudoData, setStateCursoConteudoVisualizadoData]
    );

    const handleCursoConteudoPrev = useCallback(
        (curso) => () => {
            setStateCursoConteudoData({
                conteudoId: stateCursoConteudoPrevNext.prevId,
                cursoId: curso.id,
                moduloCurrentId: stateCursoConteudoPrevNext.moduloCurrentId,
                modulos: curso.modulos,
                url: `${apiUrlCursos}/meus-cursos`
            });
        },
        [stateCursoConteudoPrevNext, setStateCursoConteudoData]
    );

    // DATA
    const curso = cursoLength > 0 && stateCurso.data.data;
    const cursoProgresso = stateCursoProgresso.data && stateCursoProgresso.data.data && stateCursoProgresso.data.data.progresso;
    const conteudo = cursoConteudoLength > 0 && stateCursoConteudo.data.data;

    // ACTION CONTEUDO
    useEffect(() => {
        const conteudoAtualData = getStorage('conteudoAtualData') && JSON.parse(getStorage('conteudoAtualData'));

        if (curso) {
            if (conteudoAtualData && curso.id == conteudoAtualData.cursoId) {
                setStateCursoConteudoData({
                    conteudoId: conteudoAtualData.conteudoId,
                    cursoId: conteudoAtualData.cursoId,
                    moduloCurrentId: conteudoAtualData.moduloCurrentId,
                    modulos: conteudoAtualData.modulos,
                    url: conteudoAtualData.url
                });
            } else {
                setStateCursoConteudoData({
                    conteudoId: curso.modulos[0].conteudos[0].id,
                    cursoId: curso.id,
                    moduloCurrentId: curso.modulos[0].id,
                    modulos: curso.modulos,
                    url: `${apiUrlCursos}/meus-cursos`
                });
            }
        }

        return undefined;
    }, [curso, setStateCursoConteudoData]);

    return (
        <>
            <Seo>
                <title>{curso && curso.title}</title>
                <meta name="description" content={curso && curso.description} />
            </Seo>

            <MinhaContaCursoContext.Provider
                value={{
                    stateCursoConteudoPrevNextContext: stateCursoConteudoPrevNext,
                    stateCursoProgressoContext: cursoProgresso || curso.progresso,
                    setStateCursoConteudoDataContext: setStateCursoConteudoData,
                    setStateCursoConteudoVisualizadoDataContext: setStateCursoConteudoVisualizadoData,
                    setStateCursoMenuConteudoContext: setStateCursoMenuConteudo
                }}
            >
                {stateCurso.isError == true && (
                    <Title4 color="colorPrimary" my={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                        {/* TODO: colocar layout */}
                        Curso não encontrado
                    </Title4>
                )}

                {curso && (
                    <MinhaContaCenterStyled pb={{ d: 4, sm: 5 }} pl={{ d: 3, sm: 5 }}>
                        {windowWidth < parseInt(variable.lg, 10) && (
                            <Breadcrumb
                                breadcrumb={breadcrumb}
                                currentLabel={curso.title}
                                obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                                pt={{ d: 4, sm: 5 }}
                            />
                        )}

                        <Flex display="flex" flexWrap="wrap">
                            <Box pr={{ d: 3, sm: 5 }} pt={{ d: 3, lg: '75px' }} width={{ d: 1, lg: stateCursoMenuConteudo ? 7 / 10 : 1 }}>
                                <Box mb={3} overflowY={conteudo.tipo === 'video' ? 'hidden' : 'auto'} width="100%">
                                    {conteudo.tipo === 'audio' && ''}
                                    {conteudo.tipo === 'download' && ''}
                                    {conteudo.tipo === 'imagem' && (
                                        <Box pt="calc((9 / 16) * 100%)">
                                            <BgImageLazyLoad url={conteudo.imagem && conteudo.imagem} />
                                        </Box>
                                    )}
                                    {conteudo.tipo === 'post' && parse(`${conteudo && conteudo.content}`)}
                                    {conteudo.tipo === 'video' && (
                                        <ErrorBoundary>
                                            <Suspense fallback={<LoaderComponent />}>
                                                <MinhaContaCursoVideo conteudo={conteudo} curso={curso} cursoConteudoNext={handleCursoConteudoNext} />
                                            </Suspense>
                                        </ErrorBoundary>
                                    )}
                                </Box>

                                <Flex display="flex" justifyContent="space-between" mb={3} flexWrap="wrap">
                                    <Box>
                                        <Button
                                            borderColor="colorGray"
                                            color="colorBlack3"
                                            disabled={!stateCursoConteudoPrevNext.prevId}
                                            display="inline-block"
                                            fontSize={{ d: '11px', sm: '14px' }}
                                            height={{ d: '40px', sm: '50px' }}
                                            hoverColor="colorGray"
                                            onClick={handleCursoConteudoPrev(curso)}
                                            text="Conteúdo anterior"
                                            textTransform="uppercase"
                                            themeSize={windowWidth < parseInt(variable.sm, 10) ? 'small' : undefined}
                                            themeType="border"
                                            width={{ d: '100%', sm: 'auto' }}
                                        />
                                    </Box>

                                    <Box>
                                        <Button
                                            borderColor="colorGray"
                                            color="colorBlack3"
                                            disabled={!stateCursoConteudoPrevNext.nextId}
                                            display="inline-block"
                                            fontSize={{ d: '11px', sm: '14px' }}
                                            height={{ d: '40px', sm: '50px' }}
                                            hoverColor="colorGray"
                                            onClick={handleCursoConteudoNext(curso, conteudo)}
                                            text="Próximo Conteúdo"
                                            textTransform="uppercase"
                                            themeSize={windowWidth < parseInt(variable.sm, 10) ? 'small' : undefined}
                                            themeType="border"
                                            width={{ d: '100%', sm: 'auto' }}
                                        />
                                    </Box>
                                </Flex>

                                {/* MinhaContaCursoMenu Mobile */}
                                {windowWidth < parseInt(variable.lg, 10) && (
                                    <>
                                        <MinhaContaExibirConteudoStyled display={stateCursoMenuConteudo ? 'none' : 'block'} p={4}>
                                            <Button
                                                display="block"
                                                fontWeight="400"
                                                mx="auto"
                                                onClick={handleMenuConteudo(true)}
                                                text="Exibir menu"
                                                textDecoration="underline"
                                                themeSize="none"
                                                themeType="none"
                                            />
                                        </MinhaContaExibirConteudoStyled>

                                        <Box>
                                            <Suspense fallback={<LoaderComponent />}>
                                                <MinhaContaCursoMenu active={stateCursoMenuConteudo} objectCurso={curso} />
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
                                            onChange={handleTabChange()}
                                            type="radio"
                                            value="resumo"
                                        />

                                        <input
                                            checked={stateTabSelected === 'conteudo'}
                                            id="tab-id-conteudo"
                                            name="tab-group"
                                            onChange={handleTabChange()}
                                            type="radio"
                                            value="conteudo"
                                        />

                                        <input
                                            checked={stateTabSelected === 'duvidas'}
                                            id="tab-id-duvidas"
                                            name="tab-group"
                                            onChange={handleTabChange()}
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
                                                    <Title4 color="colorPrimary" my={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                                        {/* TODO: colocar layout */}
                                                        Conteúdo não encontrado
                                                    </Title4>
                                                ) : (
                                                    <>
                                                        <Title4 fontWeight="700" mb={3}>
                                                            {conteudo && conteudo.title}
                                                        </Title4>

                                                        <div>{parse(`${conteudo && conteudo.content}`)}</div>
                                                    </>
                                                )}
                                            </TabContentStyled>

                                            {/* <TabContentStyled>
                                                <Title4>Conteúdo</Title4>

                                                <div>{parse(`${curso.content}`)}</div>
                                            </TabContentStyled> */}

                                            {/* <TabContentStyled>
                                                <Title4>Dúvidas</Title4>

                                                <Suspense fallback={<LoaderComponent />}>
                                                    <MinhaContaConversacao obj={null} />
                                                </Suspense>
                                            </TabContentStyled> */}
                                        </TabsContentStyled>
                                    </TabStyled>
                                </Box>
                            </Box>

                            {/* MinhaContaCursoMenu Desktop */}
                            {windowWidth > parseInt(variable.lg, 10) && (
                                <>
                                    <MinhaContaExibirConteudoStyled
                                        display={stateCursoMenuConteudo ? 'none' : 'block'}
                                        position="absolute"
                                        right="50px"
                                        top="25px"
                                    >
                                        <Button
                                            fontWeight="400"
                                            onClick={handleMenuConteudo(true)}
                                            text="Exibir menu"
                                            textDecoration="underline"
                                            themeSize="none"
                                            themeType="none"
                                        />
                                    </MinhaContaExibirConteudoStyled>

                                    <Box height={stateCursoMenuConteudo ? 'auto' : 0} width={{ d: 1, lg: stateCursoMenuConteudo ? 3 / 10 : 0 }}>
                                        <Suspense fallback={<LoaderComponent />}>
                                            <MinhaContaCursoMenu active={stateCursoMenuConteudo} objectCurso={curso} />
                                        </Suspense>
                                    </Box>
                                </>
                            )}
                        </Flex>
                    </MinhaContaCenterStyled>
                )}
            </MinhaContaCursoContext.Provider>
        </>
    );
};

export default MinhaContaCurso;
