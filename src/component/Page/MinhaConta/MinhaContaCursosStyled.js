import styled, { css } from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../../style/variable';

export const MinhaContaCursosTabsContentStyled = styled.ul``;

export const MinhaContaCursosTabContentStyled = styled.li`
    opacity: 1;
    position: relative;
    transform: translate3d(0, 0, 0);
    visibility: visible;
    z-index: 1;
`;

export const MinhaContaCursosSelectStyled = styled.div`
    ${space};
    margin-left: auto;
    margin-right: auto;

    select {
        background: transparent;
        border-radius: 25px;
        border: 3px solid ${variable.colorBlack3};
        color: ${variable.colorBlack3};
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        height: 45px;
        line-height: 40px;
        min-width: 100px;
        max-width: 100%;
        padding: 0 45px 0 25px;
        text-align: center;
        text-align-last: center;
        text-transform: uppercase;
        transition: background-color 250ms ease-in-out, border 250ms ease-in-out, color 250ms ease-in-out;
        vertical-align: middle;
        white-space: nowrap;
        width: auto;

        option {
            background-color: ${variable.colorWhite};
            color: ${variable.colorSecondary};
        }
    }

    svg {
        pointer-events: none;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        transition: fill ${variable.transition}, stroke ${variable.transition};
        z-index: 2;
    }
`;
