import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { gradientDirection } from './function';
import { variable } from './variable';

const title = css`
    ${layout};
    ${space};
    ${typography};
    color: ${({ color, themeColor }) => (color ? variable[color] : themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
    display: block;
    height: auto;
    line-height: 1.3;
    ${({ align }) => align === 'center' && 'margin-left: auto; margin-right: auto; text-align: center;'};
    ${({ align }) => align === 'right' && 'margin-left: auto; margin-right: 0; text-align: right;'};
    ${({ textTransform }) => textTransform && `text-transform: ${textTransform}`};
    z-index: 3;

    ${({ line }) =>
        line &&
        css`
            &::after {
                ${gradientDirection('-45deg')};
                content: ' ';
                display: block;
                height: 4px;
                margin-top: 5px;
                width: 70px;
            }
        `};
`;

export const P = styled.p`
    ${layout};
    ${space};
    ${typography};
    color: ${({ color, themeColor }) => (color ? variable[color] : themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
`;

export const Span = styled.span`
    ${layout};
    ${space};
    ${typography};
    ${({ color }) => color && `color: ${variable[color]}`};
`;

export const Title1 = styled.h1`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 30px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingSM}`};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 48px'};
        ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingMD}`};
    }
`;

export const Title2 = styled.h2`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 26px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingSM}`};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 40px'};
        ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingMD}`};
    }
`;

export const Title3 = styled.h3`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 20px'};
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 400'};
    ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingXS}`};

    @media (min-width: ${variable.md}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 32px'};
        ${({ mb }) => mb === undefined && `margin-bottom: ${variable.spacingSM}`};
    }
`;

export const Title4 = styled.h4`
    ${title};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 18px'};
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
