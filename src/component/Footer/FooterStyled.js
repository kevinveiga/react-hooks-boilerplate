import styled from 'styled-components';
import { border, display, flexbox, space } from 'styled-system';

import { SvgLogoLibertaStyled } from '../Svg/SvgLogoLibertaStyled';

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

    ${SvgLogoLibertaStyled} {
        [data-logo-liberta] {
            fill: transparent;
        }
    }
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

export const FooterInfoStyled = styled.div`
    ${flexbox};
    ${display};
    ${space};

    p {
        font-size: 12px;

        @media (min-width: ${variable.md}) {
            font-size: 11px;
            line-height: 2;
        }
    }
`;
