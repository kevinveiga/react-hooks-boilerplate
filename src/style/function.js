import { css } from 'styled-components';

import { variable } from './variable';

export const gradientDirectional = (deg = '45deg', startColor = variable.colorPrimary, startColorPercent = '0%', endColor = variable.colorSecondary, endColorPercent = '100%') => {
    return css`
        background-image: -webkit-linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent}); // Safari 5.1-6, Chrome 10+
        background-image: -o-linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent}); // Opera 12
        background-image: linear-gradient(${deg}, ${startColor} ${startColorPercent}, ${endColor} ${endColorPercent}); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
        background-repeat: repeat-x;
    `;
};

export const gradientRadial = (innerColor = variable.colorPrimary, outerColor = variable.colorSecondary) => {
    return css`
        background-image: -webkit-radial-gradient(circle, ${innerColor}, ${outerColor});
        background-image: radial-gradient(circle, ${innerColor}, ${outerColor});
        background-repeat: no-repeat;
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
