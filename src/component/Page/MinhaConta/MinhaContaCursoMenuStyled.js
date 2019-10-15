import styled, { css } from 'styled-components';
import { border, flexbox, grid, layout, space, typography } from 'styled-system';

import { variable } from '../../../style/variable';

export const MinhaContaCursoMenuCellStyled = styled.div`
    ${grid};
    ${layout};
    ${space};
    align-items: center;
    background-color: 'transparent';
    border-top: 1px solid ${variable.colorWhite};
    cursor: pointer;
    display: flex;
    height: 75px;
    justify-content: space-between;
    padding: 0 ${variable.spacingMD};
    transition: background-color ${variable.transition};

    ${({ hover }) =>
        hover &&
        css`
            &:hover {
                background-color: ${variable.colorPrimary};
            }
        `};
`;

export const MinhaContaCursoMenuStyled = styled.div`
    ${border};
    ${flexbox};
    ${layout};
    ${space};
    ${typography};
    background-color: ${variable.colorGrayLight3};
    min-height: 200px;
    overflow: hidden;
    width: 100%;
    z-index: 2;
`;

export const MinhaContaCursoMenuButtonStyled = styled.button`
    margin-bottom: 35px;
    margin-left: auto;
    text-decoration: underline;
    transition: color ${variable.transition};

    &:hover {
        color: ${variable.colorPrimaryHover};
    }
`;
