import styled, { css } from 'styled-components';
import { space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const ConhecerMaisPartContentStyled = styled.div`
    ${space};
    height: 0;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: 100% 0 0;
    transition: transform ${variable.transition};

    ${({ active }) =>
        active &&
        css`
            height: 100%;
            overflow: visible;
            transform: scaleY(1);
        `};
`;

export const ConhecerMaisPartNumberStyled = styled.div`
    background-color: ${variable.colorBlack3};
    border-radius: ${variable.borderRadius};
    color: ${variable.colorWhite};
    display: inline-block;
    font-size: 14px;
    height: 20px;
    margin-right: 10px;
    text-align: center;
    transition: background-color ${variable.transition};
    width: 18px;

    ${({ active }) => active && `background-color: ${variable.colorPrimary}`};
`;

export const ConhecerMaisPartTitleStyled = styled.div`
    ${typography};
    align-items: center;
    cursor: pointer;
    display: flex;
    margin-bottom: 15px;

    span {
        transition: color ${variable.transition};
    }

    &:hover {
        ${ConhecerMaisPartNumberStyled} {
            background-color: ${variable.colorPrimary};
        }

        span {
            color: ${variable.colorGrayDark};
        }
    }
`;

export const ConhecerMaisRadioStyled = styled.input`
    ${typography};
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    visibility: hidden;
    z-index: -1;

    + label {
        background-color: transparent;
        border: 2px solid ${variable.colorGrayDark};
        border-radius: ${variable.borderRadius};
        cursor: pointer;
        display: inline-block;
        transition: background-color ${variable.transition}, border ${variable.transition}, color ${variable.transition};
        user-select: none;

        &:hover {
            background-color: ${variable.colorPrimary};
            border: 2px solid ${variable.colorPrimary};
            color: ${variable.colorWhite};
        }
    }

    &:checked {
        + label {
            background-color: ${variable.colorPrimaryHover};
            border: 2px solid ${variable.colorPrimaryHover};
            color: ${variable.colorWhite};
        }
    }
`;
