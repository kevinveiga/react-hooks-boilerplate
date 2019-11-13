import axios from 'axios';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import Slider from 'react-slick';

import { apiUrlCursos } from '../../../config';

import { useCursoApi } from '../../../service/curso';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { Button } from '../../Button/Button';
import { DotBtn, DotContainer, NextBtn, PrevBtn } from '../../Carousel/CarouselButton';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
// import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

// import { CarouselStyled } from '../../Carousel/CarouselStyled';
import { ConteudoCellStyled, ConteudoCellSvgStyled, CursoTopInfoStyled, TooltipStyled } from './CursoStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Main, Wrap } from '../../../style/layout';
import { P, Span, Title2, Title4, Title5 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Curso = ({ match }) => {
    // API
    const [stateCurso, setStateCursoUrl] = useCursoApi(`${apiUrlCursos}/${match.params.slug}`, {});

    const cursoLength = stateCurso.data.data ? stateCurso.data.data.data.length : 0;
    // const cursoRelatedLength = cursoLength > 0 && stateCurso.data.related.length;

    // Redirecionamento temporário
    if (stateCurso.isError == true) {
        window.location.pathname = '/';
    }

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursoLength > 0;

    // ACTION
    const [statePart, setStatePart] = useState(null);
    const windowWidth = useWindowWidth();

    // Scroll para o topo
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // CAROUSEL
    const carouselOptions = {
        appendDots: (dots) => <DotContainer WrapColor="colorBlackTransparent1">{dots}</DotContainer>,
        arrows: !(windowWidth < parseInt(variable.md, 10)),
        autoplay: false,
        autoplaySpeed: 4250,
        customPaging: () => <DotBtn />,
        dots: true,
        infinite: true,
        nextArrow: <NextBtn bottom="70px" />,
        pauseOnHover: true,
        prevArrow: <PrevBtn bottom="70px" />,
        speed: 1250,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true
    };

    // DATA
    const curso = cursoLength > 0 && stateCurso.data.data && stateCurso.data.data.data[0];

    // MATRICULA
    const handleMatricula = () => {
        const fetchData = async () => {
            try {
                const result = await axios.post(`${apiUrlCursos}/matricular`, { curso_id: curso.id });

                if (result.data && result.data.success == true) {
                    window.location.pathname = `/minha-conta/curso/${curso.id}`;
                } else {
                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error('error: ', error);

                    window.location.pathname = `/minha-conta/curso/${curso.id}`;
                } else if (error.response && error.response.status === 401) {
                    console.error('error: ', error);
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <>
            <Helmet>
                <title>{curso && curso.title}</title>
                <meta name="description" content={curso && curso.description} />
            </Helmet>

            <Main>
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
                        <Flex display="flex" flexWrap="wrap">
                            <Box height={{ d: '280px', md: '380px' }} overflow="hidden" verticalAlign="middle" width="100%">
                                <BgImageLazyLoad url={(windowWidth < parseInt(variable.lg, 10) && curso.imagens.destaque.destaque_1024) || (windowWidth > parseInt(variable.lg, 10) && curso.imagens.destaque.destaque_1920)} />
                            </Box>
                        </Flex>

                        <CursoTopInfoStyled>
                            <Container mx="auto" px={3} py={{ d: 2, sm: 3 }}>
                                <Flex alignContent="center" display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'space-between' }}>
                                    <Box width={{ d: '100%', sm: 4 / 6, md: 3 / 4 }}>
                                        <Flex display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'flex-start' }} textAlign="center">
                                            <Box borderRight="1px solid rgba(216, 221, 225, 1)" pr={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                                <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="600" mb={0} themeColor="dark">
                                                    {curso.carga_horaria || 'Indefinido'}
                                                </P>

                                                <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mb={0} themeColor="dark">
                                                    Carga Horária
                                                </P>
                                            </Box>

                                            <Box borderRight="1px solid rgba(216, 221, 225, 1)" px={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                                <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="600" mb={0} themeColor="dark">
                                                    {curso.nivel || 'Indefinido'}
                                                </P>

                                                <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mb={0} themeColor="dark">
                                                    Nível
                                                </P>
                                            </Box>

                                            <Box borderRight="1px solid rgba(216, 221, 225, 1)" px={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                                <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="600" mb={0} themeColor="dark">
                                                    {curso.modalidade || 'Indefinido'}
                                                </P>

                                                <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mb={0} themeColor="dark">
                                                    Modalidade
                                                </P>
                                            </Box>

                                            <Box borderRight={{ d: 0, sm: '1px solid rgba(216, 221, 225, 1)' }} px={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                                <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="600" mb={0} themeColor="dark">
                                                    Gratuito
                                                </P>

                                                <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mb={0} themeColor="dark">
                                                    Investimento
                                                </P>
                                            </Box>
                                        </Flex>
                                    </Box>

                                    <Box display={{ d: 'none', sm: 'block' }}>
                                        <Button fontSize="24px" onClick={() => handleMatricula()} text="Começar" />
                                    </Box>
                                </Flex>
                            </Container>
                        </CursoTopInfoStyled>

                        <Wrap>
                            <Flex display={{ d: 'flex', sm: 'none' }} flexWrap="wrap" justifyContent="center">
                                <Box mt={4}>
                                    <Button fontSize="20px" mx="auto" onClick={() => handleMatricula()} text="Começar" />
                                </Box>
                            </Flex>

                            <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                                <Grid display="grid" gridColumnGap="75px" gridRowGap={3} gridTemplateColumns={{ d: '100%', sm: '4fr 5fr' }}>
                                    <Cell>
                                        <Title2 mb={{ d: 3, md: 4 }} themeColor="dark">
                                            {curso.title}
                                        </Title2>

                                        <div>{parse(`${curso.content}`)}</div>
                                    </Cell>

                                    <Cell>
                                        <Box display="inline-block" height={{ d: '200px', sm: '300px' }} overflow="hidden" verticalAlign="middle" width="100%">
                                            <BgImageLazyLoad url={curso.imagens.galeria.curso_listagem} />
                                        </Box>
                                    </Cell>
                                </Grid>
                            </Container>
                        </Wrap>

                        {curso.capacitacoes.length > 0 && (
                            <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                                <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                    Com esse curso você será capaz de
                                </Title2>

                                <Grid display="grid" gridColumnGap="75px" gridRowGap={3} gridTemplateColumns={{ d: '100%', md: 'repeat(3, 1fr)' }}>
                                    {curso.capacitacoes.map((capacitacao) => {
                                        return (
                                            <Cell key={capacitacao.titulo}>
                                                <Title4 fontWeight="600" line={true} mb={{ d: 3, md: 4 }} themeColor="dark">
                                                    {capacitacao.titulo}
                                                </Title4>

                                                <p>{capacitacao.descricao}</p>
                                            </Cell>
                                        );
                                    })}
                                </Grid>
                            </Container>
                        )}

                        {curso.modulos.length > 0 && (
                            <Wrap>
                                <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                                    <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                        Conteúdo
                                    </Title2>

                                    <Grid display="grid" gridRowGap={3} gridTemplateColumns="100%" maxWidth="450px" mx="auto">
                                        {curso.modulos.map((modulo) => {
                                            return (
                                                <ConteudoCellStyled active={statePart == modulo.id} hover={true} key={modulo.id} onClick={() => setStatePart(statePart == modulo.id ? null : modulo.id)} pl={4} pr={5} py={3}>
                                                    <Box textAlign="center">
                                                        <Span fontSize={{ d: 20, md: 24 }} fontWeight="600" verticalAlign="middle">
                                                            {modulo.title}
                                                        </Span>

                                                        <ConteudoCellSvgStyled>
                                                            <Svg fill="colorSecondary" height="30px" name={statePart == modulo.id ? 'svg-minus' : 'svg-plus'} />
                                                        </ConteudoCellSvgStyled>
                                                    </Box>

                                                    <Box>
                                                        <P>{modulo.excerpt}</P>
                                                    </Box>
                                                </ConteudoCellStyled>
                                            );
                                        })}
                                    </Grid>
                                </Container>
                            </Wrap>
                        )}

                        <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                            <Title2 mb={{ d: 1, md: 2 }} mx="auto" textAlign="center" themeColor="dark">
                                Domine o assunto desse curso agora.
                            </Title2>

                            <Title4 align="center" mb={5} themeColor="dark">
                                E alcance sua liberdade financeira investindo.
                            </Title4>

                            <Box textAlign="center">
                                <Button fontSize="24px" mx="auto" onClick={() => handleMatricula()} text="Começar" />
                            </Box>
                        </Container>

                        <Wrap>
                            <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                                <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                    Instrutor
                                </Title2>

                                <Grid display="grid" gridColumnGap="75px" gridRowGap={3} gridTemplateColumns={{ d: '100%', sm: '1fr 230px' }} justifyItems={{ d: 'center', sm: 'flex-end' }}>
                                    <Cell>
                                        <Title2 mb={{ d: 3, md: 4 }} themeColor="dark">
                                            Gabe Towels
                                        </Title2>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al.</p>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                                    </Cell>

                                    <Cell>
                                        <Box borderRadius="50%" height="230px" overflow="hidden" verticalAlign="middle" width="230px">
                                            <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                        </Box>
                                    </Cell>
                                </Grid>
                            </Container>
                        </Wrap>

                        {/* <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                            <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                Avalilações
                            </Title2>

                            <CarouselStyled maxWidth="600px" mx="auto">
                                <Slider {...carouselOptions}>
                                    <div>
                                        <Grid display="grid" gridRowGap={4} justifyItems="center" mb={5} px={1}>
                                            <Cell>
                                                <TooltipStyled px={{ d: 4, sm: '75px' }} py={{ d: 3, sm: 5 }}>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al.</p>
                                                </TooltipStyled>
                                            </Cell>

                                            <Cell alignContent="center" display="inline-flex">
                                                <Box borderRadius="50%" display="inline-block" height="100px" mr={3} overflow="hidden" verticalAlign="middle" width="100px">
                                                    <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                                </Box>

                                                <Box display="inline-block" overflow="hidden" verticalAlign="middle">
                                                    <Title5 fontWeight="600" themeColor="dark">
                                                        Gabe Towels
                                                    </Title5>

                                                    <p>Aluno</p>
                                                </Box>
                                            </Cell>
                                        </Grid>
                                    </div>

                                    <div>
                                        <Grid display="grid" gridRowGap={4} justifyItems="center" mb={5} px={1}>
                                            <Cell>
                                                <TooltipStyled px={{ d: 4, sm: '75px' }} py={{ d: 3, sm: 5 }}>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al.</p>
                                                </TooltipStyled>
                                            </Cell>

                                            <Cell alignContent="center" display="inline-flex">
                                                <Box borderRadius="50%" display="inline-block" height="100px" mr={3} overflow="hidden" verticalAlign="middle" width="100px">
                                                    <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                                </Box>

                                                <Box display="inline-block" overflow="hidden" verticalAlign="middle">
                                                    <Title5 fontWeight="600" themeColor="dark">
                                                        Gabe Towels
                                                    </Title5>

                                                    <p>Aluno</p>
                                                </Box>
                                            </Cell>
                                        </Grid>
                                    </div>
                                </Slider>
                            </CarouselStyled> */}

                        {/* <CursosRelacionadosStyled mb={5}>
                                <Title4 color="colorGray2" mb={4} themeColor="dark">
                                    Matérias Relacionadas
                                </Title4>

                                <Flex display="flex" flexWrap="wrap">
                                    {stateCurso &&
                                        stateCurso.data.map((curso) => {
                                            return (
                                                <Box key={curso.id} mb={5} width={{ d: 1, md: 1 / 3 }}>
                                                    <LinkTo ariaLabel={curso.title} height="100%" to={`/curso/${curso.id}`} onClick={() => setStateCursoUrl(`${apiUrlCursos}/${curso.id}`)} to={`/curso/${curso.id}`} width="100%">
                                                        <ListBox alignContent="space-between" color={stateCurso.featured_color} display="flex" flexWrap="wrap" height="100%" hover="true" mx={2} themeColor="dark" verticalAlign="middle">
                                                            <ListBoxHover zindex="3">
                                                                <Flex alignContent="center" display="flex" flexWrap="wrap" height="100%" justifyContent="center">
                                                                    <Box textAlign="center">
                                                                        <Svg fill="colorWhite" height="50px" mb={2} name="svg-plus" />

                                                                        <p>Saber mais</p>
                                                                    </Box>
                                                                </Flex>
                                                            </ListBoxHover>

                                                            <Box width="100%">
                                                                <Box height="200px" overflow="hidden" width="100%">
                                                                    <BgImageLazyLoad key={curso.id} url={curso.thumbnail && curso.thumbnail.attachment.url} />

                                                                    <ListTag>Gratuito</ListTag>
                                                                </Box>

                                                                <Box px={3} py={2} width="100%">
                                                                    <p>Curso {curso.modalidade}</p>

                                                                    <ListTitle>{curso.title}</ListTitle>
                                                                </Box>
                                                            </Box>

                                                            <Box pb={3} px={3} width="100%">
                                                                <Svg fill="colorSecondary" height="15px" name="svg-time" />

                                                                <ListTime ml={1} mr={3}>
                                                                    {curso.carga_horaria}
                                                                </ListTime>

                                                                <Svg fill="colorSecondary" height="16px" name="svg-level" />

                                                                <ListLevel ml={1}>{curso.nivel}</ListLevel>
                                                            </Box>
                                                        </ListBox>
                                                    </LinkTo>
                                                </Box>
                                            );
                                        })}
                                </Flex>
                            </CursosRelacionadosStyled> */}
                        {/* </Container> */}
                    </>
                )}
            </Main>
        </>
    );
};
