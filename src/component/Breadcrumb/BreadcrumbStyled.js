import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const BreadcrumbStyled = styled.ul`
    ${space};
`;

export const BreadcrumbItemStyled = styled.li`
    ${layout};
    ${typography};

    overflow: hidden;
    table-layout: fixed;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
`;
