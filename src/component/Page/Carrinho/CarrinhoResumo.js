import React, { useCallback } from 'react';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { paymentType } from '../../../util/paymentType';

import { Button } from '../../Button/Button';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Line } from '../../../style/line';
import { P, Span } from '../../../style/text';

export const CarrinhoResumo = () => {
    // CONTEXT
    const { stateCarrinhoContext } = useCarrinho();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    // FUNCTION
    const handleFinalizarCompra = useCallback(
        () => () => {
            // Submeter o formulário pelo ID
            if (carrinho.forma_pagamento_tipo) {
                document.getElementById(`${carrinho.forma_pagamento_tipo}FormId`).dispatchEvent(new Event('submit', { cancelable: true }));
            }
        },
        [carrinho]
    );

    return (
        <Box backgroundColor="colorWhite" fontSize="18px" p={3}>
            <Grid display="grid" gridColumnGap={2} gridRowGap={1} gridTemplateColumns="1fr 1fr">
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
                        R$ {carrinho.valor_total}
                    </Span>
                </Cell>

                <Cell gridColumn={1}>
                    <Span color="colorGray2" fontSize="14px">
                        Desconto:
                    </Span>
                </Cell>

                <Cell gridColumn={2} justifySelf="flex-end">
                    <Span color="colorGray2" fontSize="14px">
                        R$ {carrinho.valor_total_desconto}
                    </Span>
                </Cell>

                <Cell gridColumn={'1 / span 2'} mb={2}>
                    <Line height="1px" width="100%" />
                </Cell>
            </Grid>

            <Grid display="grid" gridColumnGap={2} gridRowGap={1} gridTemplateColumns="1fr 4fr" gridTemplateRows="minmax(50px, auto) auto">
                <Cell gridColumn={1}>
                    <Span color="colorGray2">Total:</Span>
                </Cell>

                <Cell gridColumn={2}>
                    <>
                        {carrinho.forma_pagamento_tipo === paymentType.cartaoCredito && (
                            <>
                                <P textAlign="right">
                                    {`${carrinho.forma_pagamento.parcelas_quantidade}x R$ ${carrinho.forma_pagamento.parcelas_valor}`}
                                </P>

                                <P color="colorGray2" fontSize="14px" mt={0} textAlign="right">
                                    {`${carrinho.forma_pagamento.juros} = R$ ${carrinho.forma_pagamento.valor_total}`}
                                </P>
                            </>
                        )}

                        {carrinho.forma_pagamento_tipo === paymentType.boleto && (
                            <P textAlign="right">{`R$ ${carrinho.forma_pagamento.valor_total}`}</P>
                        )}
                    </>
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Button
                        disabled={!carrinho.forma_pagamento_tipo || false}
                        onClick={handleFinalizarCompra()}
                        text="Finalizar Compra"
                        width={{ d: '100%', sm: 'auto', md: '100%' }}
                    />
                </Cell>
            </Grid>
        </Box>
    );
};
