import React, { useEffect } from 'react';

import parse from 'html-react-parser';

import { apiUrlEntrevistas, apiUrlEntrevistasBusca, apiUrlEntrevistaTags } from '../../../config';

import { useEntrevistasApi, useEntrevistaPesquisaApi } from '../../../service/entrevista';
// import { usePesquisaTagsApi, useTagsApi } from '../../../service/tag';

import { PesquisaContext } from '../../../store/pesquisa/pesquisaContext';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { PesquisaForm } from '../../Form/PesquisaForm';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { StatusStreamingBadgeStyled } from '../../Badge/BadgeStyled';
import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Box, Flex } from '../../../style/flex';
import { ListBox, ListTitle, ListTime } from '../../../style/list';
import { Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

const MinhaContaEntrevistas = () => {
    // VARIABLE
    let noData = true;

    // API
    const [stateEntrevistas, setStateEntrevistaData] = useEntrevistasApi({ params: { page: 1 }, url: apiUrlEntrevistas });
    const [stateEntrevistaPesquisa, setStateEntrevistaPesquisaData] = useEntrevistaPesquisaApi(null);
    // const [stateTags] = useTagsApi({ url: apiUrlEntrevistaTags });
    // const [statePesquisaTags, setStatePesquisaTagsData] = usePesquisaTagsApi(null);

    const entrevistasLength = stateEntrevistas.data && stateEntrevistas.data.data ? stateEntrevistas.data.data.length : 0;
    // const entrevistasPesquisaTagsLength = statePesquisaTags ? Object.keys(statePesquisaTags.data).length : 0;
    const entrevistasPaginationLength = entrevistasLength > 0 ? Object.keys(stateEntrevistas.data.meta).length : 0;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = entrevistasLength > 0;

    // ACTION
    const windowWidth = useWindowWidth();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // DATA
    const entrevistas =
        (stateEntrevistaPesquisa && stateEntrevistaPesquisa.data) ||
        // (entrevistasPesquisaTagsLength && statePesquisaTags.data) ||
        (entrevistasLength > 0 && stateEntrevistas.data.data);
    const entrevistasPagination = entrevistasPaginationLength > 0 && stateEntrevistas.data.meta && stateEntrevistas.data.meta.pagination;

    return (
        <>
            <PesquisaContext.Provider
                value={{
                    // stateTagsContext: stateTags,
                    // setStatePesquisaTagsDataContext: setStatePesquisaTagsData,
                    setStatePesquisaDataContext: setStateEntrevistaPesquisaData
                }}
            >
                <MinhaContaCenterStyled p={{ d: 3, sm: 5 }}>
                    {windowWidth < parseInt(variable.lg, 10) && <Breadcrumb currentLabel="Entrevistas" obj={{ hoverColor: 'colorWhite' }} />}

                    <PesquisaForm
                        apiUrl={apiUrlEntrevistasBusca}
                        apiUrlTag={apiUrlEntrevistaTags}
                        obj={{ colorLine: 'colorGray4', colorPlaceholder: 'colorGray2', themeForm: 'pesquisa' }}
                        // tags={stateTags.data}
                    />

                    <Flex display="flex" flexWrap="wrap">
                        {entrevistas &&
                            entrevistas.map((entrevista) => {
                                noData = false;

                                return (
                                    <Box key={entrevista.id} mb={5} width={{ d: 1, md: 1 / 2 }}>
                                        <LinkTo
                                            ariaLabel={entrevista.title}
                                            height="100%"
                                            to={`/minha-conta/entrevista/${entrevista.id}`}
                                            width="100%"
                                        >
                                            <ListBox display="flex" flexWrap="wrap" height="100%" mx={{ d: 0, md: 2 }} themeColor="dark">
                                                <Box overflow="hidden" pt="calc((9 / 16) * 100%)" width="100%">
                                                    <BgImageLazyLoad key={entrevista.id} url={entrevista.thumbnail.curso_usuario} />
                                                </Box>

                                                <Box width="100%" px={4} py={3}>
                                                    <Box width="100%">
                                                        <ListTitle mb={3}>{entrevista.title}</ListTitle>

                                                        <div>{parse(`${entrevista.description}`)}</div>
                                                    </Box>

                                                    {entrevista.time && (
                                                        <Box width="100%">
                                                            <Svg fill="colorSecondary" height="13px" name="svg-time" />

                                                            <ListTime ml={1} mr={3}>
                                                                {entrevista.time}
                                                            </ListTime>
                                                        </Box>
                                                    )}

                                                    {entrevista.status_streaming && entrevista.status_streaming !== 'Não' && (
                                                        <Box py="10px" width="100%">
                                                            <StatusStreamingBadgeStyled type={entrevista.status_streaming}>
                                                                {entrevista.status_streaming}
                                                            </StatusStreamingBadgeStyled>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </ListBox>
                                        </LinkTo>
                                    </Box>
                                );
                            })}

                        {noData && (stateEntrevistas.isLoading || stateEntrevistaPesquisa.isLoading) && (
                            <Title4 color="colorPrimary" my={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                Carregando...
                            </Title4>
                        )}

                        {noData && entrevistas && (!stateEntrevistas.isLoading || !stateEntrevistaPesquisa.isLoading) && (
                            <Title4 color="colorPrimary" my={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                Nenhuma entrevista encontrada
                            </Title4>
                        )}
                    </Flex>

                    {entrevistasPagination && entrevistasPagination.current_page < entrevistasPagination.total_pages && (
                        <Box display="flex" justifyContent="center" py={3}>
                            <Button
                                text="Ver mais"
                                themeType="border"
                                onClick={() =>
                                    setStateEntrevistaData({
                                        params: { page: parseInt(entrevistasPagination.current_page, 10) + 1 },
                                        url: `${apiUrlEntrevistas}`
                                    })
                                }
                            />
                        </Box>
                    )}
                </MinhaContaCenterStyled>
            </PesquisaContext.Provider>
        </>
    );
};

export default MinhaContaEntrevistas;
