import React from 'react';

import { CarouselDotBtnStyled, CarouselDotListStyled, CarouselNextBtnStyled, CarouselPrevBtnStyled } from './CarouselButtonStyled';

import { Svg } from '../Svg/Svg';

export const DotBtn = ({ ...props }) => {
    return <CarouselDotBtnStyled {...props} />;
};

export const DotContainer = ({ ...props }) => {
    return <CarouselDotListStyled {...props} />;
};

export const NextBtn = ({ ...props }) => {
    return (
        <CarouselNextBtnStyled {...props}>
            <Svg name="svg-arrow-right" />
        </CarouselNextBtnStyled>
    );
};

export const PrevBtn = ({ ...props }) => {
    return (
        <CarouselPrevBtnStyled {...props}>
            <Svg name="svg-arrow-left" />
        </CarouselPrevBtnStyled>
    );
};
