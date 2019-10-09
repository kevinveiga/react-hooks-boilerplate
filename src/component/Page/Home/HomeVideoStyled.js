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

export const VideoUlStyled = styled.ul`
    ${scrollbar(variable.colorPrimary, variable.colorWhite)};
    max-height: 540px;
    overflow-y: auto;
`;

export const VideoLiStyled = styled.li`
    ${border};
    ${space};
    cursor: pointer;
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${({ active }) =>
        active &&
        css`
            background-color: ${variable.colorGrayHover};
        `};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayHover};
                box-shadow: inset 0 -1px 0 1px ${variable.colorGrayLight};
            }
        `};

    p {
        color: ${variable.colorGray2};
        font-size: 14px;
        margin-bottom: 0;
    }
`;
