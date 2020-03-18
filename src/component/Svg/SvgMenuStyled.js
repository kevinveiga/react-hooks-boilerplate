import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgMenuStyled = styled.svg`
    ${space};

    display: ${({ active }) => (active ? 'none' : 'block')};
    fill: ${({ change, fill }) => (change ? variable.colorWhite : fill ? variable[fill] : variable.colorSecondary)};
    width: 30px;
`;
