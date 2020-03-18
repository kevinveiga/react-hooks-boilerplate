import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgPrevStyled = styled.svg`
    ${space};

    fill: ${variable.colorSecondary};
    height: ${({ height }) => height || '12px'};
`;
