import React from 'react';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { Button } from '../../Button/Button';
import { CarrinhoCupom } from './CarrinhoCupom';

import { Box } from '../../../style/flex';
import { P } from '../../../style/text';

export const CarrinhoTotal = () => {
    // CONTEXT
    const { stateCarrinhoContext } = useCarrinho();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    return (
        <Box backgroundColor="colorWhite" p={3}>
            <Box>
                <P color="colorGray2">Total:</P>

                <P fontSize="26px" fontWeight="700" mt={2}>
                    R$ {carrinho.valor_total_desconto}
                </P>

                <P color="colorGray2" mb={3}>
                    <s>R$ {carrinho.valor_total}</s>
                </P>

                <Button my={{ d: 4, md: 5 }} text="Finalizar Compra" width={{ d: '100%', sm: 'auto', md: '100%' }} />
            </Box>

            <Box>
                <CarrinhoCupom />
            </Box>
        </Box>
    );
};
