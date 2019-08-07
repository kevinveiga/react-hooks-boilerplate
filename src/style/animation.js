import { keyframes } from 'styled-components';

export const animationFadeIn = (display = 'block') => keyframes`
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: ${display};
    }
    100% {
        opacity: 1;
    }
`;

export const animationFadeOut = (display = 'block') => keyframes`
    0% {
        display: ${display};
        opacity: 1;
    }
    99% {
        display: ${display};
    }
    100% {
        display: none;
        opacity: 0;
    }
`;
