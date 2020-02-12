import { css, keyframes } from 'styled-components';

export const animation = css`
    animation-delay: ${(props) => props.delay};
    animation-direction: ${({ direction }) => direction};
    animation-duration: ${({ duration }) => duration};
    animation-fill-mode: ${({ fillMode }) => fillMode};
    animation-iteration-count: ${({ iterationCount }) => iterationCount};
    animation-play-state: ${({ playState }) => playState};
    animation-timing-function: ${({ timingFunction }) => timingFunction};
`;

animation.defaultProps = {
    delay: '0s',
    direction: 'normal',
    duration: '1s',
    fillMode: 'both',
    iterationCount: '1',
    playState: 'running',
    timingFunction: 'ease'
};

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

export const animationRightToLeft = (obj = { horizontal: 0 }) => keyframes`
    0% {
        transform: translate3d(0, 0, 0);
    }
    35% {
        transform: translate3d(0, 0, 0);
    }
    65% {
        transform: translate3d(${obj.horizontal}, 0, 0);
    }
    100% {
        transform: translate3d(${obj.horizontal}, 0, 0);
    }
`;
