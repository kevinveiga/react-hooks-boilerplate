import styled from 'styled-components';
import { display } from 'styled-system';

import { variable } from '../../style/variable';

export const HeaderMenuMobileStyled = styled.div`
    ${display};

    bottom: ${variable.spacingMD};
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 100%;
`;

export const HeaderMenuPesquisaStyled = styled.div`
    background-color: ${variable.colorBlack3};
    display: inline-block;
    width: 200px;
`;

export const HeaderMenuStyled = styled.nav`
    display: inline-block;

    @media (max-width: ${variable.md}) {
        background-color: ${variable.colorBlack3};
        height: calc(100vh - ${variable.headerHeightMobile});
        overflow-y: auto;
        padding-top: ${variable.spacingMD};
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
                padding: 15px;
            }
        }
    }

    @media (min-width: ${variable.sm}) {
        li {
            > a,
            > button {
                padding: 10px;
            }
        }
    }

    @media (min-width: ${variable.md}) {
        li {
            display: inline-block;

            > a,
            > button {
                font-size: 14px;
            }
        }
    }

    @media (min-width: ${variable.lg}) {
        li {
            > a,
            > button {
                font-size: 16px;
                padding: 10px 25px;
            }
        }
    }

    li {
        > a,
        > button {
            font-weight: 700;
            transition: color ${variable.transition};
        }
    }
`;
