import React, { useCallback, useState } from 'react';

import { CarrinhoFormasPagamentoCellStyled } from './CarrinhoFormasPagamentoStyled';
import { CarrinhoCartaoCreditoForm } from '../../Form/CarrinhoCartaoCreditoForm';
import { InputCheckboxRadio } from '../../Form/Form';
import { Svg } from '../../Svg/Svg';

import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoFormasPagamento = () => {
    const [stateFormaPagamento, setStateFormaPagamento] = useState(null);

    // FUNCTION
    const handleSetValueChecked = useCallback(
        () => (element) => {
            setStateFormaPagamento(element.target.value);
        },
        []
    );

    return (
        <Grid alignItems="center" display="grid" gridAutoRows="minmax(55px, auto)" gridRowGap={3}>
            <Cell>Pagamento</Cell>

            <CarrinhoFormasPagamentoCellStyled
                alignSelf="flex-start"
                active={stateFormaPagamento === 'cartao_credito'}
                backgroundColor="colorWhite"
                p={3}
            >
                <InputCheckboxRadio
                    color="colorGray2"
                    id="cartao_credito"
                    name="forma_pagamento"
                    onChange={handleSetValueChecked()}
                    value="cartao_credito"
                    typeInput="radio"
                >
                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                    <Span fontWeight="700" verticalAlign="middle">
                        Cartão de Crédito
                    </Span>
                </InputCheckboxRadio>

                <CarrinhoCartaoCreditoForm />
            </CarrinhoFormasPagamentoCellStyled>

            <CarrinhoFormasPagamentoCellStyled alignSelf="flex-start" active={stateFormaPagamento === 'boleto'} backgroundColor="colorWhite" p={3}>
                <InputCheckboxRadio
                    color="colorGray2"
                    id="boleto"
                    name="forma_pagamento"
                    onChange={handleSetValueChecked()}
                    value="boleto"
                    typeInput="radio"
                >
                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                    <Span fontWeight="700" verticalAlign="middle">
                        Boleto
                    </Span>
                </InputCheckboxRadio>
            </CarrinhoFormasPagamentoCellStyled>
        </Grid>
    );
};
