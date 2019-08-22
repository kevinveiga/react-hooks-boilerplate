import styled from 'styled-components';

import { variable } from '../../style/variable';

export const HeaderMenuStyled = styled.nav`
    display: inline-block;

    @media (max-width: ${variable.md}) {
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
            color: ${variable.colorGray4};

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
                padding: 10px 0 10px 10px;
            }
        }
    }

    @media (min-width: ${variable.md}) {
        li {
            color: ${({ change }) => (change ? variable.colorWhite : variable.colorSecondary)};
            display: inline-block;

            > a,
            > button {
                padding: 10px 0 10px 25px;
            }
        }
    }

    @media (min-width: ${variable.lg}) {
        li {
            > a,
            > button {
                padding: 10px 0 10px 45px;
            }
        }
    }

    li {
        > a,
        > button {
            font-weight: 600;
            letter-spacing: 1px;
            transition: color ${variable.transition};

            &:hover {
                color: ${variable.colorPrimary};
            }
        }
    }
`;
