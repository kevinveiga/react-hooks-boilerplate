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

            &.active {
                color: ${variable[obj.hoverColor]};
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
