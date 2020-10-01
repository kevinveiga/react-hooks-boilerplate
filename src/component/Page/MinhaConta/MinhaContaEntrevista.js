import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import parse from 'html-react-parser';

import { apiUrlEntrevistas } from '../../../config';

import { useEntrevistaApi } from '../../../service/entrevista';

import { useBreadcrumb } from '../../../store/breadcrumb/breadcrumb';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { LoaderComponent } from '../../Loader/LoaderComponent';
import { Seo } from '../../Seo/Seo';

import { MinhaContaCenterStyled } from './MinhaContaStyled';
import { TabContentStyled, TabsContentStyled, TabNavStyled, TabsNavStyled, TabStyled } from './MinhaContaTabStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Title2, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const MinhaContaConversacao = lazy(() => import('./MinhaContaConversacao'));
const MinhaContaVideo = lazy(() => import('./MinhaContaVideo'));
const YoutubeChat = lazy(() => import('../../Youtube/YoutubeChat'));

const MinhaContaEntrevista = ({ breadcrumb, match }) => {
    // API
    const [stateEntrevista] = useEntrevistaApi(`${apiUrlEntrevistas}/${match.params.slug}`);

    const entrevistaLength = stateEntrevista.data ? Object.keys(stateEntrevista.data).length : 0;

    // Redirecionamento temporário
    if (stateEntrevista.isError == true) {
        window.location.assign('/minha-conta/entrevistas');
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = entrevistaLength > 0;

    // ACTION
    const { setStateBreadcrumbContext } = useBreadcrumb();
    const [stateTabSelected, setStateTabSelected] = useState('resumo');
    const windowWidth = useWindowWidth();

    // Mudando texto no Breadcrumb e fazendo scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (isDataLoaded) {
            setStateBreadcrumbContext({ breadcrumb: breadcrumb, currentLabel: entrevista.title });
        }

        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // FUNCTION
    const handleTabChange = useCallback(
        () => (element) => {
            setStateTabSelected(element.target.value);
        },
        []
    );

    // DATA
    const entrevista = isDataLoaded && stateEntrevista.data;
    const statusStreaming = entrevista.status_streaming && entrevista.status_streaming !== 'Não';

    return (
        <>
            <Seo>
                <title>{entrevista && entrevista.title}</title>
                <meta name="description" content={entrevista && entrevista.description} />
            </Seo>

            {stateEntrevista.isError == true && (
                <Title4 color="colorPrimary" my={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                    {/* TODO: colocar layout */}
                    Entrevista não encontrada
                </Title4>
            )}

            {entrevista && (
                <MinhaContaCenterStyled px={{ d: 3, sm: 5 }} py={{ d: 4, sm: 5, lg: '75px' }}>
                    {windowWidth < parseInt(variable.lg, 10) && (
                        <Breadcrumb
                            breadcrumb={breadcrumb}
                            currentLabel={entrevista.title}
                            pb={4}
                            obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                        />
                    )}

                    <Flex display="flex" flexWrap="wrap">
                        <Box mb={3} overflowY="hidden" width="100%">
                            <Grid
                                display="grid"
                                gridTemplateColumns={{ d: '1fr', lg: statusStreaming ? '2fr 1fr' : '1fr' }}
                                gridTemplateRows={{ d: statusStreaming ? '1fr 400px' : '1fr', lg: '1fr' }}
                                mb={3}
                                mt={3}
                            >
                                <Cell>
                                    <ErrorBoundary>
                                        <Suspense fallback={<LoaderComponent />}>
                                            <MinhaContaVideo conteudo={entrevista} />
                                        </Suspense>
                                    </ErrorBoundary>
                                </Cell>

                                {statusStreaming && (
                                    <Cell>
                                        <YoutubeChat conteudo={entrevista} />
                                    </Cell>
                                )}
                            </Grid>
                        </Box>

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
                                    checked={stateTabSelected === 'comentarios'}
                                    id="tab-id-comentarios"
                                    name="tab-group"
                                    onChange={handleTabChange()}
                                    type="radio"
                                    value="comentarios"
                                />

                                <TabsNavStyled>
                                    <TabNavStyled>
                                        <label htmlFor="tab-id-resumo">Resumo</label>
                                    </TabNavStyled>

                                    {/* <TabNavStyled>
                                        <label htmlFor="tab-id-comentarios">Comentários</label>
                                    </TabNavStyled> */}
                                </TabsNavStyled>

                                <TabsContentStyled>
                                    <TabContentStyled>
                                        <Title2>{entrevista.title}</Title2>

                                        <div>{parse(`${entrevista.description}`)}</div>
                                    </TabContentStyled>

                                    {/* <TabContentStyled>
                                        <Title2>Comentários</Title2>

                                        <Suspense fallback={<LoaderComponent />}>
                                            <MinhaContaConversacao obj={null} />
                                        </Suspense>
                                    </TabContentStyled> */}
                                </TabsContentStyled>
                            </TabStyled>
                        </Box>
                    </Flex>
                </MinhaContaCenterStyled>
            )}
        </>
    );
};

export default MinhaContaEntrevista;
