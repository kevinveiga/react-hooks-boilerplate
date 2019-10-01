import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const LinkToStyled = styled(Link)`
    ${layout};
    ${space};
    ${typography};
    ${({ underline }) => underline && 'text-decoration: underline'};

    ${({ hover }) =>
        hover === 'primary' &&
        css`
            &:hover {
                > span {
                    color: ${variable.colorPrimary};
                }
                > svg {
                    fill: ${variable.colorPrimary};
                }
            }
        `};

    > span {
        transition: color ${variable.transition};
        vertical-align: middle;
    }
`;
