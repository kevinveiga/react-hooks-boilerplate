import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from './variable';

const title = css`
    ${layout};
    ${space};
    ${typography};
    color: ${({ color, themeColor }) => (themeColor === 'dark' ? (color ? variable[color] : variable.colorBlack2) : variable.colorWhite)};
    display: block;
    height: auto;
    line-height: 1.3;
    ${({ align }) => align === 'center' && 'margin-left: auto; margin-right: auto; text-align: center;'};
    ${({ align }) => align === 'right' && 'margin-left: auto; margin-right: 0; text-align: right;'};
    z-index: 3;
`;

export const P = styled.p`
    ${typography};
    color: ${({ color, themeColor }) => (themeColor === 'dark' ? (color ? variable[color] : variable.colorBlack2) : variable.colorWhite)};
`;

export const Span = styled.span`
    ${({ color }) =>
        color &&
        css`
            color: ${variable[color]};
        `};
`;

export const Title1 = styled.h1`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 38px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    margin-bottom: ${variable.spacingSM};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 48px'};
        margin-bottom: ${variable.spacingMD};
    }
`;

export const Title2 = styled.h2`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 30px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    margin-bottom: ${variable.spacingSM};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 40px'};
        margin-bottom: ${variable.spacingMD};
    }
`;

export const Title3 = styled.h3`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 22px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 400'};
    margin-bottom: ${variable.spacingXS};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 32px'};
        margin-bottom: ${variable.spacingSM};
    }
`;

export const Title4 = styled.h4`
    ${title};
    ${(fontSize) => fontSize === undefined && 'font-size: 18px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 400'};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 24px'};
    }
`;

export const Title5 = styled.h5`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 400'};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 18px'};
    }
`;
