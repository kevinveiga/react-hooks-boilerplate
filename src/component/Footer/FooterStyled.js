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

    h3 {
        font-size: 16px;
        margin-bottom: ${variable.spacingXS};
    }

    h6 {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: ${variable.spacingXS};
    }
`;
