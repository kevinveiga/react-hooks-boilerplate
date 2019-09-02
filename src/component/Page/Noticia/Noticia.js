import parse from 'html-react-parser';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { scrollTo } from '../../../util/scrollTo';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
// import { Leadwall } from '../../Leadwall/Leadwall';
// import { LinkTo } from '../../Link/LinkTo';
// import { NoticiaForm } from '../../Form/NoticiaForm';
// import { NoticiaBox } from './NoticiaBox';
import { NoticiaSocial } from './NoticiaSocial';

// import { Author, Tag, Title } from './NoticiaBoxStyled';
import { NoticiaArticle, NoticiaArticleAuthor, NoticiaAuthor, NoticiaFormContainer, NoticiaMateriasRelacionadas } from './NoticiaStyled';

import { Box, Flex } from '../../../style/flex';
// import { Cell, Grid } from '../../../style/grid';
import { Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { P, Span, Title1, Title4, Title5 } from '../../../style/text';

export const Noticia = ({ match }) => {
    // API
    const [noticia, setStateNoticiaUrl] = useNoticiaApi(`${apiUrlNoticias}/${match.params.slug}`, {});

    const noticiaLength = noticia.data ? Object.keys(noticia.data).length : 0;
    // const noticiaRelatedLength = noticiaLength > 0 && noticia.data.related.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = noticiaLength > 0;

    // ACTION
    // const [changeLeadwall, setChangeLeadwall] = useState(JSON.parse(window.localStorage.getItem('leadwall')));

    // Scroll para o topo
    scrollTo(null, isDataLoaded, isMobile ? 0 : 80);

    return (
        <>
            <Helmet>
                <title>{noticia.data && noticia.data.title}</title>
                <meta name="description" content={noticia.data && noticia.data.seo && noticia.data.seo.description} />
                <meta property="og:author" content={noticia.data && noticia.data.author} />
                <meta property="og:description" content={noticia.data && noticia.data.seo && noticia.data.seo.description} />
                <meta property="og:image" content={noticia.data && noticia.data.thumbnail && noticia.data.thumbnail.attachment.url} />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:title" content={noticia.data && noticia.data.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
            </Helmet>

            <Main>
                {noticia.isError == true && (
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title4 color="colorPrimary" mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            Notícia não encontrada
                        </Title4>
                    </Container>
                )}

                {noticiaLength > 0 && (
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title1 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            {noticia.data.title}
                        </Title1>

                        <Flex display="flex" flexWrap="wrap">
                            <Image height={{ d: '300px', md: '400px' }} mb={{ d: 4, md: 5 }} url={noticia.data.thumbnail && noticia.data.thumbnail.attachment.url} text="Notícia" width="100%" />
                        </Flex>

                        <NoticiaSocial display={{ d: 'none', lg: 'block' }} elementChange={{ elementId: 'noticia-article-author', offset: -50 }} elementFadeOut={{ elementId: 'footer', offset: -500 }} title={noticia.data.title} url={window.location.href} />

                        <NoticiaArticleAuthor id="noticia-article-author" mb={3}>
                            <Flex display="flex" flexWrap="wrap">
                                <Box width={{ d: 1, sm: 1 / 2 }}>
                                    <Title5 color="colorPrimary" fontWeight="600" themeColor="dark">
                                        {noticia.data.author}
                                    </Title5>
                                </Box>

                                <Box textAlign={{ d: 'left', sm: 'right' }} width={{ d: 1, sm: 1 / 2 }}>
                                    <Span>{noticia.data.date}</Span>
                                </Box>
                            </Flex>
                        </NoticiaArticleAuthor>

                        <NoticiaArticle>{parse(`${noticia.data.content}`)}</NoticiaArticle>

                        {/* <Leadwall change={changeLeadwall} />

                        <NoticiaFormContainer mb="75px">
                            <NoticiaForm color="colorGrayDark" colorLine="colorGray" colorPlaceholder="colorGray" id="noticia-contato" themeColor="dark" />
                        </NoticiaFormContainer> */}

                        <NoticiaAuthor mb="75px">
                            <Flex display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'flex-start' }}>
                                <Box display="inline-block">
                                    <div className="image-container">
                                        <Image objectFit="none" url={noticia.data.author_avatar} text="autor" />
                                    </div>
                                </Box>

                                <Box alignSelf="center" display="inline-block" pl={{ d: 0, sm: 4 }} width={{ d: 1, sm: 3 / 4 }}>
                                    <p className="escrito-por">Escrito por</p>

                                    <Title4 color="colorPrimary" mb={2} themeColor="dark">
                                        Alexandre Stormer
                                    </Title4>

                                    <p>{noticia.data.author_description}</p>
                                </Box>
                            </Flex>
                        </NoticiaAuthor>

                        {/* <NoticiaMateriasRelacionadas mb={5}>
                            <Title4 color="colorGray2" mb={4} themeColor="dark">
                                Matérias Relacionadas
                            </Title4>

                            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={4}>
                                {noticiaRelatedLength &&
                                    noticia.data.related.map((noticia, i, newArray) => {
                                        return (
                                            <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                                <LinkTo ariaLabel={noticia.title} height="100%" onClick={() => setStateNoticiaUrl(`${apiUrlNoticias}/${noticia.slug}`)} to={`/noticia/${noticia.slug}`} width="100%">
                                                    <NoticiaBox color={noticia.category.featured_color} display="inline-block" pr={{ d: 1, sm: 4 }} themeColor="dark" verticalAlign="middle" width={{ d: 3 / 5, lg: 4 / 5 }}>
                                                        <Box>
                                                            <Tag>{noticia.category.title}</Tag>

                                                            <Title>{noticia.title}</Title>
                                                        </Box>

                                                        <Author>{`Por ${noticia.author}`}</Author>
                                                    </NoticiaBox>

                                                    <Box display="inline-block" height="100px" overflow="hidden" verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                                        <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                                    </Box>
                                                </LinkTo>
                                            </Cell>
                                        );
                                    })}
                            </Grid>
                        </NoticiaMateriasRelacionadas> */}
                    </Container>
                )}
            </Main>
        </>
    );
};
