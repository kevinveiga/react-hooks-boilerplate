import styled, { css } from 'styled-components';
import { border, flexbox, grid, layout, space } from 'styled-system';

import { variable } from './variable';

export const Cell = styled.div`
    ${border};
    ${flexbox};
    ${grid};
    ${layout};
    ${space};
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${(props) =>
        props.hover === 'true' &&
        css`
            &:hover {
                background-color: ${variable.colorGrayLight3};
                box-shadow: 0 1px 10px 1px ${variable.colorGrayLight2};
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
