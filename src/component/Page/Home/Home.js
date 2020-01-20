import React, { lazy } from 'react';

import { HomeProvider } from '../../../store/home/home';

import { HomeDestaque } from './HomeDestaque';
import { HomeNoticia } from './HomeNoticia';
import { HomeSuperDestaque } from './HomeSuperDestaque';
import { HomeSeo } from './HomeSeo';
import { ComponentLazyLoad } from '../../LazyLoad/ComponentLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
// import { Image } from '../../../style/image';
import { Container, Main, Wrap } from '../../../style/layout';
import { Title4 } from '../../../style/text';

// import brasilParalelo from '../../../asset/image/brasil-paralelo.png';
// import infomoney from '../../../asset/image/infomoney.png';
// import misesBrasil from '../../../asset/image/mises-brasil.png';
// import nelogica from '../../../asset/image/nelogica.png';
// import xpInvestimentos from '../../../asset/image/xp-investimentos.png';

// LAZY
// const BannerPerfilInvestidor = lazy(() => import('../../Banner/BannerPerfilInvestidor'));
// const HomeEquipe = lazy(() => import('./HomeEquipe'));
// const HomeParceiro = lazy(() => import('./HomeParceiro'));
const HomeVideo = lazy(() => import('./HomeVideo'));

export const Home = ({ location }) => {
    return (
        <>
            <HomeSeo />

            <Main>
                <HomeProvider location={location}>
                    <HomeSuperDestaque />

                    <Wrap>
                        <Container id="home-noticias-container" mx="auto" px={3} py={{ d: 3, md: 4 }}>
                            <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                                <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: '60%' }}>
                                    <HomeDestaque />

                                    <Flex display="flex" justifyContent="flex-end">
                                        <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary' }} link="/noticias">
                                            <span>Ver mais</span>

                                            <Svg name="svg-next" pl={2} />
                                        </LinkTo>
                                    </Flex>
                                </Box>

                                <Box mb={5} pl={{ d: 0, sm: 3 }} width={{ d: 1, sm: 'calc(100% - 321px)', md: '40%' }}>
                                    <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                                        Últimas
                                    </Title4>

                                    <HomeNoticia />
                                </Box>
                            </Flex>
                        </Container>
                    </Wrap>

                    <ComponentLazyLoad component={HomeVideo} />

                    {/* <Container mx="auto" my={{ d: 3, md: 4 }} px={3}>
                        <Title2 align="center" themeColor="dark">
                            As lendas do Mercado Financeiro e as grandes empresas com um objetivo: <Span color="colorGreen">a sua Liberdade</Span>
                        </Title2>

                        <Title4 align="center" color="colorGray2" mb={5} themeColor="dark">
                            Conheça alguns de nossos parceiros.
                        </Title4>

                        <Title3 color="colorGray2" fontWeight="700" themeColor="dark">
                            Equipe
                        </Title3>

                        <HomeEquipe />

                        <Title3 color="colorGray2" fontWeight="700" themeColor="dark">
                            Parceiros
                        </Title3>

                        <HomeParceiro />

                        <Title2 align="center" color="colorGray2" themeColor="dark">
                            Empresas Parceiras
                        </Title2>

                        <Flex alignItems="center" display="flex" flexWrap="wrap" justifyContent={{ d: 'center', sm: 'space-between' }} mb={5}>
                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Xp Investimentos" url={xpInvestimentos} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Nelogica" url={nelogica} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="InfoMoney" url={infomoney} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Brasil Paralelo" url={brasilParalelo} />
                            </Box>

                            <Box display="flex" p={3} width={{ d: 1, sm: 1 / 5 }}>
                                <Image text="Mises Brasil" url={misesBrasil} />
                            </Box>
                        </Flex>
                    </Container> */}
                </HomeProvider>
            </Main>
        </>
    );
};
