import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';
import { Svg } from '../../Svg/Svg';

import { Container, Main } from '../../../style/layout';
import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { BgImageOverlay, Image } from '../../../style/image';

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Home" />
            </Helmet>

            <Main>
                <Grid display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="30vh 30vh">
                    <Cell display="flex" gridRow={{ xs: 1, sm: '1 / span 2' }} p={{ xs: 2, sm: 3, md: 4 }}>
                        <BgImageOverlay url="https://picsum.photos/id/0/1024" />

                        <Flex alignItems="flex-end" display="flex">
                            <NoticiaBox author="Por Alexandre Stormer" color="colorOrange" tag="Mercado Internacional" themeColor="light" title="Como a mudança de postura do FED pode afetar seus investimentos?" titleSize="32px" />
                        </Flex>
                    </Cell>
                </Grid>

                <Container mx="auto" my={4} pb={5} px={3}>
                    <Flex display="flex" flexWrap="wrap">
                        <Box pr={{ xs: 0, sm: 3 }} width={{ xs: 1, sm: 1, md: '1 / 2' }}>
                            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="minmax(150px, auto)" gridRowGap={4} gridTemplateRows="300px">
                                <Cell display="flex">
                                    <BgImageOverlay url="https://picsum.photos/id/1059/1024" />
                                </Cell>

                                <Cell display="flex">
                                    <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" />
                                </Cell>

                                <Cell display="flex">
                                    <NoticiaBox author="Por Alexandre Stormer" color="colorOrange" tag="Mercado Internacional" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" width="70%" />

                                    <Image height="100px" mr={0} mt={3} pl={3} src="https://picsum.photos/id/163/1024" text="Imagem 163" width="120px" />
                                </Cell>
                            </Grid>

                            <Flex display="flex" justifyContent="flex-end">
                                <LinkTo hover="primary" fontWeight="600" to="/noticias">
                                    <span>Ver mais</span>

                                    <Svg className="svg-next" name="svg-next" pl={2} />
                                </LinkTo>
                            </Flex>
                        </Box>

                        <Box px={{ xs: 0, sm: 3 }} width={{ xs: 1, ms: '1 / 2', md: '1 / 4' }}>
                            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="minmax(100px, auto)" gridRowGap={4}>
                                <Cell display="flex">
                                    <NoticiaBox author="Por Alexandre Stormer" color="colorGreen" dateTime="15/05/19 09:30" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" titleSize="18px" />
                                </Cell>

                                <Cell display="flex">
                                    <NoticiaBox author="Por Alexandre Stormer" color="colorOrange" dateTime="15/05/19 09:30" themeColor="dark" title="Como a mudança de postura do FED pode afetar seus investimentos?" titleSize="18px" />
                                </Cell>
                            </Grid>
                        </Box>
                    </Flex>
                </Container>
            </Main>
        </>
    );
};
