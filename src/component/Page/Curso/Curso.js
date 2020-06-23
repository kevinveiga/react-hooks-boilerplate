import React, { useEffect, useState } from 'react';

import Vimeo from '@u-wave/react-vimeo';
import parse from 'html-react-parser';
import YouTube from 'react-youtube';

import { apiUrlCursos } from '../../../config';

import { cursoMatricula, useCursoApi } from '../../../service/curso';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { getImageLg, getImageMd, getImageSm } from '../../../util/getResponsiveImage';
import { scrollTo } from '../../../util/scrollTo';
import { getVideoId } from '../../../util/getVideoId';
import { getVideoSource } from '../../../util/getVideoSource';

import { Button } from '../../Button/Button';
import { DotBtn, DotContainer, NextBtn, PrevBtn } from '../../Carousel/CarouselButton';
// import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { ImageLazyLoad } from '../../LazyLoad/ImageLazyLoad';
// import { LinkTo } from '../../Link/LinkTo';
// import { LoaderComponent } from '../../Loader/LoaderComponent';
import { Seo } from '../../Seo/Seo';
import { Svg } from '../../Svg/Svg';

// import { CarouselStyled } from '../../Carousel/CarouselStyled';
import { ConteudoCellStyled, ConteudoCellSvgStyled, CursoTopInfoStyled, TooltipStyled } from './CursoStyled';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, VideoWrap, Wrap } from '../../../style/layout';
import { P, Span, Title2, Title4, Title5 } from '../../../style/text';
import { variable } from '../../../style/variable';

// LAZY
// const Slider = lazy(() => import('react-slick'));

