import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet-async';

import { apiUrlHome } from '../../../config';

import { useSeoApi } from '../../../service/seo';

import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button } from '../../Button/Button';
import { FooterAlternate } from '../../Footer/FooterAlternate';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';

import { MinhaContaCenterStyled } from './MinhaContaStyled';
import { MinhaContaCursoTabContentStyled, MinhaContaCursoTabsContentStyled, MinhaContaCursoTabNavStyled, MinhaContaCursoTabsNavStyled, MinhaContaCursoTabStyled } from './MinhaContaCursoStyled';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { Title2 } from '../../../style/text';

export const MinhaContaCurso = ({ ...breadcrumb }) => {
    // API
    const stateSeo = useSeoApi(`${apiUrlHome}/seo`, {});

    // ACTION
    const [stateTabSelected, setStateTabSelected] = useState('resumo');

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
                        <MinhaContaCenterStyled p={{ d: 3, sm: 5 }} width="100%">
                            {isMobile && <Breadcrumb currentLabel="Titulo do Curso" obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />}

                            <Flex display="flex" flexWrap="wrap">
                                <Box height="50vh" mb={3} width="100%">
                                    <BgImageLazyLoad url="https://picsum.photos/id/1011/1024/768" />
                                </Box>

                                <Box mb={3} textAlign="right" width="100%">
                                    <Button borderColor="colorGray" color="colorBlack3" display="inline-block" text="Próxima Aula" themeType="border" />
                                </Box>

                                <Box width="100%">
                                    <MinhaContaCursoTabStyled group="tab-group" total={3}>
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

                                        <MinhaContaCursoTabsNavStyled>
                                            <MinhaContaCursoTabNavStyled>
                                                <label htmlFor="tab-id-resumo">Resumo</label>
                                            </MinhaContaCursoTabNavStyled>

                                            <MinhaContaCursoTabNavStyled>
                                                <label htmlFor="tab-id-conteudo">Conteúdo</label>
                                            </MinhaContaCursoTabNavStyled>

                                            <MinhaContaCursoTabNavStyled>
                                                <label htmlFor="tab-id-duvidas">Dúvidas</label>
                                            </MinhaContaCursoTabNavStyled>
                                        </MinhaContaCursoTabsNavStyled>

                                        <MinhaContaCursoTabsContentStyled>
                                            <MinhaContaCursoTabContentStyled>
                                                <Title2>Aula 12 - Por onde começar?</Title2>

                                                <p>
                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going to
                                                    try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                </p>
                                            </MinhaContaCursoTabContentStyled>

                                            <MinhaContaCursoTabContentStyled>
                                                <Title2>Conteúdo</Title2>

                                                <p>
                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going to
                                                    try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                </p>

                                                <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>

                                                <p>
                                                    It looks like an Imperial cruiser. Our passengers must be hotter than I thought. Try and hold them off. Angle the deflector shield while I make the calculations for the jump to light speed. Stay sharp! There are two more coming in, theyre going to
                                                    try to cut us off. Why dont you outrun them? I thought you said this thing was fast.
                                                </p>

                                                <p>Stay sharp! There are two more coming in, theyre going to try to cut us off. Why dont you outrun them? I thought you said this thing was fast.</p>
                                            </MinhaContaCursoTabContentStyled>

                                            <MinhaContaCursoTabContentStyled>
                                                <Title2>Dúvidas</Title2>
                                            </MinhaContaCursoTabContentStyled>
                                        </MinhaContaCursoTabsContentStyled>
                                    </MinhaContaCursoTabStyled>
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
