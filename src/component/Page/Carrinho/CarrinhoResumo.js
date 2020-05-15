import React from 'react';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { Button } from '../../Button/Button';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Line } from '../../../style/line';
import { Span } from '../../../style/text';

export const CarrinhoResumo = () => {
    // ACTION
    const { stateCarrinhoContext } = useCarrinho();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    return (
        <Box backgroundColor="colorWhite" fontSize="18px" p={3}>
            <Grid display="grid" gridColumnGap={2} gridRowGap={1} gridTemplateColumns="2fr 2fr">
                <Cell gridColumn={1}>
                    <b>Resumo:</b>
                </Cell>

                <Cell gridColumn={1}>
                    <Span color="colorGray2" fontSize="14px">
                        Preço Original:
                    </Span>
                </Cell>

                <Cell gridColumn={2} justifySelf="flex-end">
                    <Span color="colorGray2" fontSize="14px">
                        R$ {carrinho.total}
                    </Span>
                </Cell>

                <Cell gridColumn={1}>
                    <Span color="colorGray2" fontSize="14px">
                        Desconto:
                    </Span>
                </Cell>

                <Cell gridColumn={2} justifySelf="flex-end">
                    <Span color="colorGray2" fontSize="14px">
                        R$ {carrinho.total_desconto}
                    </Span>
                </Cell>

                <Cell gridColumn={'1 / span 2'} mb={2}>
                    <Line height="1px" width="100%" />
                </Cell>

                <Cell gridColumn={1}>
                    <Span color="colorGray2">Total:</Span>
                </Cell>

                <Cell gridColumn={2} justifySelf="flex-end">
                    <b>
                        {carrinho.parcelas_numero}x R$ {carrinho.parcelas_valor}
                    </b>
                </Cell>

                <Cell gridColumn={'1 / span 2'} mt={2}>
                    <Button text="Finalizar Compra" width={{ d: '100%', sm: 'auto', md: '100%' }} />
                </Cell>
            </Grid>
        </Box>
    );
};
