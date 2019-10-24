import styled from 'styled-components';
import { layout, position, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgViewStyled = styled.svg`
    ${layout};
    ${position};
    ${space};
    cursor: pointer;
    fill: ${({ fill }) => (fill ? variable[fill] : variable.colorGray)};
    ${({ height }) => height === undefined && 'height: 15px'};

    @media (min-width: ${variable.sm}) {
        ${({ height }) => height === undefined && 'height: 18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
