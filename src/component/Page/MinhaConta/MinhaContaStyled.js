import styled from 'styled-components';
import { border, flexbox, layout, position, space } from 'styled-system';

import { scrollbarAlternate } from '../../../style/function';
import { Image } from '../../../style/image';
import { variable } from '../../../style/variable';

export const MinhaContaCenterStyled = styled.div`
    ${border};
    ${space};

    background-color: ${variable.colorGrayLight5};
    border-left: 1px solid ${variable.colorGrayLight2};
    border-right: 1px solid ${variable.colorGrayLight2};
    height: 100%;
    z-index: 1;
`;

export const MinhaContaConversacaoStyled = styled.div`
    ${scrollbarAlternate()};

    max-height: 50vh;
    overflow-y: auto;
    padding-right: 25px;
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

export const MinhaContaConversacaoItemStyled = styled.li`
    display: flex;
    padding-bottom: 20px;
    padding-top: 20px;

    p {
        margin-bottom: 0;
    }
`;

export const MinhaContaConversacaoListStyled = styled.ul`
    border-bottom: 1px solid ${variable.colorGrayLight2};
`;

export const MinhaContaExibirConteudoStyled = styled.div`
    ${layout};
    ${position};
    ${space};

    @media (max-width: ${variable.lg}) {
        background-color: ${variable.colorGrayLight3};
    }
`;

export const MinhaContaLeftStyled = styled.div`
    ${flexbox};
    ${layout};
    ${space};

    z-index: 2;
`;
