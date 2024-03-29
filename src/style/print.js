import styled, { css } from 'styled-components';

export const printHide = css`
    @media print {
        display: none;
    }
`;

export const printShow = css`
    display: none;

    @media print {
        display: block;
    }
`;

export const PrintPageBreakAfter = styled.div`
    ${printShow};

    page-break-after: always;
`;

export const PrintPageBreakBefore = styled.div`
    ${printShow};

    page-break-before: always;
`;
