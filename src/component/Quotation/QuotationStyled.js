import styled from 'styled-components';

import { animation, animationRightToLeft } from '../../style/animation';
import { Grid } from '../../style/grid';

export const QuotationAnimationStyled = styled(Grid)`
    ${animation};

    animation-name: ${({ animationPosition }) =>
        animationPosition ? animationRightToLeft({ horizontal: `${animationPosition}px` }) : animationRightToLeft({ horizontal: 0 })};

    &:hover {
        animation-play-state: paused;
    }
`;
