import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../style/variable';

export const SvgCloseStyled = styled.svg`
    ${space};
    display: ${({ active }) => (active ? 'block' : 'none')};
    fill: ${variable.colorGray4};
    width: 30px;
`;
