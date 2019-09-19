import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgStyled = styled.svg`
    ${layout};
    ${space};
    ${({ fill }) => fill && `fill: ${variable[fill]}`};
`;
