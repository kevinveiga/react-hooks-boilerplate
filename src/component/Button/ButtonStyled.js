import styled, { css } from 'styled-components';
import { borderRadius, layout, position, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

const linkLine = css`
    &::after {
        bottom: 0;
        content: ' ';
        display: block;
        height: 3px;
        margin: 5px auto auto auto;
        transition: background-color ${variable.transition}, width ${variable.transition};
        width: 0;
    }
`;

export const ButtonStyled = styled.button`
    ${borderRadius};
    ${layout};
    ${position};
    ${space};
    ${typography};

    ${({ borderRadius }) => borderRadius === undefined && `border-radius: ${variable.borderRadius}`};
    cursor: pointer;
    ${({ fontWeight }) => fontWeight === undefined && 'font-weight: 700'};
    ${({ textAlign }) => textAlign === undefined && 'text-align: center'};
    ${({ textDecoration }) => textDecoration && `text-decoration: ${textDecoration}`};
    transition: background-color ${variable.transition}, border ${variable.transition}, color ${variable.transition};
    ${({ verticalAlign }) => verticalAlign === undefined && 'vertical-align: middle'};
    white-space: nowrap;
    ${({ width }) => width === undefined && 'width: auto'};

    ${({ disabled }) =>
        disabled === true &&
        css`
            cursor: not-allowed;
            opacity: 0.3;
        `}

    ${({ obj }) =>
        obj &&
        obj.activeColor &&
        css`
            &.active {
                color: ${variable[obj.activeColor]};

                > span {
                    color: ${variable[obj.activeColor]};
                }

                > svg {
                    fill: ${variable[obj.activeColor]};
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.hoverColor &&
        css`
            &:hover {
                color: ${variable[obj.hoverColor]};

                > span {
                    color: ${variable[obj.hoverColor]};
                }

                > svg {
                    fill: ${variable[obj.hoverColor]};
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.hoverColorLine &&
        css`
            ${linkLine};
            &:hover {
                &::after {
                    background-color: ${variable[obj.hoverColorLine]};
                    width: 50%;
                }
            }
        `};

    ${({ themeSize }) =>
        themeSize === undefined &&
        css`
            ${({ height }) => height === undefined && `height: ${variable.buttonHeight}`};
            min-width: ${({ minWidth }) => minWidth || '220px'};
            ${({ pl }) => pl === undefined && `padding-left: ${variable.buttonPadding}`};
            ${({ pr }) => pr === undefined && `padding-right: ${variable.buttonPadding}`};
        `};

    ${({ themeSize }) =>
        themeSize === 'none' &&
        css`
            ${({ height }) => height === undefined && 'height: auto'};
            ${({ pl }) => pl === undefined && 'padding-left: 0'};
            ${({ pr }) => pr === undefined && 'padding-right: 0'};
        `};

    ${({ themeSize }) =>
        themeSize === 'small' &&
        css`
            ${({ height }) => height === undefined && `height: ${variable.buttonHeight}`};
            min-width: ${({ minWidth }) => minWidth || '120px'};
            ${({ pl }) => pl === undefined && 'padding-left: 1vw'};
            ${({ pr }) => pr === undefined && 'padding-right: 1vw'};
        `};

    ${({ themeType }) =>
        themeType === undefined &&
        css`
            background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorPrimary)};
            color: ${({ color }) => (color ? variable[color] : variable.colorSecondary)};
            ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
            text-transform: ${({ textTransform }) => textTransform || 'uppercase'};

            svg {
                fill: ${variable.colorSecondary};
            }
        `};

    ${({ disabled, themeType }) =>
        !disabled &&
        themeType === undefined &&
        css`
            @media (min-width: ${variable.lg}) {
                &:active,
                &:hover {
                    background-color: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};
                    color: ${variable.colorWhite};

                    svg {
                        fill: ${variable.colorWhite};
                    }
                }
            }
        `}

    ${({ active, themeType }) =>
        active &&
        themeType === undefined &&
        css`
            @media (min-width: ${variable.lg}) {
                background-color: ${variable.colorPrimaryHover};
                color: ${variable.colorWhite};

                svg {
                    fill: ${variable.colorWhite};
                }
            }
        `};

    ${({ themeType }) =>
        themeType === 'border' &&
        css`
            background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : 'transparent')};
            border: 2px solid ${({ borderColor }) => (borderColor ? variable[borderColor] : variable.colorPrimary)};
            color: ${({ color }) => (color ? variable[color] : variable.colorPrimary)};
            ${({ fontSize }) => fontSize === undefined && 'font-size: 16px'};
            text-transform: ${({ textTransform }) => textTransform || 'capitalize'};

            svg {
                fill: ${variable.colorPrimary};
            }
        `};

    ${({ disabled, themeType }) =>
        !disabled &&
        themeType === 'border' &&
        css`
            @media (min-width: ${variable.lg}) {
                &:active,
                &:hover {
                    background-color: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};
                    border: 2px solid ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};
                    color: ${variable.colorWhite};

                    svg {
                        fill: ${variable.colorWhite};
                    }
                }
            }
        `}

    ${({ themeType }) =>
        themeType === 'none' &&
        css`
            background-color: transparent;
            ${({ color }) => color && `color: ${variable[color]}`};
            ${({ display }) => display === undefined && 'display: inline'};
        `};

    ${({ disabled, themeType }) =>
        !disabled &&
        themeType === 'none' &&
        css`
            @media (min-width: ${variable.lg}) {
                &:active,
                &:hover {
                    color: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};

                    svg {
                        fill: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};
                    }
                }
            }
        `}

    ${({ active, themeType }) =>
        active &&
        themeType === 'border' &&
        css`
            @media (min-width: ${variable.lg}) {
                background-color: ${variable.colorPrimaryHover};
                border: 2px solid ${variable.colorPrimaryHover};
                color: ${variable.colorWhite};

                svg {
                    fill: ${variable.colorWhite};
                }
            }
        `};
`;
