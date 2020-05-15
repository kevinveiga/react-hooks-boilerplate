import styled, { css } from 'styled-components';
import { grid, layout, space } from 'styled-system';

import { variable } from '../../../style/variable';

export const ConteudoCellStyled = styled.div`
    ${grid};
    ${layout};
    ${space};

    align-items: center;
    background-color: ${variable.colorWhite};
    border-radius: ${variable.borderRadius};
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent1};
    color: ${variable.colorBlack2};
    cursor: pointer;
    justify-content: center;
    min-height: 75px;
    overflow: hidden;
    transition: background-color ${variable.transition};

    > div {
        &:last-of-type {
            height: 0;
            overflow-y: hidden;
        }
    }

    ${({ active }) =>
        active &&
        css`
            > div {
                &:last-of-type {
                    height: auto;
                    margin-top: ${variable.spacingMD};
                    overflow-y: hidden;
                }
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

export const ConteudoCellSvgStyled = styled.div`
    right: -35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

export const CursoTopInfoStyled = styled.section`
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent1};
    z-index: 2;

    @media (min-width: ${variable.sm}) {
        box-shadow: 0 2px 3px 0 ${variable.colorBlackTransparent1};
    }
`;

export const TooltipStyled = styled.div`
    ${space};

    background-color: ${variable.colorGrayLight2};

    &::after {
        border-color: ${variable.colorGrayLight2} transparent transparent transparent;
        border-style: solid;
        border-width: 30px;
        content: ' ';
        left: 15px;
        position: absolute;
        transform: scaleX(0.5) skewX(45deg);
        top: 100%;

        @media (min-width: ${variable.sm}) {
            left: 75px;
            transform: scaleX(1.2) skewX(45deg);
        }
    }
`;
