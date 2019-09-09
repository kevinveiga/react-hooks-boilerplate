import styled, { css } from 'styled-components';
import { IMaskInput } from 'react-imask';

import { variable } from '../../style/variable';

export const FormStyled = styled.form`
    height: auto;
    width: 100%;
    z-index: 1;
`;

const input = css`
    background-color: ${({ obj }) => (obj.themeColor === 'leadwall' ? variable.colorWhite : 'transparent')};
    ${({ obj }) => (obj.themeColor === 'leadwall' ? `box-shadow: inset 0 0 0 2px ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray}` : `border-bottom: 1px solid ${obj.colorLine ? variable[obj.colorLine] : variable.colorGray}`)};
    ${({ obj }) => obj.themeColor === 'leadwall' && `border-radius: ${variable.borderRadius}`};
    color: ${({ obj }) => (obj.color ? variable[obj.color] : variable.colorGrayDark)};
    font-family: ${variable.fontPrimary};
    font-size: 16px;
    font-weight: 600;
    height: ${variable.inputHeight};
    letter-spacing: 0;
    padding: ${variable.inputPadding} ${({ obj }) => (obj.themeColor === 'leadwall' ? '15px' : '2px')};
    table-layout: fixed;
    text-overflow: ellipsis;
    transition: border ${variable.transition}, box-shadow ${variable.transition}, color ${variable.transition};
    width: 100%;

    &::placeholder {
        color: ${({ obj }) => (obj.colorPlaceholder ? variable[obj.colorPlaceholder] : variable.colorGray)};
        font-size: 16px;
        font-weight: 400;
    }
`;

export const InputValidationStyled = styled.input`
    ${input};
    ${({ obj, invalid }) => invalid && (obj.themeColor === 'leadwall' ? `box-shadow: inset 0 0 0 3px ${variable.colorAlert}` : `border-color: ${variable.colorAlert}`)};
    ${({ obj, valid }) => valid && (obj.themeColor === 'leadwall' ? `box-shadow: inset 0 0 0 3px ${variable.colorPrimaryHover}` : `border-color: ${variable.colorPrimaryHover}`)};
`;

export const InputMaskValidationStyled = styled(IMaskInput)`
    ${input};
    ${({ obj, invalid }) => invalid && (obj.themeColor === 'leadwall' ? `box-shadow: inset 0 0 0 3px ${variable.colorAlert}` : `border-color: ${variable.colorAlert}`)};
    ${({ obj, valid }) => valid && (obj.themeColor === 'leadwall' ? `box-shadow: inset 0 0 0 3px ${variable.colorPrimaryHover}` : `border-color: ${variable.colorPrimaryHover}`)};
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
