import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgArrowDownStyled = styled.svg`
    ${space};
    fill: ${({ fill }) => (fill ? variable[fill] : variable.colorSecondary)};
    height: ${({ height }) => height || '10px'};
    transform: rotate(0deg);
    transform-origin: 50% 50% 0;
    transition: fill ${variable.transition}, transform ${variable.transition};

    ${({ active }) => active && 'transform: rotate(180deg)'};
`;
