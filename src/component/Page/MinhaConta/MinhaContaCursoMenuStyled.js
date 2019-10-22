import styled, { css } from 'styled-components';
import { space, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const MinhaContaCursoMenuButtonStyled = styled.button`
    margin-bottom: 35px;
    margin-left: auto;
    text-decoration: underline;
    transition: color ${variable.transition};

    &:hover {
        color: ${variable.colorPrimaryHover};
    }
`;

export const MinhaContaCursoMenuModuloCheckboxStyled = styled.input`
    ${typography};
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    visibility: hidden;
    z-index: -1;

    + label {
        cursor: pointer;
        user-select: none;

        &::before {
            background-color: ${variable.colorWhite};
            border: 2px solid ${variable.colorGrayDark};
            border-radius: ${variable.borderRadius};
            box-shadow: inset 0 0 0 0 ${variable.colorPrimary};
            color: ${variable.colorWhite};
            content: ' ';
            display: inline-block;
            height: 20px;
            margin-right: 10px;
            transition: box-shadow ${variable.transition};
            vertical-align: sub;
            width: 20px;
        }

        svg {
            display: none;
            left: 6px;
            position: absolute;
            top: 6px;
        }
    }

    &:checked {
        + label {
            &::before {
                box-shadow: inset 0 0 0 10px ${variable.colorPrimary};
            }

            svg {
                display: block;
            }
        }
    }
`;

export const MinhaContaCursoMenuModuloContentStyled = styled.div`
    ${space};
    background-color: ${variable.colorWhite};
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
            padding: ${variable.spacingMD};
            transform: scaleY(1);
        `};
`;

export const MinhaContaCursoMenuModuloStyled = styled.div`
    align-items: center;
    background-color: 'transparent';
    border-top: 1px solid ${variable.colorWhite};
    cursor: pointer;
    display: flex;
    height: 75px;
    justify-content: space-between;
    padding: 0 ${variable.spacingMD};
    transition: background-color ${variable.transition};

    svg {
        transform: rotate(0deg);
        transform-origin: 50% 50% 0;
        transition: transform ${variable.transition};
    }

    ${({ active }) =>
        active &&
        css`
            background-color: ${variable.colorPrimary};

            svg {
                transform: rotate(180deg);
            }
        `};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorPrimaryHover};
            }
        `};
`;

export const MinhaContaCursoMenuStyled = styled.div`
    background-color: ${variable.colorGrayLight3};
    min-height: 200px;
    overflow: hidden;
    width: 100%;
    z-index: 2;
`;
