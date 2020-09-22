import styled from 'styled-components';

import { variable } from '../../../style/variable';

export const MinhaContaMenuStyled = styled.nav`
    height: 100%;
    width: auto;

    li {
        > a,
        > button,
        > p {
            font-weight: 700;
            padding: 15px 15px 15px 0;
        }
    }
`;

export const MinhaContaMenuMobileStyled = styled.nav`
    background-color: ${variable.colorBlack3};
    height: calc(100vh - ${variable.headerHeightMobile});
    overflow-y: auto;
    padding-top: 50px;
    position: fixed;
    right: ${({ active }) => (active ? 0 : '-100%')};
    text-align: center;
    top: ${variable.headerHeightMobile};
    transition: right ${variable.transition};
    width: 100%;
    z-index: 10;

    li {
        > a,
        > button {
            color: ${variable.colorWhite};
            font-weight: 700;
            padding: 15px;
        }
    }
`;
