import React from 'react';

import { DotBtnStyled, DotContainerStyled, NextBtnStyled, PrevBtnStyled } from './CarouselButtonStyled';

import { Svg } from '../Svg/Svg';

export const DotBtn = ({ ...props }) => {
    return <DotBtnStyled {...props} />;
};

export const DotContainer = ({ ...props }) => {
    return <DotContainerStyled {...props} />;
};

export const NextBtn = ({ ...props }) => {
    return (
        <NextBtnStyled {...props}>
            <Svg name="svg-arrow-right" />
        </NextBtnStyled>
    );
};

export const PrevBtn = ({ ...props }) => {
    return (
        <PrevBtnStyled {...props}>
            <Svg name="svg-arrow-left" />
        </PrevBtnStyled>
    );
};
