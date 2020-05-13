import styled, { css } from 'styled-components';

import { Cell } from '../../../style/grid';
import { variable } from '../../../style/variable';

export const CarrinhoFormasPagamentoCellStyled = styled(Cell)`
    height: 55px;
    overflow-y: hidden;
    transition: height ${variable.transition};

    ${({ active }) =>
        active &&
        css`
            height: 100%;
        `};
`;
