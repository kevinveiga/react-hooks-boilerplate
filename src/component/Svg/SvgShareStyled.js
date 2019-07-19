import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SvgShareStyled = styled.svg`
    fill: ${variable.colorWhite};
    height: 15px;

    @media (min-width: ${variable.sm}) {
        height: 18px;
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
