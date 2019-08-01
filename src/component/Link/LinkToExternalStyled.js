import styled, { css } from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const LinkToExternalStyled = styled.a`
    ${layout};
    ${space};
    ${typography};

    ${(props) =>
        props.hover === 'primary' &&
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
