import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgSocialStyled = styled.svg`
    ${layout};
    ${space};
    fill: ${variable.colorWhite};
    ${({ height }) => height === undefined && 'height: 15px'};

    @media (min-width: ${variable.sm}) {
        ${({ height }) => height === undefined && 'height: 18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
