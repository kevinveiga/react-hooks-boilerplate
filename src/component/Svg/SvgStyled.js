import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgStyled = styled.svg`
    ${space};
    ${({ fill }) => fill && `fill: ${variable[fill]}`};
    height: 18px;
`;
