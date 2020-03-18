import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgLockStyled = styled.svg`
    ${space};

    fill: ${variable.colorPrimary};
    height: 60px;

    @media (min-width: ${variable.sm}) {
        height: 100px;
    }
`;
