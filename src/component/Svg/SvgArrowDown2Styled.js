import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgArrowDown2Styled = styled.svg`
    ${space};

    ${({ fill }) => fill && `fill: ${variable[fill]}`};
    height: ${({ height }) => height || '10px'};
    ${({ stroke }) => stroke && `stroke: ${variable[stroke]}`};
    transform: rotate(0deg);
    transform-origin: 50% 50% 0;
    transition: transform ${variable.transition};

    ${({ active }) => active && 'transform: rotate(180deg)'};
`;
