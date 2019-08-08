import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { useChangeNoticiaSocialScroll, useFadeOutNoticiaSocialScroll } from '../../../store/noticia/noticia';

import { NoticiaArticle, NoticiaArticleAuthor, NoticiaAuthor, NoticiaSocial } from './NoticiaStyled';
import { Share } from '../../Social/Share';

import { Box, Flex } from '../../../style/flex';
import { Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Span, Title1, Title4, Title5 } from '../../../style/text';

export const Noticia = ({ match }) => {
    // API
    const [noticia] = useNoticiaApi(`${apiUrlNoticias}/${match.params.slug}`, {});

    const noticiaLength = Object.keys(noticia.data).length;

    // ACTION
    const stateChangeNoticiaSocialScroll = useChangeNoticiaSocialScroll('noticia-article-author', -50);
    const stateFadeOutNoticiaSocialScroll = useFadeOutNoticiaSocialScroll('footer', -500);

    return (
        noticiaLength && (
            <>
                <Helmet>
                    <title>{noticia.data.title}</title>
                    <meta name="description" content={noticia.data.seo.description} />
                    <meta property="og:author" content={noticia.data.author} />
                    <meta property="og:description" content={noticia.data.seo.description} />
                    <meta property="og:image" content={noticia.data.thumbnail && noticia.data.thumbnail.attachment.url} />
                    <meta property="og:title" content={noticia.data.title} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={window.location.href} />
                </Helmet>

                <Main>
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title1 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            {noticia.data.title}
                        </Title1>

                        <Flex display="flex" flexWrap="wrap">
                            <Image height={{ d: '300px', md: '400px' }} mb={{ d: 4, md: 5 }} url={noticia.data.thumbnail && noticia.data.thumbnail.attachment.url} text="Notícia" width="100%" />
                        </Flex>

                        <NoticiaSocial change={stateChangeNoticiaSocialScroll} display={{ d: 'none', lg: 'block' }} fadeOut={stateFadeOutNoticiaSocialScroll} id="noticia-Social">
                            <div>
                                <b>Compartilhar:</b>
                            </div>

                            <Share direction="vertical" title={noticia.data.title} themeColor="dark" url={window.location.href} />
                        </NoticiaSocial>

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
                    </Container>
                </Main>
            </>
        )
    );
};
