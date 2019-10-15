import styled, { css } from 'styled-components';

import { Image } from '../../../style/image';
import { variable } from '../../../style/variable';

export const MinhaContaCursoDuvidasImageContainerStyled = styled.div`
    border-radius: 50%;
    height: 50px;
    margin-right: 15px;
    overflow: hidden;
    text-align: center;
    width: 50px;
    z-index: 1;

    ${Image} {
        height: 100%;
    }
`;

export const MinhaContaCursoDuvidasImageLineStyled = styled.div`
    &::after {
        background-color: ${variable.colorBlack};
        content: ' ';
        height: 100%;
        left: 24px;
        position: absolute;
        width: 1px;
        z-index: 0;
    }
`;

export const MinhaContaCursoDuvidasItemsStyled = styled.li`
    display: flex;
    padding-bottom: 20px;
    padding-top: 20px;

    p {
        margin-bottom: 0;
    }
`;

export const MinhaContaCursoDuvidasStyled = styled.ul`
    border-bottom: 1px solid ${variable.colorGrayLight2};
`;
