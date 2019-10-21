import styled from 'styled-components';

import { variable } from '../../style/variable';

export const LogoutModalContainerStyled = styled.div`
    background-color: ${variable.colorGrayDark};
    color: ${variable.colorWhite};
    font-size: 24px;
    padding: 45px ${variable.spacingXL};
    text-align: center;
`;

export const LogoutModalStyled = styled.div`
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
`;
