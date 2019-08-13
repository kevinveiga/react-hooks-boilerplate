import styled, { css } from 'styled-components';

import { variable } from '../../style/variable';

export const DotContainerStyled = styled.ul`
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
        background-color: ${variable.colorWhite};
        border-radius: ${variable.borderRadius};
        cursor: pointer;
        display: inline-block;
        height: 8px;
        margin: 0 5px;
        padding: 0;
        position: relative;
        transition: background-color ${variable.transition};
        width: 8px;

        &.slick-active {
            background-color: ${variable.colorPrimary};
        }
    }
`;

const btns = css`
    background-color: ${variable.colorSecondary};
    border: 0;
    border-radius: ${variable.borderRadius};
    color: transparent;
    cursor: pointer;
    display: block;
    height: 30px;
    outline: none;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    z-index: 3;
`;

export const NextBtnStyled = styled.button`
    ${btns};
    right: 5px;
`;

export const PrevBtnStyled = styled.button`
    ${btns};
    left: 5px;
`;
