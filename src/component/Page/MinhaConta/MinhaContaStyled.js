import styled from 'styled-components';
import { border, flexbox, layout, position, space, typography } from 'styled-system';

import { Image } from '../../../style/image';
import { variable } from '../../../style/variable';

export const MinhaContaCenterStyled = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    background-color: ${variable.colorGrayLight5};
    border-left: 1px solid ${variable.colorGrayLight2};
    border-right: 1px solid ${variable.colorGrayLight2};
    min-height: calc(100vh - ${variable.headerHeightMobile} - ${variable.footerAlternateHeight});
    z-index: 1;
`;

export const MinhaContaConversacaoStyled = styled.div`
    max-height: 50vh;
    overflow-y: auto;
    padding-right: 25px;

    &::-webkit-scrollbar {
        height: 100%;
        width: 6px;
    }

    &::-webkit-scrollbar-button {
        background-color: ${variable.colorWhite};
        display: none;
    }

    &::-webkit-scrollbar-corner {
        background-color: ${variable.colorWhite};
    }

    &::-webkit-resizer {
        background-color: ${variable.colorWhite};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${variable.colorBlack};
        border-radius: 10px;
        height: 50px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${variable.colorWhite};
        border-radius: 10px;
        box-shadow: inset 0 0 0 1px ${variable.colorGray2};
    }

    &::-webkit-scrollbar-track-piece {
        background-color: transparent;
        margin: 0;
    }
`;

export const MinhaContaConversacaoImageContainerStyled = styled.div`
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

export const MinhaContaConversacaoImageLineStyled = styled.div`
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

export const MinhaContaConversacaoLiStyled = styled.li`
    display: flex;
    padding-bottom: 20px;
    padding-top: 20px;

    p {
        margin-bottom: 0;
    }
`;

export const MinhaContaConversacaoUlStyled = styled.ul`
    border-bottom: 1px solid ${variable.colorGrayLight2};
`;

export const MinhaContaExibirAulaStyled = styled.div`
    ${layout};
    ${position};
    ${space};

    @media (max-width: ${variable.md}) {
        background-color: ${variable.colorGrayLight3};
    }
`;

export const MinhaContaLeftStyled = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    border-right: 1px solid ${variable.colorGrayLight2};
    box-shadow: 4px 0 6px 0 ${variable.colorBlackTransparent1};
    z-index: 2;
`;
