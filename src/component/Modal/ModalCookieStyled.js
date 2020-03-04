import styled from 'styled-components';

import { variable } from '../../style/variable';

export const ModalCookieStyled = styled.div`
    background-color: ${variable.colorSecondary};
    border-radius: ${variable.borderRadius};
    bottom: 25px;
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent3};
    color: ${variable.colorWhite};
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    font-size: 12px;
    left: 50%;
    padding: ${variable.spacingMD};
    position: fixed;
    text-align: center;
    transform: translateX(-50%);
    transition: opacity ${variable.transitionSlow};
    width: 90%;
    z-index: ${({ visible }) => (visible ? 15 : -1)};

    @media (min-width: ${variable.md}) {
        font-size: 14px;
        white-space: nowrap;
        width: auto;
    }
`;
