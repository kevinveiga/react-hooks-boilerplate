import styled from 'styled-components';
import { border, display, flexbox, space } from 'styled-system';

import { variable } from '../../style/variable';

export const FooterAlternativeStyled = styled.footer`
    background-color: ${variable.colorGrayDark};
    color: ${variable.colorWhite};
    height: auto;
    width: 100%;
    z-index: -1;
`;

export const FooterAlternativeAtendimentoStyled = styled.div`
    ${border};
    ${flexbox};
    ${display};
    ${space};

    max-width: ${variable.lg};

    h3 {
        font-size: 18px;
        margin-bottom: ${variable.spacingXS};

        @media (min-width: ${variable.md}) {
            font-size: 14px;
        }
    }

    h6 {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: ${variable.spacingXS};
    }
`;
