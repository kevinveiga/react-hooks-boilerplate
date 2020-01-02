import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

import { variable } from '../../style/variable';

export const BreadcrumbStyled = styled.ul`
    ${space};
`;

export const BreadcrumbItemStyled = styled.li`
    ${layout};
    ${typography};
    max-width: 300px;
    overflow: hidden;
    table-layout: fixed;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;

    @media (min-width: ${variable.lg}) {
        max-width: 700px;
    }
`;
