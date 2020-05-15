import styled, { css } from 'styled-components';
import { space, verticalAlign } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgStyled = styled.svg`
    ${space};
    ${verticalAlign};

    ${({ fill }) => fill && `fill: ${variable[fill]}`};
    height: ${({ height }) => height || '15px'};
    ${({ stroke }) => stroke && `stroke: ${variable[stroke]}`};

    @media (min-width: ${variable.sm}) {
        height: ${({ height }) => height || '18px'};
    }

    ${({ obj }) =>
        obj &&
        obj.hoverColor &&
        css`
            cursor: pointer;

            &:hover {
                fill: ${variable[obj.hoverColor]};
            }
        `};
`;
