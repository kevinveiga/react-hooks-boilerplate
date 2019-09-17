import styled from 'styled-components';

import { variable } from '../../style/variable';

export const LoaderStyled = styled.div`
    background-color: ${variable.colorGrayTransparent9};
    display: ${({ active }) => (active ? 'block' : 'none')};
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
`;
