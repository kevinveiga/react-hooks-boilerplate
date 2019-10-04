import styled from 'styled-components';
import { border, flexbox, layout, space, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const MinhaContaLeft = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    border-right: 1px solid ${variable.colorGrayLight2};
    box-shadow: 4px 0 6px 0 ${variable.colorGrayLight3};
    z-index: 2;
`;

export const MinhaContaCenter = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    background-color: ${variable.colorGrayLight4};
    border-left: 1px solid ${variable.colorGrayLight2};
    border-right: 1px solid ${variable.colorGrayLight2};
    min-height: calc(100vh - ${variable.headerHeightMobile} - ${variable.footerAlternateHeight});
    z-index: 1;
`;
