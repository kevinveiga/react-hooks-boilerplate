import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SvgValidationStyled = styled.svg`
    fill: ${({ invalid, valid }) => (invalid ? variable.colorAlert : valid ? variable.colorPrimaryHover : variable.colorGray)};
    height: 10px;
    ${({ svgPosition }) => svgPosition || 'right: 2px'};
    opacity: ${({ invalid, valid }) => (invalid || valid ? 1 : 0)};
    pointer-events: none;
    position: absolute;
    stroke: ${({ invalid, valid }) => (invalid ? variable.colorAlert : valid ? variable.colorPrimaryHover : variable.colorGray)};
    top: calc(50%);
    transition: fill ${variable.transition}, opacity ${variable.transition}, stroke ${variable.transition};
    z-index: ${({ invalid, valid }) => (invalid || valid ? 3 : 2)};
`;
