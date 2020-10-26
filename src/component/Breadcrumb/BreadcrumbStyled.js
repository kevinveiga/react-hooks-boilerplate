import styled from 'styled-components';
import { layout, space, typography } from 'styled-system';

export const BreadcrumbItemStyled = styled.li`
    ${layout};
    ${typography};

    overflow: hidden;
    table-layout: fixed;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
`;

export const BreadcrumbListStyled = styled.ul`
    ${space};
`;
