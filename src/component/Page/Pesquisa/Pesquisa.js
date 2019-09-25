import React from 'react';
import { isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';
import { useSeoApi } from '../../../service/seo';

import { scrollTo } from '../../../util/scrollTo';

import { Button } from '../../Button/Button';
import { Input } from '../../Form/Form';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { DateTime, Tag, Title } from '../Noticia/NoticiaBoxStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Main } from '../../../style/layout';
import { Title3 } from '../../../style/text';

export const Pesquisa = () => {
    // API
    const [stateNoticias, setStateNoticias] = useNoticiaApi(apiUrlNoticias, {});
    const stateSeo = useSeoApi(`${apiUrlNoticias}/seo`, {});

    const noticiasLength = stateNoticias.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = noticiasLength > 0;

    // Scroll para o topo
    if (!stateNoticias.data) {
        scrollTo(null, isDataLoaded, isMobile ? 0 : 80);
    }

    // ACTION
    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <Main>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Box mb={5} width={{ d: 1, md: 4 / 5 }}>
                        <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" gridColumnGap={4} gridTemplateColumns={{ d: '1fr', xs: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                            <Cell mb={3}>
                                <Input
                                    maxLength="50"
                                    name="pesquisa"
                                    placeholder="Procure aqui a notícia pelo título"
                                    onKeyDown={(e) => {
                                        keyPress(e);
                                    }}
                                />
                            </Cell>

                            <Cell mb={3}>
                                <Button mx={{ d: 'auto', xs: 0 }} text="Pesquisar" themeSize="small" typeButton="submit" />
                            </Cell>
                        </Grid>
                    </Box>

                    <Title3 fontWeight="600" themeColor="dark">
                        Resultado da Pesquisa
                    </Title3>

                    <Box>
                        <Flex display="flex" flexWrap="wrap" id="pesquisa">
                            <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.6)' }} mb={5} pl={{ d: 0, md: 2 }} pr={{ d: 0, md: 3 }} width={{ d: 1, md: 4 / 5 }}>
                                <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={3}>
                                    {noticiasLength > 0 &&
                                        stateNoticias.data.map((noticia) => {
                                            return (
                                                <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={noticia.id} py={3}>
                                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                                        <NoticiaBox alignContent="space-between" color={noticia.featured_color} display="inline-flex" flexWrap="wrap" minHeight={{ d: '100px', xs: '150px', md: '200px' }} pr={{ d: 1, sm: 4 }} themeColor="dark" verticalAlign="middle" width={3 / 5}>
                                                            <Box width="100%">
                                                                <Tag>{noticia.title}</Tag>

                                                                <Title>{noticia.title}</Title>

                                                                <p>{noticia.excerpt}</p>
                                                            </Box>

                                                            <p>
                                                                <span>Postado em </span>

                                                                <DateTime color={noticia.featured_color} fontSize={16} themeColor="dark">
                                                                    {noticia.date}
                                                                </DateTime>
                                                            </p>
                                                        </NoticiaBox>

                                                        <Box display="inline-block" height={{ d: '100px', xs: '150px', md: '200px' }} overflow="hidden" verticalAlign="middle" width={2 / 5}>
                                                            <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail && noticia.thumbnail.attachment.url} />
                                                        </Box>
                                                    </LinkTo>
                                                </Cell>
                                            );
                                        })}

                                    {stateNoticias.data && stateNoticias.data.current_page < stateNoticias.data.last_page && (
                                        <Cell display="flex" justifyContent="center" py={3}>
                                            <Button text="Ver mais" themeType="border" onClick={() => setStateNoticias({ page: parseInt(stateNoticias.data.current_page, 10) + 1, url: `${apiUrlNoticias}/categoria/${stateNoticias.data.slug}` })} />
                                        </Cell>
                                    )}
                                </Grid>
                            </Box>
                        </Flex>
                    </Box>
                </Container>
            </Main>
        </>
    );
};
