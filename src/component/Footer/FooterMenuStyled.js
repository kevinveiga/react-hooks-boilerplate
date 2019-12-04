import styled from 'styled-components';

import { variable } from '../../style/variable';

export const FooterMenuStyled = styled.nav`
    margin-top: 25px;

    @media (max-width: ${variable.xs}) {
        margin: ${variable.spacingMD} 0 ${variable.spacingSM} 0;
    }

    @media (max-width: ${variable.md}) {
        margin: 0 0 ${variable.spacingSM} 0;
    }

    ul {
        display: inline-block;
        vertical-align: top;
        @media (max-width: ${variable.sm}) {
            margin-top: 35px;
        }

        &:first-of-type {
            margin-right: 45px;
        }

        li {
            display: block;

            > a,
            > button {
                font-size: 14px;
                font-weight: 400;
                padding: 10px 0;
                transition: color ${variable.transition};

                &:hover {
                    color: ${variable.colorPrimary};
                }
            }
        }
    }
`;
