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
        obj.activeNav &&
        css`
            &.active {
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
        obj.hoverLine &&
        css`
            &::after {
                background-color: ${variable[obj.hoverLine]};
                bottom: 0;
                content: ' ';
                display: block;
                height: 3px;
                margin: 5px auto auto auto;
                transition: width ${variable.transition};
                width: 0;
            }

            &:hover {
                &::after {
                    width: 50%;
                }
            }
        `};

    ${({ obj }) =>
        obj &&
        obj.activeNav &&
        obj.hoverLine &&
        css`
            &.active {
                &::after {
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
