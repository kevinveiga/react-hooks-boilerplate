import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SvgArrowDownStyled = styled.svg`
    fill: ${({ fill }) => (fill ? variable[fill] : variable.colorSecondary)};
    ${({ height }) => height === undefined && 'height: 10px'};
`;
