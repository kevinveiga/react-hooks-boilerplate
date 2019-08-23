import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const HeaderMenuLinkToStyled = styled(NavLink)`
    ${layout};
    ${space};
    ${typography};

    &:hover {
        color: ${variable.colorPrimary};
    }

    &.active {
        color: ${variable.colorPrimary};
    }
`;
