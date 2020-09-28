import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { variable } from '../../../style/variable';

export const MinhaContaMenuItemStyled = styled(NavLink)``;

export const MinhaContaMenuStyled = styled.nav`
    height: 100%;
    width: 100%;

    li {
        transition: background-color ${variable.transition};

        > a,
        > button,
        > p,
        ${MinhaContaMenuItemStyled} {
            font-weight: 700;
            padding: 20px 20px 20px 40px;
            text-align: left;
            width: 100%;
        }

        svg {
            fill: ${variable.fontColor};
            margin-right: 16px;
            width: 20px;
        }

        :hover {
            background-color: ${variable.colorPrimaryHover};
        }

        .active {
            background-color: ${variable.colorPrimary};
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
        > button,
        > p {
            color: ${variable.colorWhite};
            font-weight: 700;
            padding: 15px;
        }
    }
`;
