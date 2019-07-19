import styled, { css } from 'styled-components';
import { space, typography } from 'styled-system';

import { variable } from './variable';

const title = css`
    ${space};
    ${typography};
    color: ${(props) => (props.themeColor === 'dark' ? (props.color ? variable[props.color] : variable.colorBlack2) : variable.colorWhite)};
    display: block;
    height: auto;
    line-height: 1.3;
    ${(props) => props.align === 'center' && 'margin-left: auto; margin-right: auto; text-align: center;'};
    ${(props) => props.align === 'right' && 'margin-left: auto; margin-right: 0; text-align: right;'};
    width: auto;
    z-index: 3;
`;

export const Span = styled.span`
    ${(props) =>
        props.color &&
        css`
            color: ${variable[props.color]};
        `};
`;

export const Title1 = styled.h1`
    ${title};
    ${(props) => props.fontSize === undefined && 'font-size: 38px'};
    ${(props) => props.fontWeight === undefined && 'font-weight: 700'};
    margin-bottom: ${variable.spacingSM};

    @media (min-width: ${variable.md}) {
        ${(props) => props.fontSize === undefined && 'font-size: 48px'};
        margin-bottom: ${variable.spacingMD};
    }
`;

export const Title2 = styled.h2`
    ${title};
    ${(props) => props.fontSize === undefined && 'font-size: 30px'};
    ${(props) => props.fontWeight === undefined && 'font-weight: 700'};
    margin-bottom: ${variable.spacingSM};

    @media (min-width: ${variable.md}) {
        ${(props) => props.fontSize === undefined && 'font-size: 40px'};
        margin-bottom: ${variable.spacingMD};
    }
`;

export const Title3 = styled.h3`
    ${title};
    ${(props) => props.fontSize === undefined && 'font-size: 22px'};
    ${(props) => props.fontWeight === undefined && 'font-weight: 400'};
    margin-bottom: ${variable.spacingXS};

    @media (min-width: ${variable.md}) {
        ${(props) => props.fontSize === undefined && 'font-size: 32px'};
        margin-bottom: ${variable.spacingSM};
    }
`;

export const Title4 = styled.h4`
    ${title};
    ${(props) => props.fontSize === undefined && 'font-size: 18px'};
    ${(props) => props.fontWeight === undefined && 'font-weight: 400'};

    @media (min-width: ${variable.md}) {
        ${(props) => props.fontSize === undefined && 'font-size: 24px'};
    }
`;

export const Title5 = styled.h5`
    ${title};
    ${(props) => props.fontSize === undefined && 'font-size: 16px'};
    ${(props) => props.fontWeight === undefined && 'font-weight: 400'};

    @media (min-width: ${variable.md}) {
        ${(props) => props.fontSize === undefined && 'font-size: 18px'};
    }
`;
