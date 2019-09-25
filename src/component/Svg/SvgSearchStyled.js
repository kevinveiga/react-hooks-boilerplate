import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgSearchStyled = styled.svg`
    ${layout};
    ${space};
    cursor: pointer;
    fill: ${({ fill, change }) => (change ? variable.colorWhite : fill ? variable[fill] : variable.colorSecondary)};
    ${({ height }) => height === undefined && 'height: 15px'};

    @media (min-width: ${variable.sm}) {
        ${({ height }) => height === undefined && 'height: 18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
