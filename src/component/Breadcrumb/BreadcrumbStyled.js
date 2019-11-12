import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

export const BreadcrumbStyled = styled.ul`
    ${space};
`;

export const BreadcrumbItemStyled = styled.li`
    ${layout};
    ${typography};
    max-width: 300px;
    overflow-x: hidden;
    table-layout: fixed;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
`;
