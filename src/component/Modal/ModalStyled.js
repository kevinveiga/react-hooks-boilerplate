import styled from 'styled-components';

import { variable } from '../../style/variable';

export const ModalContainerStyled = styled.div`
    background-color: ${variable.colorGrayDark};
    color: ${variable.colorWhite};
    font-size: 22px;
    padding: ${variable.spacingMD} ${variable.spacingLG};
    text-align: center;

    @media (max-width: ${variable.md}) {
        padding: ${variable.spacingMD} ${variable.spacingSM};
    }
`;

export const ModalStyled = styled.div`
    align-items: center;
    background-color: ${variable.colorWhiteTransparent2};
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: ${({ visible }) => (visible ? 15 : -1)};

    @media (max-width: ${variable.md}) {
        background-color: ${variable.colorGrayDark};
    }
`;
