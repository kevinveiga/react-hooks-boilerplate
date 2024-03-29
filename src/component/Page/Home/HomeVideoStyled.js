import styled, { css } from 'styled-components';
import { border, space } from 'styled-system';

import { scrollbar } from '../../../style/function';
import { Grid } from '../../../style/grid';
import { variable } from '../../../style/variable';

export const VideoBoxStyled = styled.div`
    ${space};

    background-color: ${({ themeColor }) => (themeColor === 'dark' ? variable.colorGrayDark : variable.colorWhite)};

    p {
        color: ${variable.colorGray2};
    }
`;

export const VideoGridStyled = styled(Grid)`
    background-color: ${variable.colorWhite};
`;

export const VideoItemStyled = styled.li`
    ${border};
    ${space};

    cursor: pointer;
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${({ active }) =>
        active &&
        css`
            background-color: ${variable.colorGrayLight3};
        `};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayLight3};
                box-shadow: inset 0 -1px 0 1px ${variable.colorGrayLight4};
            }
        `};

    p {
        color: ${variable.colorGray2};
        font-size: 14px;
        margin-bottom: 0;
    }
`;

export const VideoListStyled = styled.ul`
    ${scrollbar(variable.colorPrimary, variable.colorWhite)};

    max-height: 440px;
    overflow-y: auto;

    @media (min-width: ${variable.md}) {
        max-height: 540px;
    }
`;
