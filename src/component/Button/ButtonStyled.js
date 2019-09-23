import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const ButtonStyled = styled.button`
    ${layout};
    ${space};
    ${typography};
    border-radius: ${variable.borderRadius};
    cursor: pointer;
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 600'};
    ${({ height }) => height === undefined && `height: ${variable.buttonHeight}`};
    ${({ textAlign }) => textAlign === undefined && 'text-align: center'};
    transition: background-color ${variable.transition}, border ${variable.transition}, color ${variable.transition};
    vertical-align: middle;
    white-space: nowrap;
    ${({ width }) => width === undefined && 'width: auto'};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;

        &:active,
        &:hover {
            background-color: ${variable.colorGrayLight2};
        }
    }

    ${({ themeSize }) =>
        themeSize === undefined &&
        css`
            min-width: ${({ minWidth }) => minWidth || '220px'};
            ${({ pl }) => pl === undefined && `padding-left: ${variable.buttonPadding}`};
            ${({ pr }) => pr === undefined && `padding-right: ${variable.buttonPadding}`};
        `};

    ${({ themeSize }) =>
        themeSize === 'small' &&
        css`
            min-width: ${({ minWidth }) => minWidth || '100px'};
            ${({ pl }) => pl === undefined && 'padding-left: 1vw'};
            ${({ pr }) => pr === undefined && 'padding-right: 1vw'};
        `};

    ${({ themeType }) =>
        themeType === undefined &&
        css`
            background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorPrimary)};
            color: ${({ color }) => (color ? variable[color] : variable.colorSecondary)};
            ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
            ${({ textTransform }) => textTransform === undefined && 'text-transform: uppercase'};

            &:active,
            &:hover {
                background-color: ${variable.colorPrimaryHover};
                color: ${variable.colorWhite};

                svg {
                    fill: ${variable.colorWhite};
                }
            }

            svg {
                fill: ${variable.colorSecondary};
            }
        `};

    ${({ active, themeType }) =>
        active &&
        themeType === undefined &&
        css`
            background-color: ${variable.colorPrimaryHover};
            color: ${variable.colorWhite};

            svg {
                fill: ${variable.colorWhite};
            }
        `};

    ${({ themeType }) =>
        themeType === 'border' &&
        css`
            background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : 'transparent')};
            border: 2px solid ${variable.colorPrimary};
            color: ${({ color }) => (color ? variable[color] : variable.colorPrimary)};
            ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
            ${({ textTransform }) => textTransform === undefined && 'text-transform: capitalize'};

            &:active,
            &:hover {
                background-color: ${variable.colorPrimaryHover};
                border: 2px solid ${variable.colorPrimaryHover};
                color: ${variable.colorWhite};

                svg {
                    fill: ${variable.colorWhite};
                }
            }

            svg {
                fill: ${variable.colorPrimary};
            }
        `};

    ${({ active, themeType }) =>
        active &&
        themeType === 'border' &&
        css`
            background-color: ${variable.colorPrimaryHover};
            border: 2px solid ${variable.colorPrimaryHover};
            color: ${variable.colorWhite};

            svg {
                fill: ${variable.colorWhite};
            }
        `};
`;
