import React from 'react';

import { DotContainerStyled, NextBtnStyled, PrevBtnStyled } from './CarouselButtonStyled';

export const DotContainer = ({ ...props }) => {
    return <DotContainerStyled {...props} />;
};

export const NextBtn = ({ ...props }) => {
    return <NextBtnStyled {...props} />;
};

export const PrevBtn = ({ ...props }) => {
    return <PrevBtnStyled {...props} />;
};
