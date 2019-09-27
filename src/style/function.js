import { css } from 'styled-components';

import { variable } from './variable';

export const gradientDirectional = (deg = '45deg', startColor = variable.colorPrimary, startColorPercent = '0%', endColor = variable.colorSecondary, endColorPercent = '100%') => {
    return css`
        background-image: linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
        background-repeat: repeat-x;
    `;
};

export const gradientDirectionalRepeat = (deg = '45deg', startColor = variable.colorPrimary, startColorPercent = '0%', endColor = variable.colorSecondary, endColorPercent = '100%') => {
    return css`
        background-image: repeating-linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
    `;
};

export const gradientRadial = (startColor = variable.colorPrimary, startColorPercent = '0%', endColor = variable.colorSecondary, endColorPercent = '100%') => {
    return css`
        background-image: radial-gradient(circle, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent});
    `;
};

export const gradientRadialRepeat = (startColor = variable.colorPrimary, startColorPercent = '0%', endColor = variable.colorSecondary, endColorPercent = '100%') => {
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
            height: ${scrollbarSize};
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
            height: 50px;
        }

        &::-webkit-scrollbar-track {
            background-color: ${variable.colorWhite};
        }

        &::-webkit-scrollbar-track-piece {
            background-color: ${colorSecondary};
            margin: 0;
        }
    `;
};
