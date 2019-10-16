import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { MinhaContaCursoMenu } from './MinhaContaCursoMenu';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';

import { MinhaContaCursoDuvidasStyled, MinhaContaCursoDuvidasImageContainerStyled, MinhaContaCursoDuvidasImageLineStyled, MinhaContaCursoDuvidasItemsStyled } from './MinhaContaCursoStyled';
import { MinhaContaCenterStyled } from './MinhaContaStyled';
import { TabContentStyled, TabsContentStyled, TabNavStyled, TabsNavStyled, TabStyled } from './MinhaContaTabStyled';

import { Box, Flex } from '../../../style/flex';
import { Image } from '../../../style/image';
import { Container, Main } from '../../../style/layout';
import { P, Title2 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const MinhaContaCurso = ({ ...breadcrumb }) => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    // ACTION
    const [stateTabSelected, setStateTabSelected] = useState('resumo');
    const windowWidth = useWindowWidth();

    const handleTabChange = (e) => {
        setStateTabSelected(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet>

            <HeaderAlternate currentBreadcrumbLabel="Titulo do Curso" {...breadcrumb} />

            <Main header="minhaConta">
                <Container mx="auto" px={{ d: 0, lg: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <MinhaContaCenterStyled pl={{ d: 3, sm: 5 }} py={{ d: 3, sm: 5 }} width="100%">
                            {windowWidth < parseInt(variable.md, 10) && <Breadcrumb currentLabel="Titulo do Curso" obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                            <Flex display="flex" flexWrap="wrap">
                                <Box pr={{ d: 3, sm: 5 }} width={{ d: 1, md: 7 / 10 }}>
                                    <Box height="50vh" mb={3}>
                                        <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                    </Box>

                                    <Box mb={3} textAlign="right">
                                        <Button borderColor="colorGray" color="colorBlack3" display="inline-block" text="Próxima Aula" themeType="border" width={{ d: '100%', sm: 'auto' }} />
                                    </Box>

                                    <Box display={{ d: 'block', md: 'none' }}>
                                        <MinhaContaCursoMenu />
                                    </Box>

                                    <Box>
                                        <TabStyled group="tab-group" total={3}>
                                            <input
                                                checked={stateTabSelected === 'resumo'}
                                                id="tab-id-resumo"
                                                name="tab-group"
                                                onChange={(e) => {
                                                    handleTabChange(e);
                                                }}
                                                type="radio"
                                                value="resumo"
                                            />

                                            <input
                                                checked={stateTabSelected === 'conteudo'}
                                                id="tab-id-conteudo"
                                                name="tab-group"
                                                onChange={(e) => {
                                                    handleTabChange(e);
                                                }}
                                                type="radio"
                                                value="conteudo"
                                            />

                                            <input
                                                checked={stateTabSelected === 'duvidas'}
                                                id="tab-id-duvidas"
                                                name="tab-group"
                                                onChange={(e) => {
                                                    handleTabChange(e);
                                                }}
                                                type="radio"
                                                value="duvidas"
                                            />

                                            <TabsNavStyled>
                                                <TabNavStyled>
                                                    <label htmlFor="tab-id-resumo">Resumo</label>
                                                </TabNavStyled>

                                                <TabNavStyled>
                                                    <label htmlFor="tab-id-conteudo">Conteúdo</label>
                                                </TabNavStyled>

                                                <TabNavStyled>
                                                    <label htmlFor="tab-id-duvidas">Dúvidas</label>
                                                </TabNavStyled>
                                            </TabsNavStyled>

                                            <TabsContentStyled>
                                                <TabContentStyled>
                                                    <Title2>Aula 12 - Por onde começar?</Title2>

                                                    <p>
                                                        It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going
                                                        to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                    </p>
                                                </TabContentStyled>

                                                <TabContentStyled>
                                                    <Title2>Conteúdo</Title2>

                                                    <p>
                                                        It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going
                                                        to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                    </p>

                                                    <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>

                                                    <p>
                                                        It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going
                                                        to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                    </p>

                                                    <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>
                                                </TabContentStyled>

                                                <TabContentStyled>
                                                    <Title2>Dúvidas</Title2>

                                                    <MinhaContaCursoDuvidasStyled>
                                                        <MinhaContaCursoDuvidasItemsStyled>
                                                            <MinhaContaCursoDuvidasImageLineStyled>
                                                                <MinhaContaCursoDuvidasImageContainerStyled>
                                                                    <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                                                                </MinhaContaCursoDuvidasImageContainerStyled>
                                                            </MinhaContaCursoDuvidasImageLineStyled>

                                                            <Box width="100%">
                                                                <P fontWeight="600">Vita Silva</P>
                                                                <P>It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off?</P>
                                                                <P color="colorGray2" fontSize="14px">
                                                                    23 Ago. 2019
                                                                </P>
                                                            </Box>
                                                        </MinhaContaCursoDuvidasItemsStyled>

                                                        <MinhaContaCursoDuvidasItemsStyled>
                                                            <MinhaContaCursoDuvidasImageLineStyled>
                                                                <MinhaContaCursoDuvidasImageContainerStyled>
                                                                    <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                                                                </MinhaContaCursoDuvidasImageContainerStyled>
                                                            </MinhaContaCursoDuvidasImageLineStyled>

                                                            <Box width="100%">
                                                                <P fontWeight="600">Ricardo Milos</P>
                                                                <P>Our passengers must be hotter than I thought.</P>
                                                                <P color="colorGray2" fontSize="14px">
                                                                    25 Ago. 2019
                                                                </P>
                                                            </Box>
                                                        </MinhaContaCursoDuvidasItemsStyled>

                                                        <MinhaContaCursoDuvidasItemsStyled>
                                                            <MinhaContaCursoDuvidasImageContainerStyled>
                                                                <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                                                            </MinhaContaCursoDuvidasImageContainerStyled>

                                                            <Box width="100%">
                                                                <P color="colorPrimary" fontWeight="600">
                                                                    Equipe Liberta
                                                                </P>
                                                                <P>It looks like an Imperial cruiser. Our passenger.</P>
                                                                <P color="colorGray2" fontSize="14px">
                                                                    23 Ago. 2019
                                                                </P>
                                                            </Box>
                                                        </MinhaContaCursoDuvidasItemsStyled>
                                                    </MinhaContaCursoDuvidasStyled>

                                                    <MinhaContaCursoDuvidasStyled>
                                                        <MinhaContaCursoDuvidasItemsStyled>
                                                            <MinhaContaCursoDuvidasImageLineStyled>
                                                                <MinhaContaCursoDuvidasImageContainerStyled>
                                                                    <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                                                                </MinhaContaCursoDuvidasImageContainerStyled>
                                                            </MinhaContaCursoDuvidasImageLineStyled>

                                                            <Box width="100%">
                                                                <P fontWeight="600">Gilberto Silva</P>
                                                                <P>It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off?</P>
                                                                <P color="colorGray2" fontSize="14px">
                                                                    23 Ago. 2019
                                                                </P>
                                                            </Box>
                                                        </MinhaContaCursoDuvidasItemsStyled>

                                                        <MinhaContaCursoDuvidasItemsStyled>
                                                            <MinhaContaCursoDuvidasImageContainerStyled>
                                                                <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                                                            </MinhaContaCursoDuvidasImageContainerStyled>

                                                            <Box width="100%">
                                                                <P color="colorPrimary" fontWeight="600">
                                                                    Equipe Liberta
                                                                </P>
                                                                <P>It looks like an Imperial cruiser. Our passenger.</P>
                                                                <P color="colorGray2" fontSize="14px">
                                                                    23 Ago. 2019
                                                                </P>
                                                            </Box>
                                                        </MinhaContaCursoDuvidasItemsStyled>
                                                    </MinhaContaCursoDuvidasStyled>
                                                </TabContentStyled>
                                            </TabsContentStyled>
                                        </TabStyled>
                                    </Box>
                                </Box>

                                <Box display={{ d: 'none', md: 'block' }} width={{ d: 1, md: 3 / 10 }}>
                                    <MinhaContaCursoMenu />
                                </Box>
                            </Flex>
                        </MinhaContaCenterStyled>
                    </Flex>
                </Container>
            </Main>

            <FooterAlternate />
        </>
    );
};
