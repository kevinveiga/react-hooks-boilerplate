import styled, { css } from 'styled-components';
import { grid, layout, space } from 'styled-system';

import { animationFadeIn, animationFadeOut } from '../../style/animation';
import { BgImageOverlay3 } from '../../style/image';
import { variable } from '../../style/variable';

export const BannerCell = styled.div`
    ${grid};
    ${layout};
    ${space};
    overflow: hidden;
    scroll-snap-align: center;

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                ${BgImageOverlay3} {
                    filter: grayscale(0%);
                    transform: scale(1.03);

                    &::after {
                        background-color: ${({ color }) => color || variable.colorBlackTransparent3};
                    }
                }
            }
        `};
`;

export const BannerContainer = styled.div`
    ${grid};
    ${layout};
    ${space};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
`;

export const BannerRightStyled = styled.div`
    animation: ${animationFadeIn()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;

    ${({ change }) =>
        change &&
        css`
            display: none;
            z-index: 3;

            @media (min-width: ${variable.sm}) {
                display: block;
            }

            @media (min-width: ${variable.md}) {
                ${({ boxMeasure, boxMeasurePadding }) => boxMeasure && `left: calc(${boxMeasure.x}px + ${boxMeasurePadding || 0}px)`};
                position: fixed;
                right: auto;
                top: 150px;
                ${({ boxMeasure, boxMeasurePadding }) => boxMeasure && `width: calc(${boxMeasure.width}px - ${boxMeasurePadding || 0}px)`};
            }
        `};

    ${({ fadeOut }) =>
        fadeOut &&
        css`
            animation: ${animationFadeOut()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;
        `};

    a {
        width: 100%;

        img {
            width: 100%;
        }
    }
`;
