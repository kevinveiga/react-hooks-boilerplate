import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const LinkToStyled = styled(NavLink)`
    ${layout};
    ${space};
    ${typography};
    ${({ color }) => color && `color: ${variable[color]}`};
    ${({ obj }) => obj && obj.underline && 'text-decoration: underline'};
    transition: color ${variable.transition};

    &::after {
        bottom: 0;
        content: ' ';
        display: block;
        height: 3px;
        margin: 5px auto auto auto;
        transition: background-color ${variable.transition}, width ${variable.transition};
        width: 0;
    }

    ${({ obj }) =>
        obj &&
        obj.activeColor &&
        css`
            &.active {
                color: ${variable[obj.activeColor]};

                > span {
                    color: ${variable[obj.activeColor]};
                }

                > svg {
                    fill: ${variable[obj.activeColor]};
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.hoverColor &&
        css`
            &:hover {
                color: ${variable[obj.hoverColor]};

                > span {
                    color: ${variable[obj.hoverColor]};
                }

                > svg {
                    fill: ${variable[obj.hoverColor]};
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.activeColor &&
        obj.hoverColorLine &&
        css`
            &::after {
                background-color: ${variable[obj.activeColor]};
            }

            &.active {
                &::after {
                    width: 50%;
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.hoverColorLine &&
        css`
            &:hover {
                &::after {
                    background-color: ${variable[obj.hoverColorLine]};
                    width: 50%;
                }
            }
        `};

    > span {
        transition: color ${variable.transition};
        vertical-align: middle;
    }

    > svg {
        transition: fill ${variable.transition};
    }
`;
