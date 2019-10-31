import { keyframes } from 'styled-components';

export const animationFadeIn = (obj = { display: 'block', opacity: 1 }) => keyframes`
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: ${obj.display};
    }
    100% {
        opacity: ${obj.opacity};
    }
`;

export const animationFadeOut = (obj = { display: 'block', opacity: 1 }) => keyframes`
    0% {
        display: ${obj.display};
        opacity: ${obj.opacity};
    }
    99% {
        display: ${obj.display};
    }
    100% {
        display: none;
        opacity: 0;
    }
`;

export const animationFadeInTab = (obj = { opacity: 1, visibility: 'visible' }) => keyframes`
    0% {
        opacity: 0;
        visibility: hidden;
    }
    1% {
        visibility: ${obj.visibility};
    }
    100% {
        opacity: ${obj.opacity};
    }
`;

export const animationFadeOutTab = (obj = { opacity: 1, visibility: 'visible' }) => keyframes`
    0% {
        opacity: ${obj.opacity};
        visibility: ${obj.visibility};
    }
    99% {
        visibility: ${obj.visibility};
    }
    100% {
        opacity: 0;
        visibility: hidden;
    }
`;
