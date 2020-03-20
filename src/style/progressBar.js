import styled from 'styled-components';
import { display, flexbox, space, width } from 'styled-system';

import { variable } from './variable';

export const Bar = styled.div`
    height: 100%;
`;

export const BarContainer = styled.div`
    ${width};

    border-radius: calc(${variable.borderRadius} * 2);
    height: 10px;
    overflow: hidden;
    ${({ width }) => width === undefined && 'width: 100%'};
`;

export const ProgressBar = styled.div`
    ${display};
    ${flexbox};
    ${space};

    background-color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorGray : 'transparent')};
    color: ${({ color, themeColor }) => (color ? variable[color] : themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
    white-space: nowrap;

    ${BarContainer} {
        border: 1px solid ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorGray2)};
    }

    ${Bar} {
        background-color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorBlack3)};
        width: ${({ progressPercent }) => (progressPercent ? `${progressPercent}%` : '0')};
    }
`;
