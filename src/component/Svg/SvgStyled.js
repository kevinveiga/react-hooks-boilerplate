import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgStyled = styled.svg`
    ${space};

    ${({ fill }) => fill && `fill: ${variable[fill]}`};
    height: ${({ height }) => height || '15px'};
    ${({ stroke }) => stroke && `stroke: ${variable[stroke]}`};

    @media (min-width: ${variable.sm}) {
        height: ${({ height }) => height || '18px'};
    }
`;
