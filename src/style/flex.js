import styled from 'styled-components';
import { border, flexbox, layout, space, typography } from 'styled-system';

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
        props.hover === 'true' &&
        css`
            &:hover {
                background-color: ${variable.colorGrayHover};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight};
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
