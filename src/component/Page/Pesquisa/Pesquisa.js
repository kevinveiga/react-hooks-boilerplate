import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { usePesquisaApi } from '../../../service/pesquisa';
import { useSeoApi } from '../../../service/seo';

import { Context } from '../../../store/context';
import { PesquisaContext } from '../../../store/pesquisa/pesquisaContext';
import { useMeasure } from '../../../store/util/measure';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { PesquisaForm } from '../../Form/PesquisaForm';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { DateTime, Title } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Main } from '../../../style/layout';
import { P, Title3, Title4 } from '../../../style/text';

export const Pesquisa = ({ match }) => {
    // API
    const [statePesquisa, setStatePesquisaData] = usePesquisaApi({ params: { query: match.params.slug }, url: `${apiUrlNoticias}/busca` }, {});
    const stateSeo = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const pesquisaLength = statePesquisa.data && statePesquisa.data.length;

    // ACTION
    const [stateBannerRef, stateBannerMeasure] = useMeasure(true);

    // CONTEXT
    const { setStateLoaderGlobal } = useContext(Context);

    if (statePesquisa.isLoading) {
        setStateLoaderGlobal(true);
    } else {
        setStateLoaderGlobal(false);
    }

    return (
        <PesquisaContext.Provider value={setStatePesquisaData}>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <Main>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Box mb={5} width={{ d: 1, md: 4 / 5 }}>
                        <PesquisaForm obj={{ colorLine: 'colorGray4', colorPlaceholder: 'colorGray2', themeForm: 'pesquisa' }} />
                    </Box>

                    <Title3 fontWeight="600" themeColor="dark">
                        Resultado da Pesquisa
                    </Title3>

                    <Box>
                        <Flex display="flex" flexWrap="wrap" id="pesquisa">
                            <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.6)' }} mb={5} pl={{ d: 0, md: 2 }} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 4 / 5 }}>
                                <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={3}>
                                    {pesquisaLength < 1 && (
                                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                                            <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                                                {/* TODO: colocar layout */}
                                                Sem resultado na pesquisa
                                            </Title4>
                                        </Container>
                                    )}
                                    {pesquisaLength > 0 &&
                                        statePesquisa.data.map((pesquisa) => {
                                            return (
                                                <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={pesquisa.id} py={3}>
                                                    <LinkTo ariaLabel={pesquisa.title} height="100%" to={`/noticia/${pesquisa.slug}`} width="100%">
                                                        <NoticiaBox alignContent="space-between" color={pesquisa.featured_color} display="inline-flex" flexWrap="wrap" minHeight={{ d: '100px', xs: '150px', md: '200px' }} pr={{ d: 1, sm: 4 }} themeColor="dark" verticalAlign="middle" width={3 / 5}>
                                                            <Box width="100%">
                                                                <Title>{pesquisa.title}</Title>

                                                                <P display={{ d: 'none', sm: 'block' }}>{pesquisa.excerpt}</P>
                                                            </Box>

                                                            <p>
                                                                <span>Postado em </span>

                                                                <DateTime color={pesquisa.featured_color} fontSize={16} themeColor="dark">
                                                                    {pesquisa.date}
                                                                </DateTime>
                                                            </p>
                                                        </NoticiaBox>

                                                        <Box display="inline-block" height={{ d: '100px', xs: '150px', md: '200px' }} overflow="hidden" verticalAlign="middle" width={2 / 5}>
                                                            <BgImageLazyLoad key={pesquisa.id} url={pesquisa.thumbnail && pesquisa.thumbnail.attachment.url} />
                                                        </Box>
                                                    </LinkTo>
                                                </Cell>
                                            );
                                        })}
                                </Grid>
                            </Box>
                        </Flex>
                    </Box>
                </Container>
            </Main>
        </PesquisaContext.Provider>
    );
};
