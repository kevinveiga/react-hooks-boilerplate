import styled, { css } from 'styled-components';

import { variable } from '../../style/variable';

export const ModalMessageStyled = styled.div`
    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorPrimary)};
    border-radius: ${variable.borderRadius};
    bottom: 25px;
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent3};
    color: ${({ color }) => (color ? variable[color] : variable.colorWhite)};
    opacity: 0;
    padding: ${variable.spacingSM} ${variable.spacingMD};
    pointer-events: none;
    position: fixed;
    right: -25px;
    transition: opacity ${variable.transitionSlow}, right ${variable.transitionSlow};
    z-index: -1;

    ${({ text }) =>
        text &&
        css`
            opacity: 0.8;
            right: 25px;
            z-index: 5;
        `};
`;
