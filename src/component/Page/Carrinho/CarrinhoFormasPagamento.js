import React, { useCallback, useMemo } from 'react';

import { apiUrlFormasPagamento } from '../../../config';

import { useFormasPagamentoApi } from '../../../service/formasPagamento';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { paymentType } from '../../../util/paymentType';

import { CarrinhoFormasPagamentoCellStyled } from './CarrinhoFormasPagamentoStyled';
import { CarrinhoBoletoForm } from '../../Form/CarrinhoBoletoForm';
import { CarrinhoCartaoForm } from '../../Form/CarrinhoCartaoForm';
import { InputCheckboxRadio } from '../../Form/Form';
import { Svg } from '../../Svg/Svg';

import { Cell, Grid } from '../../../style/grid';
import { Position } from '../../../style/position';
import { Span } from '../../../style/text';

export const CarrinhoFormasPagamento = () => {
    // API
    const stateFormasPagamento = useFormasPagamentoApi(apiUrlFormasPagamento);

    const memoFormasPagamento = useMemo(() => stateFormasPagamento.data && stateFormasPagamento.data.data, [stateFormasPagamento]);
    const formasPagamentoLength = memoFormasPagamento ? memoFormasPagamento.length : 0;

    // CONTEXT
    const { stateCarrinhoContext, handleFormaPagamentoTipoContext } = useCarrinho();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    // FUNCTION
    const handleSetValueChecked = useCallback(
        () => (element) => {
            handleFormaPagamentoTipoContext(element.target.value);
        },
        [handleFormaPagamentoTipoContext]
    );

    const formaPagamentoForm = (formaPagamento) => {
        return {
            [paymentType.boleto]: <CarrinhoBoletoForm formId={`${formaPagamento.tipo}FormId`} />,
            [paymentType.cartaoCredito]: <CarrinhoCartaoForm formaPagamentoObj={formaPagamento} formId={`${formaPagamento.tipo}FormId`} />
        };
    };

    return (
        <Grid alignItems="center" display="grid" gridAutoRows="minmax(55px, auto)" gridRowGap={3}>
            <Cell>Pagamento</Cell>

            {formasPagamentoLength > 0 &&
                memoFormasPagamento.map((formaPagamento) => {
                    return (
                        <CarrinhoFormasPagamentoCellStyled
                            active={formaPagamento.tipo === carrinho.forma_pagamento_tipo}
                            alignSelf="flex-start"
                            backgroundColor="colorWhite"
                            key={formaPagamento.id}
                            p={3}
                        >
                            <InputCheckboxRadio
                                color="colorGray2"
                                id={`${formaPagamento.tipo}RadioId`}
                                name="forma_pagamento"
                                onChange={handleSetValueChecked()}
                                value={formaPagamento.tipo}
                                typeInput="radio"
                            >
                                <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                <Span fontWeight="700" verticalAlign="middle">
                                    {formaPagamento.titulo}
                                </Span>
                            </InputCheckboxRadio>

                            <Position display={{ d: 'none', sm: 'block' }} position="absolute" right="10px" top="15px">
                                <Grid display="grid" gridRowGap={2} justifyItems="center">
                                    <Cell>
                                        {formaPagamento.tipo === paymentType.boleto && <Svg fill="colorGray2" mx={2} name="svg-boleto" />}

                                        {formaPagamento.tipo === paymentType.cartaoCredito && (
                                            <>
                                                <Svg fill="colorGray2" mx={2} name="svg-elo" />
                                                <Svg fill="colorGray2" mx={2} name="svg-mastercard" />
                                                <Svg fill="colorGray2" mx={2} name="svg-visa" />
                                                <Svg fill="colorGray2" mx={2} name="svg-american-express" />
                                            </>
                                        )}
                                    </Cell>
                                </Grid>
                            </Position>

                            {carrinho.forma_pagamento_tipo === paymentType.boleto &&
                                formaPagamento.tipo === carrinho.forma_pagamento_tipo &&
                                formaPagamentoForm(formaPagamento)[paymentType.boleto]}

                            {carrinho.forma_pagamento_tipo === paymentType.cartaoCredito &&
                                formaPagamento.tipo === carrinho.forma_pagamento_tipo &&
                                formaPagamentoForm(formaPagamento)[paymentType.cartaoCredito]}
                        </CarrinhoFormasPagamentoCellStyled>
                    );
                })}
        </Grid>
    );
};
