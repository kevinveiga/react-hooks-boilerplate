import React, { useEffect } from 'react';

import { apiUrlHome } from '../../../config';

import { useDestaqueApi } from '../../../service/destaque';

import { useHome } from '../../../store/home/home';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { LoaderPlaceholder } from '../../Loader/LoaderPlaceholder';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { NoticiaBoxAuthorStyled, NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from '../Noticia/NoticiaBoxStyled';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';

export const HomeDestaque = () => {
    // API
    const stateDestaques = useDestaqueApi(`${apiUrlHome}/destaques`);

    const destaquesLength = stateDestaques.data && stateDestaques.data.length;

    // ACTION
    const [stateDataLength, changeDataLength] = useHome();

    // Retornando length de Data para o parent
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (destaquesLength > 0) {
            changeDataLength({ homeDestaqueLength: destaquesLength });
        }
    }, [destaquesLength]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <Grid display="grid">
            {destaquesLength > 0 ? (
                stateDestaques.data.slice(0, 4).map((noticia, i, newArray) => {
                    return i === 0 ? (
                        <Cell borderBottom="1px solid rgba(216, 221, 225, 0.8)" display="flex" hover="true" key={noticia.id} pb={3}>
                            <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                <Box height="300px" mb={4} overflow="hidden" width="100%">
                                    <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                </Box>

                                <NoticiaBox color={noticia.category.featured_color} display="inline-block" themeColor="dark" verticalAlign="middle">
                                    <Box>
                                        <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                        <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                    </Box>

                                    <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
                                </NoticiaBox>
                            </LinkTo>
                        </Cell>
                    ) : (
                        <Cell
                            borderBottom={newArray.length === i + 1 ? '0' : '1px solid rgba(216, 221, 225, 0.8)'}
                            display="flex"
                            hover="true"
                            key={noticia.id}
                            pb={3}
                            pt={4}
                        >
                            <LinkTo ariaLabel={noticia.title} height="100%" to={`/noticia/${noticia.slug}`} width="100%">
                                <NoticiaBox
                                    color={noticia.category.featured_color}
                                    display="inline-block"
                                    pr={{ d: 1, sm: 4 }}
                                    themeColor="dark"
                                    verticalAlign="middle"
                                    width={{ d: 3 / 5, lg: 4 / 5 }}
                                >
                                    <Box>
                                        <NoticiaBoxTagStyled>{noticia.category.title}</NoticiaBoxTagStyled>

                                        <NoticiaBoxTitleStyled>{noticia.title}</NoticiaBoxTitleStyled>
                                    </Box>

                                    <NoticiaBoxAuthorStyled>{`Por ${noticia.author}`}</NoticiaBoxAuthorStyled>
                                </NoticiaBox>

                                <Box display="inline-block" height="100px" overflow="hidden" verticalAlign="middle" width={{ d: 2 / 5, lg: 1 / 5 }}>
                                    <BgImageLazyLoad key={noticia.id} url={noticia.thumbnail.attachment.url} />
                                </Box>
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
