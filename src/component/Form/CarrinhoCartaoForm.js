import React, { memo, useCallback, useEffect, useRef } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { createCardTransactionPromise } from '../../service/pagarme';

import { useCarrinho } from '../../store/carrinho/carrinho';
import { usePagarme } from '../../store/pagarme/pagarme';

import { customValidate } from '../../util/customValidate';
import { pagarmeResponseError } from '../../util/pagarmeResponseError';
import { pagarmeResponseStatus } from '../../util/pagarmeResponseStatus';
import { paymentType } from '../../util/paymentType';

import { InputMaskValidation, InputValidation, Label, SelectValidation } from './Form';
import { OptionParcelas } from './OptionParcelas';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCartaoForm = memo(({ formaPagamentoObj, formId, ...props }) => {
    // CONST
    const CARTAO_CVV = 'cartao_cvv';
    const CARTAO_DATA = 'cartao_data';
    const CARTAO_NOME = 'cartao_nome';
    const CARTAO_NUMERO = 'cartao_numero';
    const CARTAO_PARCELA = 'cartao_parcela';
    const CPF = 'cpf';

    // REF
    const cartaoParcelaRef = useRef('');

    // CONTEXT
    const { stateCarrinhoContext, handleFormaPagamentoContext } = useCarrinho();
    const { setStateLoaderPagarmeContext } = usePagarme();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    // ACTION
    // Ao inicializar o select, atualiza os dados da forma de pagamento no Contexto de Estado do CarrinhoProvider
    useEffect(() => {
        handleFormaPagamentoContext(JSON.parse(cartaoParcelaRef.target.options[cartaoParcelaRef.target.selectedIndex].getAttribute('data-obj')));
    }, [handleFormaPagamentoContext]);

    // FUNCTION
    // Atualiza os dados da forma de pagamento no Contexto de Estado do CarrinhoProvider
    const handleSetFormaPagamento = useCallback(
        (element) => {
            handleFormaPagamentoContext(JSON.parse(element.target.options[element.target.selectedIndex].getAttribute('data-obj')));
        },
        [handleFormaPagamentoContext]
    );

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setError
    } = useForm({
        defaultValues: { [CARTAO_NOME]: '', [CPF]: '', [CARTAO_NUMERO]: '', [CARTAO_DATA]: '', [CARTAO_CVV]: '', [CARTAO_PARCELA]: '' },
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        setStateLoaderPagarmeContext(true);

        createCardTransactionPromise(formData, carrinho)
            .then((response) => {
                if (response.errors) {
                    setError('invalid', { type: 'manual', message: pagarmeResponseError(response.errors) });
                }

                if (response.status === 'authorized') {
                    window.location.assign(`/carrinho-retorno/${paymentType.cartaoCredito}`);
                } else {
                    setError('invalid', { type: 'manual', message: pagarmeResponseStatus(response.status) });
                }

                setStateLoaderPagarmeContext(false);
            })
            .catch((error) => {
                setError('invalid', { type: 'manual', message: pagarmeResponseError(error) });

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

                <Cell gridColumn={'1 / span 3'}>
                    <Label color="colorGray2" mb="-15px" text="Seu nome no cartão" />

                    <div>
                        <Controller
                            as={
                                <InputValidation
                                    error={errors[CARTAO_NOME]}
                                    maxLength="50"
                                    placeholder="Seu nome exatamente como está no cartão"
                                    pr={4}
                                    touched={touched}
                                    {...props}
                                />
                            }
                            control={control}
                            name={CARTAO_NOME}
                            rules={{ ...customValidate.name, ...customValidate.require }}
                        />
                    </div>

                    {errors[CARTAO_NOME] && <InvalidInputMessageStyled>{errors[CARTAO_NOME].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CPF" />

                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputMaskValidation
                                        error={errors[CPF]}
                                        format="###.###.###-##"
                                        name={name}
                                        onBlur={onBlur}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        placeholder="000.000.000-00"
                                        pr={4}
                                        touched={touched}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name={CPF}
                            rules={{ ...customValidate.cpf, ...customValidate.require }}
                        />
                    </div>

                    {errors[CPF] && <InvalidInputMessageStyled>{errors[CPF].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Número do cartão" />

                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputMaskValidation
                                        error={errors[CARTAO_NUMERO]}
                                        format="#### #### #### ####"
                                        name={name}
                                        onBlur={onBlur}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        placeholder="0000 0000 0000 0000"
                                        pr={4}
                                        touched={touched}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name={CARTAO_NUMERO}
                            rules={{ ...customValidate.cardNumber, ...customValidate.require }}
                        />
                    </div>

                    {errors[CARTAO_NUMERO] && <InvalidInputMessageStyled>{errors[CARTAO_NUMERO].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'3 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="Mês/Ano" />

                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputMaskValidation
                                        error={errors[CARTAO_DATA]}
                                        format="##/####"
                                        mask={['M', 'M', 'Y', 'Y', 'Y', 'Y']}
                                        name={name}
                                        onBlur={onBlur}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        placeholder="mm/aaaa"
                                        pr={4}
                                        touched={touched}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name={CARTAO_DATA}
                            rules={{ ...customValidate.cardDate, ...customValidate.require }}
                        />
                    </div>

                    {errors[CARTAO_DATA] && <InvalidInputMessageStyled>{errors[CARTAO_DATA].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CVV" />

                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputMaskValidation
                                        error={errors[CARTAO_CVV]}
                                        format="###"
                                        name={name}
                                        onBlur={onBlur}
                                        onValueChange={(values) => {
                                            onChange(values.value);
                                        }}
                                        placeholder="000"
                                        pr={4}
                                        touched={touched}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name={CARTAO_CVV}
                            rules={{ ...customValidate.cardCvv, ...customValidate.require }}
                        />
                    </div>

                    {errors[CARTAO_CVV] && <InvalidInputMessageStyled>{errors[CARTAO_CVV].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Escolha como você quer pagar (parcelamento)" />

                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <SelectValidation
                                        error={errors[CARTAO_PARCELA]}
                                        name={name}
                                        obj={{
                                            color: 'colorGrayDark',
                                            fontWeight: '700'
                                        }}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                            handleSetFormaPagamento(e);
                                        }}
                                        ref={cartaoParcelaRef}
                                        touched={touched}
                                        value={value}
                                        {...props}
                                    >
                                        <OptionParcelas cardObj={formaPagamentoObj} totalValue={carrinho.valor_total_desconto} />
                                    </SelectValidation>
                                );
                            }}
                            control={control}
                            name={CARTAO_PARCELA}
                            rules={{ ...customValidate.require }}
                        />
                    </div>

                    {errors[CARTAO_PARCELA] && <InvalidInputMessageStyled>{errors[CARTAO_PARCELA].message}</InvalidInputMessageStyled>}
                </Cell>
            </Grid>
        </FormStyled>
    );
});
