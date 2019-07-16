import axios from 'axios';
import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlNoticias } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { useChangeNoticiaSocialScroll } from '../../../store/noticia/noticia';

import { LinkTo } from '../../Link/LinkTo';
import { NoticiaForm } from '../../Form/NoticiaForm';
import { NoticiaBox } from './NoticiaBox';
import { NoticiaArticle, NoticiaArticleAuthor, NoticiaAuthor, NoticiaFormContainer, NoticiaMateriasRelacionadas, NoticiaSocial } from './NoticiaStyled';
import { SocialAlternate } from '../../Social/SocialAlternate';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay7, Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { Span, Title1, Title4, Title5 } from '../../../style/text';

import liberdade from '../../../asset/image/os-melhores-investimentos-em-sua-liberdade.webp';

export const Noticia = ({ match }) => {
    const changeNoticiaSocialScroll = useChangeNoticiaSocialScroll();

    const [noticia] = useNoticiaApi(`${apiUrlNoticias}/${match.params.slug}`, {});

    const noticiaLength = Object.keys(noticia.data).length;

    const [noticias, setNoticias] = useState({});

    // TODO: Trocar para notícias relacionadas
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${apiUrlNoticias}/ultimas_noticias`);

            setNoticias(result.data);
        };

        fetchData();
    }, []);

    const noticiasLength = noticias.length;

    let noticiasRender = '';

    if (noticiasLength) {
        noticiasRender = (
            <NoticiaMateriasRelacionadas mb={5}>
                <Title4 color="colorGray2" mb={4} themeColor="dark">
                    Matérias Relacionadas
                </Title4>

                <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={4}>
                    {noticias.slice(1, 4).map((noticia, i, n) => {
                        return (
                            <Cell borderBottom={n.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" key={noticia.id} pb={3}>
                                <LinkTo ariaLabel={noticia.title} to={`/noticia/${noticia.slug}`}>
                                    <NoticiaBox author={`Por ${noticia.author}`} color={noticia.category.featured_color} tag={noticia.category.title} themeColor="dark" title={noticia.title} width={{ d: 3 / 5, lg: 4 / 5 }} />

                                    <Image height="100px" pl={3} src={noticia.thumbnail.attachment.url} text={`Imagem ${noticia.title}`} width={{ d: 2 / 5, lg: 1 / 5 }} />
                                </LinkTo>
                            </Cell>
                        );
                    })}
                </Grid>
            </NoticiaMateriasRelacionadas>
        );
    }

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
                                <Image height="50vmin" mb={{ d: 4, md: 5 }} src={noticia.data.thumbnail.attachment.url} text="Notícia" width={1} />
                            </Box>
                        </Flex>

                        <NoticiaSocial id="noticia-Social" change={changeNoticiaSocialScroll} display={{ d: 'none', lg: 'block' }}>
                            <p>
                                <b>Compartilhar:</b>
                            </p>

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

                        <NoticiaFormContainer mb="75px">
                            <Flex display="flex" flexWrap="wrap">
                                <Box display={{ d: 'none', sm: 'inline-block' }} width={2 / 4}>
                                    <BgImageOverlay7 url={liberdade} />
                                </Box>

                                <Box width={{ d: 1, sm: 2 / 4 }}>
                                    <NoticiaForm color="colorGrayDark" colorLine="colorGray" colorPlaceholder="colorGray" themeColor="dark" id="noticia-contato" />
                                </Box>
                            </Flex>
                        </NoticiaFormContainer>

                        <NoticiaAuthor mb="75px">
                            <Flex display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'flex-start' }}>
                                <Box display="inline-block">
                                    <div className="image-container">
                                        <Image src={liberdade} text="autor" />
                                    </div>
                                </Box>

                                <Box display="inline-block" pl={{ d: 0, sm: 4 }} width={{ d: 1, sm: 3 / 4 }}>
                                    <p className="escrito-por">Escrito por</p>
                                    <Title4 color="colorPrimary" mb={2} themeColor="dark">
                                        Alexandre Stormer
                                    </Title4>
                                    <p>Sócio-fundador do Grupo L&S, com 15 anos de experiência no mercado financeiro do Brasil, Leandro atua com trader profissional há pelo menos 5 anos no mercado de bolsas do Estados Unidos da América.</p>
                                </Box>
                            </Flex>
                        </NoticiaAuthor>

                        {noticiasRender}
                    </Container>
                </Main>
            </>
        )
    );
};
