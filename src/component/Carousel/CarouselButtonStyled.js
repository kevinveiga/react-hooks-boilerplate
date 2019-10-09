import styled, { css } from 'styled-components';

import { position } from 'styled-system';

import { variable } from '../../style/variable';

export const CarouselDotBtnStyled = styled.button`
    border: 0;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 8px;
    outline: none;
    width: 8px;
`;

export const CarouselDotContainerStyled = styled.ul`
    bottom: 15px;
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    text-align: center;
    width: 100%;
    z-index: 3;

    li {
        background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorWhite)};
        border-radius: ${variable.borderRadius};
        cursor: pointer;
        display: inline-block;
        margin: 0 5px;
        padding: 0;
        position: relative;
        transition: background-color ${variable.transition};

        &.slick-active {
            background-color: ${variable.colorPrimary};
        }
    }
`;

const btns = css`
    ${position};
    background-color: ${variable.colorSecondary};
    border: 0;
    border-radius: 7px;
    ${({ bottom }) => bottom === undefined && 'top: 50%'};
    color: transparent;
    cursor: pointer;
    height: 36px;
    opacity: 1;
    outline: none;
    padding: 0;
    position: absolute;
    transform: translateY(-50%);
    transition: background-color ${variable.transition}, opacity ${variable.transition};
    width: 32px;
    z-index: 3;

    &:hover {
        background-color: ${variable.colorSecondaryHover};
        opacity: 0.75;
    }
`;

export const CarouselNextBtnStyled = styled.button`
    ${btns};
    ${({ right }) => right === undefined && 'right: 5px'};
`;

export const CarouselPrevBtnStyled = styled.button`
    ${btns};
    ${({ left }) => left === undefined && 'left: 5px'};
`;
