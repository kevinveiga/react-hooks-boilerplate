import styled, { css } from 'styled-components';
import { typography } from 'styled-system';
import { IMaskInput } from 'react-imask';

import { variable } from '../../style/variable';

export const CheckboxStyled = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;

    &:checked {
        + label {
            &::before {
                border: 2px solid ${variable.colorSecondary};
                box-shadow: inset 0 0 30px 0 ${variable.colorPrimary};
            }
        }
    }

    + label {
        cursor: pointer;
        user-select: none;

        &::before {
            background-color: ${variable.colorWhite};
            border: 2px solid ${variable.colorGray2};
            border-radius: ${variable.borderRadius};
            box-shadow: inset 0 0 0 0 ${variable.colorPrimary};
            content: ' ';
            display: inline-block;
            height: 20px;
            margin-right: 10px;
            transition: box-shadow ${variable.transition};
            vertical-align: middle;
            width: 20px;
        }
    }
`;

export const FormStyled = styled.form`
    height: auto;
    width: 100%;
    z-index: 1;
`;

const input = css`
    background-color: transparent;
    ${({ obj }) => `border-bottom: 1px solid ${obj && obj.colorLine ? variable[obj.colorLine] : variable.colorGray}`};
    color: ${({ obj }) => (obj && obj.color ? variable[obj.color] : variable.colorGrayDark)};
    font-family: ${variable.fontPrimary};
    font-size: 16px;
    font-weight: 600;
    height: ${variable.inputHeight};
    letter-spacing: 0;
    padding: ${variable.inputPadding} 2px;
    table-layout: fixed;
    text-overflow: ellipsis;
    transition: border ${variable.transition}, box-shadow ${variable.transition}, color ${variable.transition};
    width: 100%;

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
        `};
`;

const validationType = css`
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

export const InputStyled = styled.input`
    ${input};
`;

export const InputValidationStyled = styled.input`
    ${input};
    ${validationType};
`;

export const InputMaskValidationStyled = styled(IMaskInput)`
    ${input};
    ${validationType};
`;

export const InvalidInputMessage = styled.span`
    bottom: -20px;
    color: ${variable.colorAlert};
    font-size: 12px;
    left: 0;
    position: absolute;
`;

export const InvalidResponseMessage = styled.span`
    color: ${variable.colorAlert};
    font-size: 14px;
    left: 0;
    position: absolute;
    top: -15px;
`;

export const LabelStyled = styled.label`
    ${typography};
    color: ${({ color }) => (color ? variable[color] : variable.colorPrimary)};
    ${({ fontSize }) => fontSize === undefined && 'font-size: 14px'};
    padding: 0 2px;
`;
