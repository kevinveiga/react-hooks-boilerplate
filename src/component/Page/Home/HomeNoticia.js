import React, { useEffect } from 'react';

import { apiUrlHome } from '../../../config';

import { useNoticiaApi } from '../../../service/noticia';

import { useHome } from '../../../store/home/home';

import { IntersectionObserver } from '../../IntersectionObserver/IntersectionObserver';
import { LinkTo } from '../../Link/LinkTo';
import { LoaderPlaceholder } from '../../Loader/LoaderPlaceholder';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { NoticiaBoxAuthorStyled, NoticiaBoxDateTimeStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from '../Noticia/NoticiaBoxStyled';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';

export const HomeNoticia = () => {
    // API
    const [stateNoticias] = useNoticiaApi(`${apiUrlHome}/ultimas_noticias`, {});

    const noticiasLength = stateNoticias.data && stateNoticias.data.length;

    // ACTION
    const [stateDataLength, changeDataLength] = useHome();

    // Retornando length de Data para o parent
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (noticiasLength > 0) {
            changeDataLength({ homeNoticiaLength: noticiasLength });
        }
    }, [noticiasLength]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <Grid display="grid">
            {noticiasLength > 0 ? (
                stateNoticias.data.slice(0, 4).map((noticia, i, newArray) => {
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
                })
            ) : (
                <LoaderPlaceholder />
            )}
        </Grid>
    );
};
