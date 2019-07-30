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
        right: ${(props) => (props.active == true ? 0 : '-100%')};
        text-align: center;
        top: ${variable.headerHeightMobile};
        transition: right ${variable.transition};
        width: 100%;
        z-index: 10;

        li {
            > a,
            > button {
                color: ${variable.colorGray4};
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
            display: inline-block;

            > a,
            > button {
                color: ${(props) => (props.change == true ? variable.colorWhite : variable.colorSecondary)};
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
