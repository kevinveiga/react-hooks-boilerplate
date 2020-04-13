import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { gradientDirection } from '../../style/function';
import { variable } from '../../style/variable';

export const LeadwallStyled = styled.div`
    ${layout};
    ${space};

    background-color: ${variable.colorBlack};
    color: ${variable.colorWhite};
    ${({ hide }) => hide && 'display: none'};
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
    text-align: center;

    &::before {
        ${gradientDirection('0deg', variable.colorWhite, '15%', variable.colorWhiteTransparent5, '100%')};
        content: ' ';
        height: 200px;
        left: 0;
        position: absolute;
        top: -200px;
        width: 100%;
        z-index: -1;
    }
`;

export const LeadwallTermosStyled = styled.div`
    ${layout};
    ${space};

    background-color: ${variable.colorGray};
    color: ${variable.colorGrayDark};
    ${({ hide }) => hide && 'display: none'};
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
    text-align: center;

    @media (max-width: ${variable.sm}) {
        font-size: 12px;
    }
`;
