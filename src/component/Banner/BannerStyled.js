import styled from 'styled-components';
import { grid, layout, space } from 'styled-system';

import { variable } from '../../style/variable';

export const BannerCell = styled.div`
    ${grid};
    ${layout};
    ${space};
    overflow: hidden;
    scroll-snap-align: center;
`;

export const BannerContainer = styled.div`
    ${grid};
    ${layout};
    ${space};
    scroll-snap-type: x mandatory;

    @media (max-width: ${variable.md}) {
        overflow-x: auto;
    }
`;
