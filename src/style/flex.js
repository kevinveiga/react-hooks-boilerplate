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
    ${(props) => props.overflow && `overflow: ${props.overflow}`};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${(props) =>
        props.hover == 'true' &&
        css`
            &:hover {
                background-color: ${variable.colorGrayHover};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight};

                ${BgImageOverlay1}, ${BgImageOverlay3} {
                    transform: scale(1.03);
                }

                ${BgImageOverlay1} {
                    &::after {
                        background-color: ${(props) => props.color === undefined && 'transparent'};
                    }
                }

                ${BgImageOverlay3} {
                    &::after {
                        background-color: ${(props) => props.color === undefined && variable.colorBlackTransparent1};
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
