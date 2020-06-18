import React from 'react';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { CarrinhoCupomForm } from '../../Form/CarrinhoCupomForm';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { P, Span } from '../../../style/text';

export const CarrinhoCupom = () => {
    // CONTEXT
    const { handleCarrinhoCupomRemoveContext, stateCarrinhoContext } = useCarrinho();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    return (
        <>
            <Span>Cupom de desconto</Span>

            <CarrinhoCupomForm />

            <Box my={4}>
                {carrinho.cupom ? (
                    <Grid alignItems="center" display="grid" gridColumnGap={4} gridTemplateColumns="1fr auto">
                        <Cell>
                            Cupom:
                            <br />
                            <Span fontWeight="700">{carrinho.cupom}</Span>
                            <br />
                            <Span color="colorGray2">foi aplicado</Span>
                        </Cell>

                        <Cell>
                            <Svg
                                fill="colorGray2"
                                height="23px"
                                name="svg-trash"
                                obj={{ hoverColor: 'colorPrimary' }}
                                onClick={handleCarrinhoCupomRemoveContext(carrinho.cupom)}
                            />
                        </Cell>
                    </Grid>
                ) : (
                    <P color="colorGray2" fontSize="14px">
                        Nenhum cupom aplicado
                    </P>
                )}
            </Box>
        </>
    );
};
