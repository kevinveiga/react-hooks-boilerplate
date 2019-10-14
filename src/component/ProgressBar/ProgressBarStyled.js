import styled from 'styled-components';

import { variable } from '../../style/variable';

export const BarContainerStyled = styled.div`
    border-radius: ${variable.borderRadius};
    height: 10px;
    overflow: hidden;
    width: 100%;
`;

export const BarStyled = styled.div`
    height: 100%;
`;

export const ProgressBarStyled = styled.div`
    color: ${({ color, themeColor }) => (color ? variable[color] : themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};

    ${BarContainerStyled} {
        border: 1px solid ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorGray2)};
    }

    ${BarStyled} {
        background-color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorBlack3)};
        width: ${({ progressPercent }) => (progressPercent ? `${progressPercent}%` : '0')};
    }
`;
