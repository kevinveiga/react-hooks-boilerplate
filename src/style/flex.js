import styled, { css } from 'styled-components';
import { border, flexbox, layout, space, typography } from 'styled-system';

import { BgImageOverlay1, BgImageOverlay3 } from './image';
import { variable } from './variable';

export const Box = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    ${({ overflow }) => overflow && `overflow: ${overflow}`};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayHover};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight};

                ${BgImageOverlay1}, ${BgImageOverlay3} {
                    transform: scale(1.03);
                }

                ${BgImageOverlay1} {
                    &::after {
                        background-color: ${({ color }) => color || 'transparent'};
                    }
                }

                ${BgImageOverlay3} {
                    &::after {
                        background-color: ${({ color }) => color || variable.colorBlackTransparent1};
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
