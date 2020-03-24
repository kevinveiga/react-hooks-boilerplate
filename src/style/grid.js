import styled, { css } from 'styled-components';
import { border, flexbox, grid, layout, space, typography } from 'styled-system';

import { BgImageOverlay } from './image';
import { variable } from './variable';

export const Cell = styled.div`
    ${border};
    ${flexbox};
    ${grid};
    ${layout};
    ${space};
    ${typography};

    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : 'transparent')};
    ${({ color }) => color && `color: ${variable[color]}`};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayTransparent5};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight4};

                ${BgImageOverlay} {
                    transform: scale(1.03);

                    &::after {
                        background-color: transparent;
                    }
                }
            }
        `};
`;

export const Grid = styled.div`
    ${border};
    ${flexbox};
    ${grid};
    ${layout};
    ${space};
`;
