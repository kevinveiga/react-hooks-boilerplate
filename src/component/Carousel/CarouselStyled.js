import styled from 'styled-components';

import { variable } from '../../style/variable';

export const CarouselStyled = styled.div`
    .slick-arrow {
        &.slick-hidden {
            display: none;
        }
    }

    .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;

        img {
            display: block;
        }

        &.dragging {
            img {
                pointer-events: none;
            }
        }

        &.slick-loading {
            img {
                display: none;
            }
        }
    }

    .slick-initialized {
        .slick-slide {
            display: block;
        }
    }

    .slick-dotted {
        &.slick-slider {
            margin-bottom: 30px;
        }
    }

    .slick-loading {
        .slick-list {
            background-color: ${variable.colorWhite};
        }

        .slick-slide,
        .slick-track {
            visibility: hidden;
        }
    }

    .slick-slider {
        box-sizing: border-box;
        display: block;
        position: relative;
        touch-action: pan-y;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;

        .slick-list,
        .slick-track {
            display: block;
            position: relative;
            transform: translate3d(0, 0, 0);
            z-index: 1;
        }

        .slick-list {
            margin: 0;
            overflow: hidden;
            padding: 0;

            &:focus {
                outline: none;
            }

            &.dragging {
                cursor: hand;
                cursor: pointer;
            }
        }

        .slick-track {
            left: 0;
            margin-left: auto;
            margin-right: auto;
            top: 0;

            &::after {
                clear: both;
            }

            &::after,
            &::before {
                content: '';
                display: table;
            }
        }
    }

    .slick-vertical {
        .slick-slide {
            border: 1px solid transparent;
            display: block;
            height: auto;
        }
    }

    [dir='rtl'] {
        .slick-next {
            left: 5px;
            right: auto;
        }

        .slick-prev {
            left: auto;
            right: 5px;
        }

        .slick-slide {
            float: right;
        }
    }
`;