export const Curso = ({ match }) => {
    // API
    const [stateCurso, setStateCursoUrl] = useCursoApi(`${apiUrlCursos}/${match.params.slug}`);

    const cursoLength = stateCurso.data.data ? stateCurso.data.data.data.length : 0;
    // const cursoRelatedLength = cursoLength > 0 && stateCurso.data.related.length;

    // Redirecionamento temporário
    // if (stateCurso.isError == true) {
    //     window.location.pathname = '/';
    // }

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
    const handleMatricula = (cursoId) => () => {
        cursoMatricula(cursoId);
    };

    return (
        <>
            <Seo>
                <title>{curso && curso.title}</title>
                <meta name="description" content={curso && curso.description} />
            </Seo>

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
                        <Box backgroundColor="colorGray3" height={{ d: '280px', md: '380px' }} overflow="hidden" verticalAlign="middle" width="100%">
                            <BgImageLazyLoad
                                filter={(windowWidth > parseInt(variable.md, 10) && 'blur(150px)') || undefined}
                                url={
                                    (windowWidth < parseInt(variable.sm, 10) && getImageSm(curso.imagens.destaque)) ||
                                    (windowWidth < parseInt(variable.md, 10) && getImageMd(curso.imagens.destaque)) ||
                                    (windowWidth > parseInt(variable.md, 10) && getImageLg(curso.imagens.destaque))
                                }
                            />
                        </Box>
                    </Flex>

                    <CursoTopInfoStyled>
                        <Container mx="auto" px={3} py={{ d: 2, sm: 3 }}>
                            <Flex alignItems="center" display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'space-between' }}>
                                <Box width={{ d: '100%', sm: 4 / 6, md: 3 / 4 }}>
                                    <Flex display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'flex-start' }} textAlign="center">
                                        <Box borderRight="1px solid rgba(216, 221, 225, 1)" pr={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                            <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="700" themeColor="dark">
                                                {curso.carga_horaria || 'Indefinido'}
                                            </P>

                                            <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mt={0} themeColor="dark">
                                                Carga Horária
                                            </P>
                                        </Box>

                                        <Box borderRight="1px solid rgba(216, 221, 225, 1)" px={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                            <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="700" textTransform="capitalize" themeColor="dark">
                                                {curso.nivel || 'Indefinido'}
                                            </P>

                                            <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mt={0} themeColor="dark">
                                                Nível
                                            </P>
                                        </Box>

                                        <Box borderRight="1px solid rgba(216, 221, 225, 1)" px={{ d: 2, sm: 3, md: 4 }} py={{ d: 1, sm: 0 }}>
                                            <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="700" textTransform="capitalize" themeColor="dark">
                                                {curso.modalidade || 'Indefinido'}
                                            </P>

                                            <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mt={0} themeColor="dark">
                                                Modalidade
                                            </P>
                                        </Box>

                                        <Box
                                            borderRight={{ d: 0, sm: '1px solid rgba(216, 221, 225, 1)' }}
                                            px={{ d: 2, sm: 3, md: 4 }}
                                            py={{ d: 1, sm: 0 }}
                                        >
                                            <P fontSize={{ d: '14px', sm: '20px' }} fontWeight="700" themeColor="dark">
                                                Gratuito
                                            </P>

                                            <P display={{ d: 'none', sm: 'block' }} fontSize="12px" mt={0} themeColor="dark">
                                                Investimento
                                            </P>
                                        </Box>
                                    </Flex>
                                </Box>

                                <Box display={{ d: 'none', sm: 'block' }}>
                                    <Button fontSize="24px" onClick={handleMatricula(curso.id)} text="Começar" />
                                </Box>
                            </Flex>
                        </Container>
                    </CursoTopInfoStyled>

                    <Wrap>
                        <Flex display={{ d: 'flex', sm: 'none' }} flexWrap="wrap" justifyContent="center">
                            <Box mt={4}>
                                <Button fontSize="20px" mx="auto" onClick={handleMatricula(curso.id)} text="Começar" />
                            </Box>
                        </Flex>

                        <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                            <Grid display="grid" gridColumnGap="75px" gridRowGap={3} gridTemplateColumns={{ d: '100%', md: '4fr 5fr' }}>
                                <Cell>
                                    <Title2 fontSize={{ d: '26px', md: '36px' }} mb={{ d: 3, md: 4 }} themeColor="dark">
                                        {curso.title}
                                    </Title2>

                                    <div>{parse(`${curso.content}`)}</div>
                                </Cell>

                                <Cell>
                                    {curso.imagens.video && curso.imagens.video.url ? (
                                        <Box overflowY="hidden">
                                            <VideoWrap>
                                                {getVideoSource(curso.imagens.video.url) === 'vimeo' ? (
                                                    <Vimeo
                                                        video={curso.imagens.video && curso.imagens.video.url && getVideoId(curso.imagens.video.url)}
                                                    />
                                                ) : (
                                                    <YouTube
                                                        videoId={
                                                            curso.imagens.video && curso.imagens.video.url && getVideoId(curso.imagens.video.url)
                                                        }
                                                    />
                                                )}
                                            </VideoWrap>
                                        </Box>
                                    ) : (
                                        <Box overflow="hidden" verticalAlign="middle" width="100%">
                                            <ImageLazyLoad url={curso.imagens.galeria.curso_listagem} width="100%" />
                                        </Box>
                                    )}
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
                                            <Title4
                                                fontSize={{ d: '18px', md: '20px' }}
                                                fontWeight="700"
                                                line={true}
                                                mb={{ d: 3, md: 4 }}
                                                themeColor="dark"
                                            >
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
                                            <ConteudoCellStyled
                                                active={statePart == modulo.id}
                                                hover={true}
                                                key={modulo.id}
                                                onClick={() => setStatePart(statePart == modulo.id ? null : modulo.id)}
                                                pl={4}
                                                pr={5}
                                                py={3}
                                            >
                                                <Box mt={2} textAlign="center">
                                                    <Span fontSize={{ d: '18px', md: '20px' }} fontWeight="700" verticalAlign="middle">
                                                        {modulo.title}
                                                    </Span>

                                                    <ConteudoCellSvgStyled>
                                                        <Svg
                                                            fill="colorSecondary"
                                                            height="30px"
                                                            name={statePart == modulo.id ? 'svg-minus' : 'svg-plus'}
                                                        />
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
                            <Button fontSize="24px" mx="auto" onClick={handleMatricula(curso.id)} text="Começar" />
                        </Box>
                    </Container>

                    {curso.instrutores.length > 0 && curso.instrutores[0].nome.trim() && (
                        <Wrap>
                            <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                                <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                                    Instrutor{curso.instrutores.length > 1 && 'es'}
                                </Title2>

                                {curso.instrutores.map((instrutor) => {
                                    return (
                                        <Grid
                                            display="grid"
                                            gridColumnGap="75px"
                                            gridRowGap={3}
                                            gridTemplateColumns={{ d: '100%', md: '1fr 230px' }}
                                            justifyItems={{ d: 'center', md: 'flex-start' }}
                                            key={instrutor.id}
                                            mb={variable.spacingXL}
                                        >
                                            <Cell>
                                                <Title2 mb={{ d: 3, md: 4 }} themeColor="dark">
                                                    {instrutor.nome}
                                                </Title2>

                                                <div>{instrutor.bio && parse(`${instrutor.bio}`)}</div>
                                            </Cell>

                                            <Cell>
                                                <Box borderRadius="50%" height="230px" overflow="hidden" verticalAlign="middle" width="230px">
                                                    <BgImageLazyLoad url={instrutor.avatar && instrutor.avatar.url} />
                                                </Box>
                                            </Cell>
                                        </Grid>
                                    );
                                })}
                            </Container>
                        </Wrap>
                    )}

                    {/* <Container mx="auto" px={3} py={{ d: variable.spacingLG, md: variable.spacingXL }}>
                        <Title2 mb={{ d: 4, md: 5 }} mx="auto" textAlign="center" themeColor="dark">
                            Avalilações
                        </Title2>

                        <CarouselStyled maxWidth="600px" mx="auto">
                            <ErrorBoundary>
                                <Suspense fallback={<LoaderComponent />}>
                                    <Slider {...carouselOptions}>
                                        <div>
                                            <Grid display="grid" gridRowGap={4} justifyItems="center" mb={5} px={1}>
                                                <Cell>
                                                    <TooltipStyled px={{ d: 4, sm: '75px' }} py={{ d: 3, sm: 5 }}>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut al.</p>
                                                    </TooltipStyled>
                                                </Cell>

                                                <Cell alignItems="center" display="inline-flex">
                                                    <Box borderRadius="50%" display="inline-block" height="100px" mr={3} overflow="hidden" verticalAlign="middle" width="100px">
                                                        <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                                    </Box>

                                                    <Box display="inline-block" overflow="hidden" verticalAlign="middle">
                                                        <Title5 fontWeight="700" themeColor="dark">
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

                                                <Cell alignItems="center" display="inline-flex">
                                                    <Box borderRadius="50%" display="inline-block" height="100px" mr={3} overflow="hidden" verticalAlign="middle" width="100px">
                                                        <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                                    </Box>

                                                    <Box display="inline-block" overflow="hidden" verticalAlign="middle">
                                                        <Title5 fontWeight="700" themeColor="dark">
                                                            Gabe Towels
                                                        </Title5>

                                                        <p>Aluno</p>
                                                    </Box>
                                                </Cell>
                                            </Grid>
                                        </div>
                                    </Slider>
                                </Suspense>
                            </ErrorBoundary>
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
                                                    <ListBox alignItems="space-between" display="flex" flexWrap="wrap" height="100%" hover="true" mx={2} themeColor="dark" verticalAlign="middle">
                                                        <ListBoxHover zindex="3">
                                                            <Flex alignItems="center" display="flex" flexWrap="wrap" height="100%" justifyContent="center">
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
        </>
    );
};
