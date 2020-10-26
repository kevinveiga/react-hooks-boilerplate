import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { variable } from '../../../style/variable';

export const MinhaContaMenuMobileStyled = styled.nav`
    background-color: ${variable.colorBlack3};
    height: calc(100vh - ${variable.headerHeightMobile});
    overflow-y: auto;
    padding: 16px 0 50px 0;
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

export const MinhaContaMenuItemStyled = styled(NavLink)``;

export const MinhaContaMenuStyled = styled.nav`
    height: 100%;
    width: 100%;

    li {
        > a,
        > button,
        > p {
            font-weight: 700;
            padding: 20px 20px 20px 40px;
            text-align: left;
            transition: background-color ${variable.transition}, padding ${variable.transition};
            white-space: nowrap;
            width: 100%;

            > span {
                margin-left: 16px;
                opacity: 1;
                transition: color ${variable.transition}, opacity ${variable.transition};
                vertical-align: middle;
            }

            > svg {
                fill: ${variable.fontColor};
                transition: fill ${variable.transition};
                width: 20px;
            }

            &.active {
                background-color: ${variable.colorPrimary};

                > span {
                    color: ${variable.colorWhite};
                }

                > svg {
                    fill: ${variable.colorWhite};
                }
            }

            &:hover {
                background-color: ${variable.colorPrimaryHover};

                > span {
                    color: ${variable.colorWhite};
                }

                > svg {
                    fill: ${variable.colorWhite};
                }
            }
        }
    }

    ${({ hide }) =>
        hide &&
        css`
            li {
                > a,
                > button,
                > p {
                    padding: 20px;

                    > span {
                        opacity: 0;
                    }
                }
            }
        `};
`;
