import React from 'react';

import { Svg } from '../../Svg/Svg';

import { CarrinhoBreadcrumbBoxStyled, CarrinhoBreadcrumbLineStyled } from './CarrinhoBreadcrumbStyled';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoBreadcrumb = ({ step }) => {
    return (
        <>
            <Grid alignItems="center" display="grid" gridColumnGap={2} gridTemplateColumns="auto 3fr auto 3fr auto">
                <Cell pl={3}>
                    <CarrinhoBreadcrumbBoxStyled active={step === 'cart' && true}>
                        <Svg fill="colorPrimary" name="svg-cart" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbLineStyled />
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbBoxStyled active={step === 'user' && true}>
                        <Svg fill="colorPrimary" name="svg-user" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>

                <Cell>
                    <CarrinhoBreadcrumbLineStyled />
                </Cell>

                <Cell pr={3}>
                    <CarrinhoBreadcrumbBoxStyled active={step === 'payment' && true}>
                        <Svg fill="colorPrimary" name="svg-payment" />
                    </CarrinhoBreadcrumbBoxStyled>
                </Cell>
            </Grid>

            <Grid alignItems="center" display="grid" gridColumnGap={2} gridTemplateColumns="75px 3fr 75px 3fr 75px">
                <Cell>
                    <Box>
                        <Span fontSize="14px">Carrinho</Span>
                    </Box>
                </Cell>

                <Cell />

                <Cell justifySelf="center">
                    <Box>
                        <Span fontSize="14px">Cadastro</Span>
                    </Box>
                </Cell>

                <Cell />

                <Cell justifySelf="flex-end">
                    <Box>
                        <Span fontSize="14px">Pagamento</Span>
                    </Box>
                </Cell>
            </Grid>
        </>
    );
};
