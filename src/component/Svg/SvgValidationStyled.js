import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SvgValidationStyled = styled.svg`
    bottom: calc(50% - 7px);
    fill: ${({ invalid, valid }) => (invalid ? variable.colorAlert : valid ? variable.colorPrimaryHover : variable.colorGray)};
    height: 12px;
    ${({ svgPosition }) => svgPosition || 'right: 2px'};
    opacity: ${({ invalid, valid }) => (invalid || valid ? 1 : 0)};
    pointer-events: none;
    position: absolute;
    stroke: ${({ invalid, valid }) => (invalid ? variable.colorAlert : valid ? variable.colorPrimaryHover : variable.colorGray)};
    transition: fill ${variable.transition}, opacity ${variable.transition}, stroke ${variable.transition};
    z-index: ${({ invalid, valid }) => (invalid || valid ? 3 : 2)};
`;
