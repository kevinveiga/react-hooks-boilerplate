import styled, { css } from 'styled-components';
import { border, boxShadow, flexbox, layout, position, space, typography } from 'styled-system';

import { scrollbarAlternate, scrollbarInvisible } from './function';
import { BgImageOverlay } from './image';
import { variable } from './variable';

export const Box = styled.div`
    ${border};
    ${boxShadow};
    ${flexbox};
    ${layout};
    ${position};
    ${space};
    ${typography};
    ${({ obj }) => (obj && obj.scrollbarInvisible ? scrollbarInvisible() : scrollbarAlternate())};

    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : 'transparent')};
    ${({ color, themeColor }) =>
        color
            ? `color: ${variable[color]}`
            : themeColor === 'light'
            ? `color: ${variable.colorWhite}`
            : themeColor === 'dark' && `color: ${variable.colorBlack2}`};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition}, width ${variable.transition};
    ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace}`};

    ${({ focus }) =>
        focus &&
        css`
            :focus-within {
                color: ${variable.colorGreen};
            }
        `};

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
    ${position};
    ${space};
    ${typography};
`;
