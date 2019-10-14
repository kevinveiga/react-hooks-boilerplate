import styled, { css } from 'styled-components';
import { border, flexbox, layout, space, typography } from 'styled-system';

import { BgImageOverlay } from './image';
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

export const Flex = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
`;
