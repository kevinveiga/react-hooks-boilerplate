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
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayLight3};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight};

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
