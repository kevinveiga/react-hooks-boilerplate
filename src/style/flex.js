import styled, { css } from 'styled-components';
import { border, flexbox, layout, space, typography } from 'styled-system';

import { scrollbarAlternate } from './function';
import { BgImageOverlay } from './image';
import { variable } from './variable';

export const Box = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    ${scrollbarAlternate()};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition}, width ${variable.transition};

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

export const Flex = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
`;
