import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgNextStyled = styled.svg`
    ${space};

    fill: ${({ fill }) => variable[fill] || variable.colorSecondary};
    height: ${({ height }) => height || '18px'};
`;
