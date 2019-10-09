import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from '../../style/variable';

export const LeadwallStyled = styled.div`
    ${layout};
    ${space};
    background-color: ${variable.colorBlack};
    box-shadow: 0 -30px 50px 30px ${variable.colorWhite};
    color: ${variable.colorWhite};
    ${({ change }) => change && 'display: none'};
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
    text-align: center;
`;

export const LeadwallTermosStyled = styled.div`
    ${layout};
    ${space};
    background-color: ${variable.colorGray};
    color: ${variable.colorGrayDark};
    ${({ change }) => change && 'display: none'};
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
    text-align: center;

    @media (max-width: ${variable.sm}) {
        font-size: 12px;
    }
`;
