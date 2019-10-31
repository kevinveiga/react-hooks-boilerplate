import styled from 'styled-components';

import { variable } from '../../style/variable';

export const ModalMessageStyled = styled.div`
    background-color: ${variable.colorWhite};
    border-radius: ${variable.borderRadius};
    bottom: 25px;
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent1};
    display: ${({ show }) => (show ? 'block' : 'none')};
    padding: ${variable.spacingLG} ${variable.spacingMD};
    position: fixed;
    right: 25px;
    z-index: ${({ show }) => (show ? 15 : -1)};
`;
