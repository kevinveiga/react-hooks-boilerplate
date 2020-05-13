import styled, { css } from 'styled-components';

import { variable } from '../../../style/variable';

export const CarrinhoBreadcrumbBoxStyled = styled.div`
    border-radius: ${variable.borderRadius};
    padding: 6px;

    ${({ active }) =>
        active &&
        css`
            background-color: ${variable.colorPrimary};

            > svg {
                fill: ${variable.colorWhite};
            }
        `};
`;

export const CarrinhoBreadcrumbLineStyled = styled.hr`
    margin: auto;
`;
