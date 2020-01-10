import React, { useEffect, useState } from 'react';

import parse from 'html-react-parser';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { NoticiaContext } from '../../../store/noticia/noticiaContext';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { Leadwall } from '../../Leadwall/Leadwall';
import { LinkTo } from '../../Link/LinkTo';
// import { LoaderComponent } from '../../Loader/LoaderComponent';
import { NoticiaBox } from './NoticiaBox';
import { NoticiaSocial } from './NoticiaSocial';
import { Seo } from '../../Seo/Seo';

import { NoticiaBoxAuthorStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from './NoticiaBoxStyled';
import { NoticiaArticleStyled, NoticiaArticleAuthorStyled, NoticiaAuthorStyled, NoticiaMateriasRelacionadasStyled } from './NoticiaStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Image, ImageCircleContainer } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { P, Span, Title1, Title4, Title5 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const NoticiaForm = lazy(() => import('../../Form/NoticiaForm'));

export const Noticia = ({ match }) => {
    // API
    const [stateNoticia, setStateNoticiaUrl] = useNoticiaApi(`${apiUrlNoticias}/${match.params.slug}`, {});

    const noticiaLength = stateNoticia.data ? Object.keys(stateNoticia.data).length : 0;
    const noticiaRelatedLength = noticiaLength > 0 && stateNoticia.data.related.length;

    // Redirecionamento temporário
    if (stateNoticia.isError == true) {
        window.location.pathname = '/';
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = noticiaLength > 0 && noticiaRelatedLength > 0;

    // ACTION
    const [changeLeadwall, setChangeLeadwallContext] = useState(JSON.parse(window.localStorage.getItem('leadwall')));
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded, match]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <NoticiaContext.Provider value={setChangeLeadwallContext}>
            <Seo>
                <title>{stateNoticia.data && stateNoticia.data.title}</title>
                <meta name="description" content={stateNoticia.data && stateNoticia.data.seo && stateNoticia.data.seo.description} />
                <meta property="og:author" content={stateNoticia.data && stateNoticia.data.author} />
                <meta property="og:description" content={stateNoticia.data && stateNoticia.data.seo && stateNoticia.data.seo.description} />
                <meta property="og:image" content={stateNoticia.data && stateNoticia.data.thumbnail && stateNoticia.data.thumbnail.attachment.url} />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:title" content={stateNoticia.data && stateNoticia.data.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
            </Seo>

            <Main>
                {stateNoticia.isError == true && (
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            {/* TODO: colocar layout */}
                            Notícia não encontrada
                        </Title4>
                    </Container>
                )}

                {noticiaLength > 0 && (
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title1 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            {stateNoticia.data.title}
                        </Title1>

                        <Flex display="flex" flexWrap="wrap">
                            <Image
                                height={{ d: '300px', md: '400px' }}
                                mb={{ d: 4, md: 5 }}
                                text="Notícia"
                                url={stateNoticia.data.thumbnail && stateNoticia.data.thumbnail.attachment.url}
                                width="100%"
                            />
                        </Flex>

                        <NoticiaSocial
                            display={{ d: 'none', lg: 'block' }}
                            elementChange={{ elementId: 'noticia-article-author', offset: -50 }}
                            elementFadeOut={{ elementId: 'footer', offset: -500 }}
                            title={stateNoticia.data.title}
                            url={window.location.href}
                        />

                        <NoticiaArticleAuthorStyled id="noticia-article-author" mb={3}>
                            <Flex display="flex" flexWrap="wrap">
                                <Box width={{ d: 1, sm: 1 / 2 }}>
                                    <Title5 color="colorPrimary" fontWeight="700" themeColor="dark">
                                        {stateNoticia.data.author}
                                    </Title5>
                                </Box>

                                <Box textAlign={{ d: 'left', sm: 'right' }} width={{ d: 1, sm: 1 / 2 }}>
                                    <Span fontWeight="700">{stateNoticia.data.date}</Span>
                                </Box>
                            </Flex>
                        </NoticiaArticleAuthorStyled>

                        <NoticiaArticleStyled change={changeLeadwall}>{parse(`${stateNoticia.data.content}`)}</NoticiaArticleStyled>

                        <Leadwall change={changeLeadwall} />

                        {/* <NoticiaFormContainerStyled mb="75px">
                            <Suspense fallback={<LoaderComponent />}>
                                <NoticiaForm />
                            </Suspense>
                        </NoticiaFormContainerStyled> */}

                        <NoticiaAuthorStyled mb="75px">
                            <Flex display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'flex-start' }}>
                                <Box display="inline-block">
                                    <ImageCircleContainer>
                                        <Image objectFit="none" text="autor" url={stateNoticia.data.author_avatar || null} />
                                    </ImageCircleContainer>
                                </Box>

                                <Box alignSelf="center" display="inline-block" pl={{ d: 0, sm: 4 }} width={{ d: 1, sm: 3 / 4 }}>
                                    <P color="colorGray" fontSize={14} mb={2}>
                                        Escrito por
                                    </P>

                                    <Title4 color="colorPrimary" mb={2} themeColor="dark">
                                        {stateNoticia.data.author}
                                    </Title4>

                                    <p>{stateNoticia.data.author_description}</p>
                                </Box>
                            </Flex>
                        </NoticiaAuthorStyled>

                        <NoticiaMateriasRelacionadasStyled mb={5}>
                            <Title4 color="colorGray2" mb={4} themeColor="dark">
                                Matérias Relacionadas
                            </Title4>

                            <Grid display="grid" gridRowGap={4}>
                                {noticiaRelatedLength &&
                                    stateNoticia.data.related.map((noticia, i, newArray) => {
                                        return (
                                            <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                <LinkTo
                                                    ariaLabel={noticia.title}
                                                    height="100%"
                                                    onClick={() => setStateNoticiaUrl(`${apiUrlNoticias}/${noticia.slug}`)}
                                                    to={`/noticia/${noticia.slug}`}
                                                    width="100%"
                                                >
                                                    <NoticiaBox
                                                        color={noticia.category.featured_color}
                                                        display="inline-block"
                                                        pr={{ d: 1, sm: 4 }}
                                                        themeColor="dark"
                                                        verticalAlign="middle"
                                                        width={{ d: 3 / 5, lg: 4 / 5 }}
                                                    >
                                                        <Box>
                                                            <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                                            <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                                        </Box>

                                                        <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
                                                    </NoticiaBox>

                                                    <Box display="inline-block" height="100px" overflow="hidden" verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                                        <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                                    </Box>
                                                </LinkTo>
                                            </Cell>
                                        );
                                    })}
                            </Grid>
                        </NoticiaMateriasRelacionadasStyled>
                    </Container>
                )}
            </Main>
        </NoticiaContext.Provider>
    );
};
