import styled from 'styled-components';
import { position, space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgSearchStyled = styled.svg`
    ${position};
    ${space};

    cursor: pointer;
    fill: ${({ fill, change }) => (change ? variable.colorWhite : fill ? variable[fill] : variable.colorSecondary)};
    height: ${({ height }) => height || '15px'};

    @media (min-width: ${variable.sm}) {
        height: ${({ height }) => height || '18px'};
    }

    &:hover {
        fill: ${variable.colorPrimary};
    }
`;
