import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SvgArrowStyled = styled.svg`
    fill: ${({ fill }) => (fill ? variable[fill] : variable.colorPrimary)};
    height: ${({ height }) => height || '18px'};
`;
