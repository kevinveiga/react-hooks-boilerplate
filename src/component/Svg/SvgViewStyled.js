import styled from 'styled-components';
import { position, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgViewStyled = styled.svg`
    ${position};
    ${space};
    cursor: pointer;
    fill: ${({ fill }) => (fill ? variable[fill] : variable.colorGray)};
    height: ${({ height }) => height || '15px'};

    @media (min-width: ${variable.sm}) {
        height: ${({ height }) => height || '18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
