import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlCursos } from '../../../config';

import { useCursoApi } from '../../../service/curso';

import { Context } from '../../../store/context';
import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';

import { MinhaContaCenterStyled, MinhaContaExibirAulaStyled } from './MinhaContaStyled';
import { TabContentStyled, TabsContentStyled, TabNavStyled, TabsNavStyled, TabStyled } from './MinhaContaTabStyled';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { P, Title2, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const MinhaContaConversacao = lazy(() => import('./MinhaContaConversacao'));
const MinhaContaCursoMenu = lazy(() => import('./MinhaContaCursoMenu'));

export const MinhaContaCurso = ({ match, ...breadcrumb }) => {
    // API
    const [stateCurso, setStateCursoUrl] = useCursoApi(`${apiUrlCursos}/meus-cursos/${match.params.slug}`, {});

    const cursoLength = stateCurso.data.data ? Object.keys(stateCurso.data.data).length : 0;

    // Redirecionamento temporário
    if (stateCurso.isError == true) {
        window.location.pathname = '/';
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursoLength > 0;

    // CONTEXT
    const { setStateLoaderGlobal } = useContext(Context);

    // ACTION
    const [stateTabSelected, setStateTabSelected] = useState('resumo');
    const [stateMenuAula, setStateMenuAula] = useState(true);
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const handleTabChange = (e) => {
        setStateTabSelected(e.target.value);
    };

    // DATA
    const curso = cursoLength > 0 && stateCurso.data.data;

    console.log('curso: ', curso);

    return (
        <>
            <Helmet>
                <title>{curso && curso.title}</title>
                <meta name="description" content={curso && curso.description} />
            </Helmet>

            <HeaderAlternate currentBreadcrumbLabel="Titulo do Curso" {...breadcrumb} />

            <MinhaContaCursoContext.Provider value={setStateMenuAula}>
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
                        <>
                            <Container mx="auto" px={{ d: 0, lg: 3 }}>
                                <Flex display="flex" flexWrap="wrap">
                                    <MinhaContaCenterStyled pl={{ d: 3, sm: 5 }} py={{ d: 3, sm: 5 }} width="100%">
                                        {windowWidth < parseInt(variable.md, 10) && <Breadcrumb currentLabel="Titulo do Curso" obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                                        <Flex display="flex" flexWrap="wrap">
                                            <Box pr={{ d: 3, sm: 5 }} width={{ d: 1, md: stateMenuAula ? 7 / 10 : 1 }}>
                                                <Box height="50vh" mb={3}>
                                                    <BgImageLazyLoad url={(windowWidth < parseInt(variable.lg, 10) && curso.imagens.destaque.destaque_1024) || (windowWidth > parseInt(variable.lg, 10) && curso.imagens.destaque.destaque_1920)} />
                                                </Box>

                                                <Box mb={3} textAlign="right">
                                                    <Button borderColor="colorGray" color="colorBlack3" display="inline-block" text="Próxima Aula" themeType="border" width={{ d: '100%', sm: 'auto' }} />
                                                </Box>

                                                {/* MinhaContaCursoMenu Mobile */}
                                                {windowWidth < parseInt(variable.md, 10) && (
                                                    <>
                                                        <MinhaContaExibirAulaStyled display={stateMenuAula ? 'none' : 'block'} p={4}>
                                                            <Button display="block" fontWeight="400" mx="auto" onClick={() => setStateMenuAula(true)} text="Exibir aulas" textDecoration="underline" themeSize="none" themeType="none" />
                                                        </MinhaContaExibirAulaStyled>

                                                        <Box>
                                                            <Suspense fallback={<P>Carregando...</P>}>
                                                                <MinhaContaCursoMenu active={stateMenuAula} objectCurso={curso} />
                                                            </Suspense>
                                                        </Box>
                                                    </>
                                                )}

                                                <Box>
                                                    <TabStyled group="tab-group" total={2}>
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

                                                            <TabNavStyled>
                                                                <label htmlFor="tab-id-conteudo">Conteúdo</label>
                                                            </TabNavStyled>

                                                            {/* <TabNavStyled>
                                                            <label htmlFor="tab-id-duvidas">Dúvidas</label>
                                                        </TabNavStyled> */}
                                                        </TabsNavStyled>

                                                        <TabsContentStyled>
                                                            <TabContentStyled>
                                                                <Title2>Aula 12 - Por onde começar?</Title2>

                                                                <p>
                                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in,
                                                                    theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                                </p>
                                                            </TabContentStyled>

                                                            <TabContentStyled>
                                                                <Title2>Conteúdo</Title2>

                                                                <p>
                                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in,
                                                                    theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                                </p>

                                                                <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>

                                                                <p>
                                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in,
                                                                    theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                                </p>

                                                                <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>
                                                            </TabContentStyled>

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
                                                    <MinhaContaExibirAulaStyled display={stateMenuAula ? 'none' : 'block'} position="absolute" right="50px" top="-35px">
                                                        <Button fontWeight="400" onClick={() => setStateMenuAula(true)} text="Exibir aulas" textDecoration="underline" themeSize="none" themeType="none" />
                                                    </MinhaContaExibirAulaStyled>

                                                    <Box width={{ d: 1, md: stateMenuAula ? 3 / 10 : 0 }}>
                                                        <Suspense fallback={<P>Carregando...</P>}>
                                                            <MinhaContaCursoMenu active={stateMenuAula} objectCurso={curso} />
                                                        </Suspense>
                                                    </Box>
                                                </>
                                            )}
                                        </Flex>
                                    </MinhaContaCenterStyled>
                                </Flex>
                            </Container>
                        </>
                    )}
                </Main>
            </MinhaContaCursoContext.Provider>

            <FooterAlternate />
        </>
    );
};
