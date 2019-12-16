import React from 'react';

import { apiUrlHome } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { useMeasure } from '../../../store/util/measure';

import { BannerPerfilInvestidor } from '../../Banner/BannerPerfilInvestidor';
import { LinkTo } from '../../Link/LinkTo';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { NoticiaBoxAuthorStyled, NoticiaBoxDateTimeStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from '../Noticia/NoticiaBoxStyled';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Title4 } from '../../../style/text';

const HomeNoticia = () => {
    // API
    const [stateNoticias] = useNoticiaApi(`${apiUrlHome}/ultimas_noticias`, {});

    const noticiasLength = stateNoticias.data && stateNoticias.data.length;

    // ACTION
    const [stateBannerRef, stateBannerMeasure] = useMeasure(true);

    return (
        noticiasLength > 0 && (
            <>
                <Box mb={5} px={{ d: 0, sm: 3 }} width={{ d: 1, sm: 'calc(100% - 321px)', md: 'calc(40% - (321px / 2))' }}>
                    <Title4 color="colorGray2" fontWeight="700" themeColor="dark">
                        Últimas
                    </Title4>

                    <Grid display="grid">
                        {stateNoticias.data.slice(0, 4).map((noticia, i, newArray) => {
                            return (
                                <Cell borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'} display="flex" hover="true" key={noticia.id} pb={3} pt={4}>
                                    <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                        <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                            <Box>
                                                <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                                <NoticiaBoxTitleStyled fontSize={18}>{noticia.title}</NoticiaBoxTitleStyled>

                                                <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>

                                                <NoticiaBoxDateTimeStyled themeColor="dark">{noticia.date}</NoticiaBoxDateTimeStyled>
                                            </Box>
                                        </NoticiaBox>
                                    </LinkTo>
                                </Cell>
                            );
                        })}
                    </Grid>
                </Box>

                <Box display={{ d: 'none', sm: 'block' }} pl={{ d: 0, sm: 3 }} ref={stateBannerRef} width="321px">
                    <BannerPerfilInvestidor
                        boxMeasure={stateBannerMeasure}
                        boxMeasurePadding={16}
                        elementChange={{ elementId: 'home-noticias-container', offset: -20 }}
                        elementFadeOut={{ elementId: 'home-video-container', offset: -500 }}
                    />
                </Box>
            </>
        )
    );
};

export default HomeNoticia;
