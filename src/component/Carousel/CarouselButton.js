import React from 'react';

import { CarouselDotBtnStyled, CarouselDotContainerStyled, CarouselNextBtnStyled, CarouselPrevBtnStyled } from './CarouselButtonStyled';

import { Svg } from '../Svg/Svg';

export const DotBtn = ({ ...props }) => {
    return <CarouselDotBtnStyled {...props} />;
};

export const DotContainer = ({ ...props }) => {
    return <CarouselDotContainerStyled {...props} />;
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
