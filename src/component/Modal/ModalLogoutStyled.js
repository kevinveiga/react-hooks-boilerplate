import styled from 'styled-components';

import { variable } from '../../style/variable';

export const ModalLogoutContainerStyled = styled.div`
    background-color: ${variable.colorGrayDark};
    color: ${variable.colorWhite};
    font-size: 24px;
    padding: ${variable.spacingLG} ${variable.spacingXL};
    text-align: center;

    @media (max-width: ${variable.md}) {
        padding: ${variable.spacingLG} ${variable.spacingMD};
    }
`;

export const ModalLogoutStyled = styled.div`
    align-items: center;
    background-color: ${variable.colorWhiteTransparent2};
    display: ${({ show }) => (show ? 'flex' : 'none')};
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: ${({ show }) => (show ? 15 : -1)};

    @media (max-width: ${variable.md}) {
        background-color: ${variable.colorGrayDark};
    }
`;
