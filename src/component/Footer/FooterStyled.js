import styled from 'styled-components';
import { border, display, flexbox, space } from 'styled-system';

import { variable } from '../../style/variable';

export const FooterStyled = styled.footer`
    background-color: ${variable.colorGrayDark};
    color: ${variable.colorWhite};
    height: auto;
    min-height: ${variable.footerHeight};
    padding-bottom: ${variable.spacingLG};
    padding-top: ${variable.spacingLG};
    width: 100%;
    z-index: 1;
`;

export const FooterAtendimentoStyled = styled.div`
    ${border};
    ${flexbox};
    ${display};
    ${space};

    h4 {
        @media (max-width: ${variable.xs}) {
            font-size: 16px;
        }
    }

    h6 {
        font-size: 14px;
        margin-bottom: ${variable.spacingXS};

        @media (max-width: ${variable.xs}) {
            font-weight: 400;
            margin-top: ${variable.spacingSM};
        }

        @media (min-width: ${variable.xs}) {
            font-size: 12px;
        }
    }
`;
