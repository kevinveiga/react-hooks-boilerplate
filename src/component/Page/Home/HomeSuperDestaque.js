import React, { useEffect } from 'react';

import Slider from 'react-slick';

import { apiUrlHome } from '../../../config';

import { useSuperDestaqueApi } from '../../../service/superDestaque';

import { useHome } from '../../../store/home/home';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { groupByMod } from '../../../util/groupBy';

import { DotBtn, DotContainer, NextBtn, PrevBtn } from '../../Carousel/CarouselButton';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { LoaderPlaceholder } from '../../Loader/LoaderPlaceholder';
import { NoticiaBox } from '../Noticia/NoticiaBox';

import { BannerCellStyled, BannerContainerStyled } from '../../Banner/BannerStyled';
import { CarouselStyled } from '../../Carousel/CarouselStyled';
import { NoticiaBoxTagStyled, NoticiaBoxTitleStyled } from '../Noticia/NoticiaBoxStyled';

import { Box } from '../../../style/flex';
import { variable } from '../../../style/variable';

export const HomeSuperDestaque = () => {
    // API
    const stateSuperDestaques = useSuperDestaqueApi(`${apiUrlHome}/super_destaques`);

    const superDestaquesLength = stateSuperDestaques.data && stateSuperDestaques.data.length;

    // CONTEXT
    const { changeDataLengthContext } = useHome();

    // ACTION
    const windowWidth = useWindowWidth();

    // Retornando length de Data para o parent
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (superDestaquesLength > 0) {
            changeDataLengthContext({ homeSuperDestaqueLength: superDestaquesLength });
        }
    }, [superDestaquesLength]);
    /* eslint-enable react-hooks/exhaustive-deps */

    // Agrupando itens com um grupo de 3
    const objectItens = superDestaquesLength > 0 ? groupByMod(stateSuperDestaques.data, 3) : {};

    // CAROUSEL
    const carouselOptions = {
        appendDots: (dots) => <DotContainer>{dots}</DotContainer>,
        autoplay: true,
        autoplaySpeed: 4250,
        customPaging: () => <DotBtn />,
        dots: true,
        infinite: true,
        nextArrow: <NextBtn />,
        pauseOnHover: true,
        prevArrow: <PrevBtn />,
        speed: 1250,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false
    };

    return superDestaquesLength > 0 ? (
        windowWidth < parseInt(variable.md, 10) ? (
            <BannerContainerStyled display="grid" gridAutoColumns="90%" gridAutoRows="minmax(300px, 50vh)">
                {stateSuperDestaques.data.map((item) => {
                    return (
                        <BannerCellStyled display="flex" gridRow={1} hover="true" key={item.id}>
                            <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                <NoticiaBox
                                    alignItems="flex-end"
                                    color={item.category.featured_color}
                                    display="flex"
                                    flexWrap="wrap"
                                    height="100%"
                                    overflow="hidden"
                                    p={{ d: 2, sm: 3, md: 4 }}
                                    themeColor="light"
                                    verticalAlign="middle"
                                    width="100%"
                                >
                                    <BgImageLazyLoad
                                        filter="grayscale(100%)"
                                        key={item.id}
                                        overlayColor="colorBlackTransparent3"
                                        url={item.thumbnail.attachment.url}
                                    />

                                    <Box>
                                        <NoticiaBoxTagStyled>{item.category.title}</NoticiaBoxTagStyled>

                                        <NoticiaBoxTitleStyled fontSize={{ d: '24px', md: '32px' }}>{item.title}</NoticiaBoxTitleStyled>

                                        <span>{`Por ${item.author}`}</span>
                                    </Box>
                                </NoticiaBox>
                            </LinkTo>
                        </BannerCellStyled>
                    );
                })}
            </BannerContainerStyled>
        ) : (
            <CarouselStyled>
                <Slider {...carouselOptions}>
                    {Object.keys(objectItens).map((key) => {
                        const group = objectItens[key];

                        return (
                            <div key={key}>
                                <BannerContainerStyled
                                    key={key}
                                    display="grid"
                                    gridAutoColumns="1fr"
                                    gridAutoRows={{
                                        d: 'minmax(300px, 50vh)',
                                        md: superDestaquesLength > 2 ? 'minmax(200px, 30vh)' : 'minmax(300px, 50vh)'
                                    }}
                                >
                                    {group.map((item, i, newArray) => {
                                        let row = {};

                                        if (i === 0) {
                                            row = { d: 1, md: newArray.length > 0 ? '1 / span 2' : 1 };
                                        }

                                        if (i === 1) {
                                            row = { d: 1, md: newArray.length === 2 ? '1 / span 2' : 1 };
                                        }

                                        if (i === 2) {
                                            row = { d: 1, md: 2 };
                                        }

                                        return (
                                            <BannerCellStyled display="flex" gridRow={row} hover="true" key={item.id}>
                                                <LinkTo ariaLabel={item.title} display="flex" height="100%" to={`/noticia/${item.slug}`} width="100%">
                                                    <NoticiaBox
                                                        alignItems="flex-end"
                                                        color={item.category.featured_color}
                                                        display="flex"
                                                        flexWrap="wrap"
                                                        height="100%"
                                                        overflow="hidden"
                                                        p={{ d: 2, sm: 3, md: 4 }}
                                                        themeColor="light"
                                                        verticalAlign="middle"
                                                        width="100%"
                                                    >
                                                        <BgImageLazyLoad
                                                            filter="grayscale(100%)"
                                                            key={item.id}
                                                            overlayColor="colorBlackTransparent3"
                                                            url={item.thumbnail.attachment.url}
                                                        />

                                                        <Box>
                                                            <NoticiaBoxTagStyled>{item.category.title}</NoticiaBoxTagStyled>

                                                            <NoticiaBoxTitleStyled fontSize={{ d: '24px', md: '32px' }}>
                                                                {item.title}
                                                            </NoticiaBoxTitleStyled>

                                                            <span>{`Por ${item.author}`}</span>
                                                        </Box>
                                                    </NoticiaBox>
                                                </LinkTo>
                                            </BannerCellStyled>
                                        );
                                    })}
                                </BannerContainerStyled>
                            </div>
                        );
                    })}
                </Slider>
            </CarouselStyled>
        )
    ) : (
        <LoaderPlaceholder />
    );
};
