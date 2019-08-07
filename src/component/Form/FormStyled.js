import styled, { css } from 'styled-components';

import { placeholder } from '../../style/function';
import { variable } from '../../style/variable';

const custonInput = (color, colorLine, colorPlaceholder, themeColor) => {
    return css`
        .custom-input,
        .custom-textarea {
            ${placeholder(`
                color: ${variable[colorPlaceholder]};
                font-size: 16px;
                font-weight: 400;
            `)};
            font-size: 16px;
            background-color: transparent;
            border-bottom: 1px solid ${variable[colorLine]};
            color: ${variable[color]};
            font-family: ${variable.fontPrimary};
            font-weight: 600;
            height: ${variable.inputHeight};
            letter-spacing: 0;
            padding: ${variable.inputPadding} 2px;
            table-layout: fixed;
            text-overflow: ellipsis;
            transition: border ${variable.transition}, color ${variable.transition};
            width: 100%;

            ~ .custom-label {
                color: ${variable[colorPlaceholder]};
                font-size: 14px;
                font-weight: 400;
                left: 2px;
                opacity: 0.8;
                position: absolute;
                top: calc(50% - 5px);
                transition: font-size ${variable.transition}, top ${variable.transition};
            }

            ~ .custom-validation-text {
                bottom: -25px;
                color: ${variable.colorAlert};
                font-size: 14px;
                font-weight: 600;
                height: auto;
                left: 50%;
                opacity: 0;
                overflow: hidden;
                padding: 2px;
                position: absolute;
                table-layout: fixed;
                text-overflow: ellipsis;
                transform: translate3d(-50%, 0, 0);
                transition: opacity ${variable.transition};
                white-space: nowrap;
                width: 100%;
            }

            ~ .icon-left,
            ~ .icon-right {
                fill: ${variable.colorGray};
                height: 12px;
                pointer-events: none;
                position: absolute;
                stroke: ${variable.colorGray};
                top: calc(50% - 7px);
                transition: fill ${variable.transition}, stroke ${variable.transition};
                z-index: 2;
            }

            ~ .icon-left {
                left: 2px;
            }

            ~ .icon-right {
                right: 2px;
            }

            ~ .svg-invalid,
            ~ .svg-valid {
                opacity: 0;
                transition: opacity ${variable.transition};
            }

            &:disabled {
                background-color: ${variable.colorGray4};
                cursor: not-allowed;
            }

            &:active,
            &:focus,
            &:hover,
            &.has-value {
                border-bottom: 2px solid ${variable[colorLine]};
                z-index: 1;

                ~ .custom-label {
                    font-size: 12px;
                    top: 0;
                }
            }

            &.invalid {
                border-color: ${variable.colorAlert};

                ~ .custom-validation-text {
                    opacity: 1;
                }

                ~ .svg-invalid {
                    fill: ${variable.colorAlert};
                    opacity: 1;
                    stroke: ${variable.colorAlert};
                    z-index: 3;
                }
            }

            &.valid {
                border-color: ${variable.colorPrimaryHover};

                ~ .svg-valid {
                    fill: ${variable.colorPrimaryHover};
                    opacity: 1;
                    stroke: ${variable.colorPrimaryHover};
                    z-index: 3;
                }
            }
        }
    `;
};

export const FormStyled = styled.form`
    ${({ color, colorLine, colorPlaceholder, themeColor }) => custonInput(color, colorLine, colorPlaceholder, themeColor)};
    height: auto;
    width: auto;
    z-index: 1;
`;
