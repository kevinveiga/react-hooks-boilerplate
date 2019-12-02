import styled, { css } from 'styled-components';
import { bottom, flexbox, layout, right, space, typography } from 'styled-system';

import { variable } from './variable';

export const ListBox = styled.div`
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent1};
    color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    ${({ themeColor }) => themeColor === 'light' && ` text-shadow: 1px 1px 1px ${variable.colorBlack2}`};

    @media (min-width: ${variable.md}) {
        box-shadow: 0 2px 3px 0 ${variable.colorBlackTransparent1};
    }

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                ${ListBoxHover} {
                    opacity: 1;
                }
            }
        `};

    p {
        color: ${({ themeColor }) => (themeColor === 'light' ? variable.colorWhite : variable.colorGray2)};
        ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};

        @media (min-width: ${variable.sm}) {
            ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
        }
    }
`;

export const ListBoxHover = styled.div`
    background-color: ${variable.colorBlackTransparent8};
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity ${variable.transition};
    width: 100%;
    z-index: ${({ zindex }) => zindex || '-1'};

    p {
        color: ${variable.colorWhite};
        font-size: 18px;
        font-weight: 700;

        @media (min-width: ${variable.sm}) {
            font-size: 24px;
        }
    }
`;

export const ListLevel = styled.span`
    ${space};
    ${typography};
    vertical-align: middle;
`;

export const ListTag = styled.div`
    ${bottom};
    ${typography};
    ${right};
    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorBlack)};
    bottom: ${({ bottom }) => (bottom ? variable[bottom] : '0')};
    color: ${variable.colorWhite};
    font-size: 12px;
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    line-height: 1;
    padding: ${variable.spacingXS} 10px;
    position: absolute;
    text-transform: uppercase;
`;

export const ListTime = styled.span`
    ${space};
    ${typography};
    vertical-align: middle;
`;

export const ListTitle = styled.h2`
    ${space};
    ${typography};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 20px'};
    font-weight: 700;
    line-height: 1.2;
`;
