import styled, { css } from 'styled-components';
import { layout } from 'styled-system';

import { animationFadeIn, animationFadeOut } from '../../../style/animation';
import { variable } from '../../../style/variable';

export const NoticiaSocialStyled = styled.section`
    ${layout};

    animation: ${animationFadeIn()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    left: auto;
    position: ${({ change }) => (change ? 'fixed' : 'absolute')};
    top: ${({ change }) => (change ? '150px' : 'auto')};
    z-index: 3;

    ${({ fadeOut }) =>
        fadeOut &&
        css`
            animation: ${animationFadeOut()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;
        `};
`;
