import React from 'react';

import { Svg } from '../../Svg/Svg';

import { CarrinhoBreadcrumbBoxStyled, CarrinhoBreadcrumbLineStyled } from './CarrinhoBreadcrumbStyled';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoBreadcrumb = () => {
    return (
        <>
            <Grid alignItems="center" display="grid" gridColumnGap={2} gridTemplateColumns="auto 3fr auto 3fr auto" justifyContent="center">
                <Cell>
                    <CarrinhoBreadcrumbBoxStyled active={true}>
                        <Svg fill="colorPrimary" name="svg-cart" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbLineStyled />
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbBoxStyled active={true}>
                        <Svg fill="colorPrimary" name="svg-user" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbLineStyled />
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbBoxStyled active={true}>
                        <Svg fill="colorPrimary" name="svg-payment" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>
            </Grid>

            <Grid alignItems="center" display="grid" gridColumnGap={2} gridTemplateColumns="1fr 1fr 1fr" justifyItems="center">
                <Cell>
                    <Box>
                        <Span fontSize="14px">Carrinho</Span>
                    </Box>
                </Cell>

                <Cell>
                    <Box>
                        <Span fontSize="14px">Cadastro</Span>
                    </Box>
                </Cell>

                <Cell>
                    <Box>
                        <Span fontSize="14px">Pagamento</Span>
                    </Box>
                </Cell>
            </Grid>
        </>
    );
};
