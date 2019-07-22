import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { useChangeNoticiaSocialScroll } from '../../../store/noticia/noticia';

import { NoticiaArticle, NoticiaArticleAuthor, NoticiaAuthor, NoticiaSocial } from './NoticiaStyled';
import { SocialAlternate } from '../../Social/SocialAlternate';

import { Box, Flex } from '../../../style/flex';
import { Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Span, Title1, Title4, Title5 } from '../../../style/text';

export const Noticia = ({ match }) => {
    const changeNoticiaSocialScroll = useChangeNoticiaSocialScroll();

    const [noticia] = useNoticiaApi(`${apiUrlNoticias}/${match.params.slug}`, {});

    const noticiaLength = Object.keys(noticia.data).length;

    return (
        noticiaLength && (
            <>
                <Helmet>
                    <title>{noticia.data.title}</title>
                    <meta name="description" content={noticia.data.seo.description} />
                </Helmet>

                <Main>
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        <Title1 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark" width={{ d: 1, md: 2 / 3 }}>
                            {noticia.data.title}
                        </Title1>

                        <Flex display="flex" flexWrap="wrap">
                            <Box width={1}>
                                <Image height="50vmin" mb={{ d: 4, md: 5 }} src={noticia.data.thumbnail && noticia.data.thumbnail.attachment.url} text="Notícia" width={1} />
                            </Box>
                        </Flex>

                        <NoticiaSocial id="noticia-Social" change={changeNoticiaSocialScroll} display={{ d: 'none', lg: 'block' }}>
                            <div>
                                <b>Compartilhar:</b>
                            </div>

                            <SocialAlternate direction="vertical" themeColor="dark" />
                        </NoticiaSocial>

                        <NoticiaArticleAuthor mb={3}>
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
                                <Box display="inline-block" pl={{ d: 0, sm: 4 }} width={{ d: 1, sm: 3 / 4 }}>
                                    <p className="escrito-por">Escrito por</p>
                                    <Title4 color="colorPrimary" mb={2} themeColor="dark">
                                        Autor
                                    </Title4>
                                    <p>Sócio-fundador do Grupo L&S, com 15 anos de experiência no mercado financeiro do Brasil, Leandro atua com trader profissional há pelo menos 5 anos no mercado de bolsas do Estados Unidos da América.</p>
                                </Box>
                            </Flex>
                        </NoticiaAuthor>
                    </Container>
                </Main>
            </>
        )
    );
};
