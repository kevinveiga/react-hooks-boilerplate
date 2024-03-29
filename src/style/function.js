import { css } from 'styled-components';

import { variable } from './variable';

export const gradientDirection = (
    deg = '45deg',
    startColor = variable.colorPrimary,
    startColorPercent = '0%',
    endColor = variable.colorSecondary,
    endColorPercent = '100%'
) => {
    return css`
        background-image: linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
        background-repeat: repeat-x;
    `;
};

export const gradientDirectionRepeat = (
    deg = '45deg',
    startColor = variable.colorPrimary,
    startColorPercent = '0%',
    endColor = variable.colorSecondary,
    endColorPercent = '100%'
) => {
    return css`
        background-image: repeating-linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
    `;
};

export const gradientRadial = (
    startColor = variable.colorPrimary,
    startColorPercent = '0%',
    endColor = variable.colorSecondary,
    endColorPercent = '100%'
) => {
    return css`
        background-image: radial-gradient(circle, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
    `;
};

export const gradientRadialRepeat = (
    startColor = variable.colorPrimary,
    startColorPercent = '0%',
    endColor = variable.colorSecondary,
    endColorPercent = '100%'
) => {
    return css`
        background-image: repeating-radial-gradient(circle, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
    `;
};

export const letterSpacing = (value = '0', align = '') => {
    return css`
        letter-spacing: ${value};
        ${align === 'center' && `padding-left: ${value};`}
        ${align === 'right' && `margin-right: -${value};`}
    `;
};

export const scrollbar = (colorPrimary = variable.colorPrimary, colorSecondary = variable.colorSecondary, scrollbarSize = '8px') => {
    return css`
        &::-webkit-scrollbar {
            height: 100%;
            width: ${scrollbarSize};
        }

        &::-webkit-scrollbar-button {
            background-color: ${colorSecondary};
            display: none;
        }

        &::-webkit-scrollbar-corner {
            background-color: ${colorSecondary};
        }

        &::-webkit-resizer {
            background-color: ${colorSecondary};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${colorPrimary};
            height: auto;
        }

        &::-webkit-scrollbar-track {
            background-color: ${variable.colorWhite};
        }

        &::-webkit-scrollbar-track-piece {
            background-color: transparent;
            margin: 0;
        }
    `;
};

export const scrollbarAlternate = (colorPrimary = variable.colorGrayLight, colorSecondary = variable.colorWhite, scrollbarSize = '6px') => {
    return css`
        &::-webkit-scrollbar {
            height: 100%;
            width: ${scrollbarSize};
        }

        &::-webkit-scrollbar-button {
            background-color: ${colorSecondary};
            display: none;
        }

        &::-webkit-scrollbar-corner {
            background-color: ${colorSecondary};
        }

        &::-webkit-resizer {
            background-color: ${colorSecondary};
        }

        &::-webkit-scrollbar-thumb {
            background-color: ${colorPrimary};
            border-radius: 10px;
            height: auto;
        }

        &::-webkit-scrollbar-track {
            background-color: ${colorSecondary};
            border-radius: 10px;
            box-shadow: inset 0 0 0 0 transparent;
        }

        &::-webkit-scrollbar-track-piece {
            background-color: transparent;
            margin: 0;
        }
    `;
};

export const scrollbarInvisible = () => {
    return css`
        &::-webkit-scrollbar {
            height: 100%;
            width: 0;
        }

        &::-webkit-scrollbar-button {
            background-color: transparent;
            display: none;
        }

        &::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        &::-webkit-resizer {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            height: 0;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-track-piece {
            background-color: transparent;
            margin: 0;
        }
    `;
};
