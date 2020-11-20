import styled, { css } from 'styled-components';
import { display, position, space, typography } from 'styled-system';
import NumberFormat from 'react-number-format';

import { variable } from '../../style/variable';

export const FormStyled = styled.form`
    height: auto;
    width: 100%;
    z-index: 1;
`;

const input = css`
    ${space};

    background-color: transparent;
    ${({ obj }) => `border-bottom: 1px solid ${obj && obj.colorLine ? variable[obj.colorLine] : variable.colorGray}`};
    color: ${({ obj }) => (obj && obj.color ? variable[obj.color] : variable.colorGrayDark)};
    font-family: ${variable.fontPrimary};
    font-size: 16px;
    font-weight: ${({ obj }) => (obj && obj.fontWeight ? obj.fontWeight : '600')};
    height: ${({ height }) => height || variable.inputHeight};
    padding-bottom: 0;
    padding-left: 2px;
    ${({ pr }) => pr === undefined && 'padding-right: 2px'};
    padding-top: ${variable.inputPadding};
    table-layout: fixed;
    text-overflow: ellipsis;
    transition: border ${variable.transition}, box-shadow ${variable.transition}, color ${variable.transition};
    width: 100%;

    &:disabled {
        color: ${variable.colorGray};
    }

    &::placeholder {
        color: ${({ obj }) => (obj && obj.colorPlaceholder ? variable[obj.colorPlaceholder] : variable.colorGray)};
        font-size: 16px;
        font-weight: 400;
    }

    ${({ obj }) =>
        obj &&
        obj.themeForm === 'leadwall' &&
        css`
            background-color: ${variable.colorWhite};
            border-bottom: 0;
            border-radius: ${variable.borderRadius};
            box-shadow: inset 0 0 0 2px ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray};
            padding: ${variable.inputPadding} 15px;
        `};

    ${({ obj }) =>
        obj &&
        obj.themeForm === 'pesquisa' &&
        css`
            background-color: ${variable.colorWhite};
            border-bottom: 0;
            border-bottom-left-radius: ${variable.borderRadius};
            border-bottom-right-radius: 0;
            border-top-left-radius: ${variable.borderRadius};
            border-top-right-radius: 0;
            border-bottom: 1px solid ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray};
            border-left: 1px solid ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray};
            border-top: 1px solid ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray};
            padding: ${variable.inputPadding} 15px ${variable.inputPadding} 55px;

            @media (max-width: ${variable.sm}) {
                border-right: 1px solid ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray};
            }
        `};

    ${({ invalid }) => invalid && `border-color: ${variable.colorAlert}`};
    ${({ valid }) => valid && `border-color: ${variable.colorPrimaryHover}`};

    ${({ invalid, obj }) =>
        invalid &&
        obj &&
        obj.themeForm === 'leadwall' &&
        css`
            border-color: transparent;
            box-shadow: inset 0 0 0 3px ${variable.colorAlert};
        `};

    ${({ obj, valid }) =>
        valid &&
        obj &&
        obj.themeForm === 'leadwall' &&
        css`
            border-color: transparent;
            box-shadow: inset 0 0 0 3px ${variable.colorPrimaryHover};
        `};
`;

const inputLabel = css`
    ${({ label }) =>
        label &&
        css`
            + label {
                pointer-events: none;
                position: absolute;
                top: 20px;
                transition: top ${variable.transition};
            }

            &:focus {
                + label {
                    top: 0;
                }
            }
        `};

    ${({ invalid, label, valid }) =>
        label &&
        (invalid || valid) &&
        css`
            + label {
                top: 0;
            }
        `};

    &:-webkit-autofill {
        + label {
            top: 0;
        }
    }
`;

export const InputStyled = styled.input.attrs(({ invalid }) => ({
    'data-invalid': invalid ? true : undefined
}))`
    ${input};
    ${inputLabel};

    &:read-only {
        color: ${variable.colorGray};
    }
`;

export const InputAlternateStyled = styled.input`
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    visibility: hidden;
    z-index: -1;

    ${({ type }) =>
        type === 'file' &&
        css`
            + label {
                background-color: ${variable.colorGray2};
                border-radius: 50%;
                bottom: 0;
                box-shadow: 0 2px 6px 0 ${variable.colorBlackTransparent3};
                cursor: pointer;
                display: flex;
                height: 45px;
                position: absolute;
                right: 10px;
                transition: background-color ${variable.transition};
                user-select: none;
                vertical-align: middle;
                width: 45px;

                &:hover {
                    background-color: ${variable.colorPrimaryHover};
                }
            }
        `};

    ${({ type }) =>
        (type === 'radio' || type === 'checkbox') &&
        css`
            + label {
                cursor: pointer;
                min-height: 25px;
                user-select: none;

                &::before {
                    background-color: ${variable.colorWhite};
                    border: 2px solid ${variable.colorGray2};
                    border-radius: ${variable.borderRadius};
                    box-shadow: inset 0 0 0 0 ${variable.colorPrimary};
                    content: ' ';
                    display: inline-block;
                    height: 16px;
                    transition: box-shadow ${variable.transition};
                    vertical-align: middle;
                    width: 16px;
                }

                svg {
                    display: none;
                    fill: ${variable.colorWhite};
                    height: 8px;
                    left: 50%;
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            &:checked {
                + label {
                    &::before {
                        border: 2px solid ${variable.colorSecondary};
                        box-shadow: inset 0 0 0 10px ${variable.colorPrimary};
                    }

                    svg {
                        display: block;
                    }
                }
            }
        `};
`;

export const InputMaskStyled = styled(NumberFormat).attrs(({ invalid }) => ({
    'data-invalid': invalid ? true : undefined
}))`
    ${input};
    ${inputLabel};
`;

export const InvalidInputMessageStyled = styled.span`
    bottom: -20px;
    color: ${({ color }) => (color ? variable[color] : variable.colorAlert)};
    font-size: 12px;
    left: 0;
    position: absolute;
`;

export const ResponseMessageContainerStyled = styled.div`
    ${position};
`;

export const ResponseMessageStyled = styled.p`
    color: ${({ color }) => (color ? variable[color] : variable.colorAlert)};
    font-size: 14px;
`;

export const LabelStyled = styled.label`
    ${display};
    ${position};
    ${space};
    ${typography};

    color: ${({ color }) => (color ? variable[color] : variable.colorPrimary)};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    ${({ px }) => px === undefined && 'padding-left: 2px; padding-right: 2px'};
    ${({ py }) => py === undefined && 'padding-bottom: 0; padding-top: 0'};
    z-index: 1;
`;

export const SelectStyled = styled.select.attrs(({ invalid }) => ({
    'data-invalid': invalid ? true : undefined
}))`
    ${input};
`;

export const TextareaStyled = styled.textarea.attrs(({ invalid }) => ({
    'data-invalid': invalid ? true : undefined
}))`
    ${input}

    height: auto;
    min-height: 100px;
    padding-bottom: ${variable.inputPadding};
    padding-right: 20px;
    padding-top: 0;
`;
