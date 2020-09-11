import React, { memo, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { createBilletTransactionPromise } from '../../service/pagarme';

import { useCarrinho } from '../../store/carrinho/carrinho';
import { usePagarme } from '../../store/pagarme/pagarme';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { pagarmeResponseError } from '../../util/pagarmeResponseError';
import { pagarmeResponseStatus } from '../../util/pagarmeResponseStatus';
import { paymentType } from '../../util/paymentType';

import { InputMaskValidation, Label } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const CarrinhoBoletoForm = memo(({ formId, ...otherProps }) => {
    // CONST
    const CPF = 'cpf';

    // CONTEXT
    const { stateCarrinhoContext, handleFormaPagamentoContext } = useCarrinho();
    const { setStateLoaderPagarmeContext } = usePagarme();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    // ACTION
    // Ao inicializar, atualiza os dados da forma de pagamento no Contexto de Estado do CarrinhoProvider
    useEffect(() => {
        handleFormaPagamentoContext({ valor_total: carrinho.valor_total_desconto || carrinho.valor_total });
    }, [handleFormaPagamentoContext, carrinho.valor_total_desconto, carrinho.valor_total]);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setError
    } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        setStateLoaderPagarmeContext(true);

        createBilletTransactionPromise(formData, carrinho)
            .then((response) => {
                if (response.errors) {
                    setError('invalid', 'notMatch', pagarmeResponseError(response.errors));
                }

                if (response.status === 'authorized') {
                    window.location.assign(`/carrinho-retorno/${paymentType.boleto}/${response.boleto_url}`);
                } else {
                    setError('invalid', 'notMatch', pagarmeResponseStatus(response.status));
                }

                setStateLoaderPagarmeContext(false);
            })
            .catch((error) => {
                setError('invalid', 'notMatch', pagarmeResponseError(error));

                setStateLoaderPagarmeContext(false);
            });
    };

    return (
        <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridColumnGap={5} gridRowGap={4} gridTemplateColumns="1fr 1fr 1fr 1fr" px={5} py={3}>
                <Cell gridColumn={'1 / span 4'}>
                    <InvalidResponseMessageContainerStyled>
                        {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                    </InvalidResponseMessageContainerStyled>
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="CPF" />

                    <div>
                        <Controller
                            as={
                                <InputMaskValidation
                                    error={errors[CPF]}
                                    mask={customMaskRegex.cpf}
                                    maxLength="14"
                                    placeholder="000.000.000-00"
                                    pr={4}
                                    touched={touched}
                                    {...otherProps}
                                />
                            }
                            control={control}
                            name={CPF}
                            rules={{ ...customValidate.cpf, ...customValidate.require }}
                        />
                    </div>

                    {errors[CPF] && <InvalidInputMessageStyled>{errors[CPF].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 4'}>
                    <P fontSize="14px">
                        Salve seu boleto ele é pagável em qualquer banco até o vencimento. Você obterá acesso ao curso dentro de 3 a 7 dias úteis após
                        o pagamento.
                    </P>
                </Cell>
            </Grid>
        </FormStyled>
    );
});
