import React from 'react';

import { usePagarme } from '../../store/pagarme/pagarme';

import { LoaderStyled } from './LoaderStyled';

import { Svg } from '../Svg/Svg';

export const LoaderPagarme = ({ ...props }) => {
    // CONTEXT
    const { stateLoaderPagarmeContext } = usePagarme();

    return (
        <LoaderStyled active={stateLoaderPagarmeContext} {...props}>
            <Svg name="svg-logo-loader" />
        </LoaderStyled>
    );
};
