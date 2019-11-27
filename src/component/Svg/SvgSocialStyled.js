import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgSocialStyled = styled.svg`
    ${space};
    fill: ${variable.colorWhite};
    height: ${({ height }) => height || '15px'};

    @media (min-width: ${variable.sm}) {
        height: ${({ height }) => height || '18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
