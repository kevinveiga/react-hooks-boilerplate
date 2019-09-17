import React from 'react';

import { LoaderStyled } from './LoaderStyled';

import { Svg } from '../Svg/Svg';

export const Loader = ({ ...props }) => {
    return (
        <LoaderStyled {...props}>
            <Svg name="svg-logo-loader" />
        </LoaderStyled>
    );
};
