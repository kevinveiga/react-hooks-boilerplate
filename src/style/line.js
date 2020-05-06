import styled from 'styled-components';
import { height, space, width } from 'styled-system';

import { variable } from './variable';

export const Line = styled.div`
    ${height};
    ${space};
    ${width};

    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorGrayLight)};
`;
