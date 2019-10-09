import styled from 'styled-components';
import { flexbox, layout, space, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const NoticiaBoxAuthorStyled = styled.h5`
    display: block;
    font-weight: 400;
    margin-bottom: 10px;
`;

export const NoticiaBoxDateTimeStyled = styled.span`
    ${typography};
    color: ${({ color, themeColor }) => (themeColor === 'light' ? (color ? variable[color] : variable.colorWhite) : color ? variable[color] : variable.colorGray2)};
    display: inline-block;
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    font-weight: 400;
    margin-bottom: ${variable.spacingXS};
    margin-top: ${variable.spacingXS};
`;

export const NoticiaBoxTagStyled = styled.div`
    color: ${variable.colorWhite};
    display: table;
    line-height: 1;
    margin-bottom: ${variable.spacingSM};
    margin-top: ${variable.spacingXS};
    padding: ${variable.spacingXS};
`;

export const NoticiaBoxTextStyled = styled.p`
    ${layout};
`;

export const NoticiaBoxTitleStyled = styled.h2`
    ${typography};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${variable.spacingSM};

    @media (min-width: ${variable.sm}) {
        ${({ fontSize }) => fontSize === undefined && 'font-size: 24px'};
    }
`;

export const NoticiaBoxStyled = styled.div`
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    ${({ overflow }) => overflow && `overflow: ${overflow}`};
    ${({ themeColor }) => themeColor === 'light' && ` text-shadow: 1px 1px 1px ${variable.colorBlack2}`};

    p {
        color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorGray2)};
        ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
        line-height: 1.8;
        margin-bottom: 0;
    }

    ${NoticiaBoxAuthorStyled} {
        color: ${({ color, themeColor }) => (themeColor === 'light' ? (color === 'colorBlueDark' ? variable.colorWhite : variable[color]) : variable[color])};
        ${({ fontSize }) => fontSize === undefined && 'font-size: 12px'};

        @media (min-width: ${variable.sm}) {
            ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
        }
    }

    ${NoticiaBoxTagStyled} {
        background-color: ${({ color }) => (color ? variable[color] : 'transparent')};
        text-shadow: none;
    }
`;
