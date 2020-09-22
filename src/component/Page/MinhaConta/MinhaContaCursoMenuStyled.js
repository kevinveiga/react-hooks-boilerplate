import styled, { css } from 'styled-components';
import { space, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const MinhaContaCursoMenuModuloStyled = styled.div`
    align-items: center;
    background-color: 'transparent';
    border-top: 1px solid ${variable.colorWhite};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    min-height: 75px;
    padding: ${variable.spacingSM} ${variable.spacingMD};
    transition: background-color ${variable.transition};

    > svg {
        transform: rotate(0deg);
        transform-origin: 50% 50% 0;
        transition: transform ${variable.transition};
    }

    ${({ active }) =>
        active &&
        css`
            > svg {
                transform: rotate(180deg);
            }
        `};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorPrimary};
            }
        `};
`;

export const MinhaContaCursoMenuModuloSvgStyled = styled.div`
    right: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

export const MinhaContaCursoMenuConteudoStyled = styled.li`
    cursor: pointer;
`;

export const MinhaContaCursoMenuConteudoContentStyled = styled.div`
    ${space};
    background-color: ${variable.colorWhite};
    height: 0;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: 0 0 0;
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

export const MinhaContaCursoMenuStyled = styled.div`
    background-color: ${variable.colorGrayLight3};
    overflow: hidden;
    transition: transform ${variable.transition};
    z-index: -1;

    @media (max-width: ${variable.lg}) {
        height: 0;
        transform: scaleY(0);
        transform-origin: 0 0 0;
    }

    @media (min-width: ${variable.lg}) {
        transform: scaleX(0);
        transform-origin: 100% 0 0;
        width: 0;
    }

    ${({ active }) =>
        active &&
        css`
            z-index: 2;

            @media (max-width: ${variable.lg}) {
                height: 100%;
                transform: scaleY(1);
            }

            @media (min-width: ${variable.lg}) {
                transform: scaleX(1);
                width: 100%;
            }
        `};
`;
