import styled from 'styled-components';
import { layout, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const Author = styled.h5`
    display: ${(props) => (props.show ? 'block' : 'none')};
    font-weight: 400;
    margin-bottom: 10px;
`;

export const DateTime = styled.span`
    ${typography};
    color: ${(props) => (props.themeColor === 'light' ? (props.color ? variable[props.color] : variable.colorWhite) : props.color ? variable[props.color] : variable.colorGray2)};
    display: inline-block;
    ${(props) => props.fontSize === undefined && 'font-size: 14px'};
    font-weight: 400;
    margin-bottom: ${variable.spacingXS};
    margin-top: ${variable.spacingXS};
`;

export const Text = styled.p`
    ${layout};
`;

export const Tag = styled.div`
    color: ${variable.colorWhite};
    display: ${(props) => (props.show ? 'table' : 'none')};
    line-height: 1;
    margin-bottom: ${variable.spacingSM};
    padding: ${variable.spacingXS};
`;

export const Title = styled.h2`
    ${typography};
    ${(props) => props.fontSize === undefined && 'font-size: 16px'};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${variable.spacingSM};
    @media (min-width: ${variable.sm}) {
        ${(props) => props.fontSize === undefined && 'font-size: 24px'};
    }
`;

export const NoticiaBoxStyled = styled.div`
    ${layout};
    ${typography};
    color: ${(props) => (props.themeColor === 'light' ? variable.colorWhite : variable.colorBlack2)};
    display: inline-block;
    ${(props) => props.fontSize === undefined && 'font-size: 14px'};
    vertical-align: middle;

    > p {
        color: ${(props) => (props.themeColor === 'light' ? variable.colorWhite : variable.colorGray2)};
        ${(props) => props.fontSize === undefined && 'font-size: 16px'};
        line-height: 1.8;
        margin-bottom: 0;
    }

    > ${Author} {
        color: ${(props) => (props.themeColor === 'light' ? (props.color === 'colorBlueDark' ? variable.colorWhite : variable[props.color]) : variable[props.color])};
        ${(props) => props.fontSize === undefined && 'font-size: 12px'};
        @media (min-width: ${variable.sm}) {
            ${(props) => props.fontSize === undefined && 'font-size: 14px'};
        }
    }

    > ${Tag} {
        background-color: ${(props) => (props.color ? variable[props.color] : 'transparent')};
    }
`;
