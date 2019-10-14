import React from 'react';

import { BarStyled, BarContainerStyled, ProgressBarStyled } from './ProgressBarStyled';

import { P } from '../../style/text';

export const ProgressBar = ({ progressPercent }) => {
    return (
        <ProgressBarStyled progressPercent={progressPercent}>
            <P mb={1}>Progresso {progressPercent}%</P>

            <BarContainerStyled>
                <BarStyled />
            </BarContainerStyled>
        </ProgressBarStyled>
    );
};
