import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const LinkToExternalStyled = styled.a`
    ${layout};
    ${space};
    ${typography};
    ${({ color }) => color && `color: ${variable[color]}`};
    ${({ underline }) => underline && 'text-decoration: underline'};
    transition: color ${variable.transition};

    ${({ hoverColor }) =>
        hoverColor &&
        css`
            &:hover {
                color: ${variable[hoverColor]};

                > span {
                    color: ${variable[hoverColor]};
                }

                > svg {
                    fill: ${variable[hoverColor]};
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
