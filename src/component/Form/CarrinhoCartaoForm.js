import React, { memo, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { createCardTransactionPromise } from '../../service/pagarme';

import { useCarrinho } from '../../store/carrinho/carrinho';
import { usePagarme } from '../../store/pagarme/pagarme';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { pagarmeResponseError } from '../../util/pagarmeResponseError';
import { pagarmeResponseStatus } from '../../util/pagarmeResponseStatus';
import { paymentType } from '../../util/paymentType';

import { InputMaskValidation, InputValidation, Label, Select } from './Form';
import { OptionParcelas } from './OptionParcelas';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCartaoForm = memo(({ formaPagamentoObj, formId, ...otherProps }) => {
    // CONST
    const CARTAO_CVV = 'cartao_cvv';
    const CARTAO_DATA = 'cartao_data';
    const CARTAO_NOME = 'cartao_nome';
    const CARTAO_NUMERO = 'cartao_numero';
    const CARTAO_PARCELA = 'cartao_parcela';
    const CPF = 'cpf';

    // CONTEXT
    const { stateCarrinhoContext, handleFormaPagamentoContext } = useCarrinho();
    const { setStateLoaderPagarmeContext } = usePagarme();

    const carrinho = stateCarrinhoContext.data && stateCarrinhoContext.data.data;

    // ACTION
    useEffect(() => {
        register(CARTAO_CVV, { ...customValidate.cardCvv, ...customValidate.require });
        register(CARTAO_DATA, { ...customValidate.cardDate, ...customValidate.require });
        register(CARTAO_NOME, { ...customValidate.name, ...customValidate.require });
        register(CARTAO_NUMERO, { ...customValidate.cardNumber, ...customValidate.require });
        register(CARTAO_PARCELA, { ...customValidate.require });
        register(CPF, { ...customValidate.cpf, ...customValidate.require });

        return () => {
            unregister(CARTAO_CVV);
            unregister(CARTAO_DATA);
            unregister(CARTAO_NOME);
            unregister(CARTAO_NUMERO);
            unregister(CARTAO_PARCELA);
            unregister(CPF);
        };
    }, [register, unregister]);

    // Ao inicializar o select, atualiza os dados da forma de pagamento no Contexto de Estado do CarrinhoProvider
    useEffect(() => {
        const element = document.getElementById(`${CARTAO_PARCELA}SelectId`);

        setValue(element.name, element.value);

        handleFormaPagamentoContext(JSON.parse(element.options[element.selectedIndex].getAttribute('data-obj')));
    }, [handleFormaPagamentoContext, setValue]);

    // FUNCTION
    // Atualiza os dados da forma de pagamento no Contexto de Estado do CarrinhoProvider
    const handleSetValue = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);

            handleFormaPagamentoContext(JSON.parse(element.target.options[element.target.selectedIndex].getAttribute('data-obj')));
        },
        [handleFormaPagamentoContext, setValue]
    );

    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
            triggerValidation([element.target.name]);
        },
        [setValue, triggerValidation]
    );

    // FORM
    const {
        errors,
        formState: { touched },
        handleSubmit,
        register,
        setError,
        setValue,
        triggerValidation,
        unregister
    } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        setStateLoaderPagarmeContext(true);

        createCardTransactionPromise(formData, carrinho)
            .then((response) => {
                if (response.errors) {
                    setError('invalid', 'notMatch', pagarmeResponseError(response.errors));
                }

                if (response.status === 'authorized') {
                    window.location.assign(`/carrinho-retorno/${paymentType.cartaoCredito}`);
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

                <Cell gridColumn={'1 / span 3'}>
                    <Label color="colorGray2" mb="-15px" text="Seu nome no cartão" />

                    <div>
                        <InputValidation
                            error={errors[CARTAO_NOME]}
                            maxLength="50"
                            name={CARTAO_NOME}
                            onChange={handleValidation()}
                            placeholder="Seu nome exatamente como está no cartão"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors[CARTAO_NOME] && <InvalidInputMessageStyled>{errors[CARTAO_NOME].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CPF" />

                    <div>
                        <InputMaskValidation
                            error={errors[CPF]}
                            mask={customMaskRegex.cpf}
                            maxLength="14"
                            name={CPF}
                            onChange={handleValidation()}
                            placeholder="000.000.000-00"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors[CPF] && <InvalidInputMessageStyled>{errors[CPF].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Número do cartão" />

                    <div>
                        <InputMaskValidation
                            error={errors[CARTAO_NUMERO]}
                            mask={customMaskRegex.cardNumber}
                            maxLength="19"
                            name={CARTAO_NUMERO}
                            onChange={handleValidation()}
                            placeholder="0000 0000 0000 0000"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors[CARTAO_NUMERO] && <InvalidInputMessageStyled>{errors[CARTAO_NUMERO].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'3 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="Mês/Ano" />

                    <div>
                        <InputMaskValidation
                            error={errors[CARTAO_DATA]}
                            mask={customMaskRegex.cardDate}
                            maxLength="7"
                            name={CARTAO_DATA}
                            onChange={handleValidation()}
                            placeholder="MM/AAAA"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors[CARTAO_DATA] && <InvalidInputMessageStyled>{errors[CARTAO_DATA].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CVV" />

                    <div>
                        <InputMaskValidation
                            error={errors[CARTAO_CVV]}
                            mask={customMaskRegex.cardCvv}
                            maxLength="3"
                            name={CARTAO_CVV}
                            onChange={handleValidation()}
                            placeholder="000"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors[CARTAO_CVV] && <InvalidInputMessageStyled>{errors[CARTAO_CVV].message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Escolha como você quer pagar (parcelamento)" />

                    <div>
                        <Select
                            id={`${CARTAO_PARCELA}SelectId`}
                            name={CARTAO_PARCELA}
                            obj={{
                                color: 'colorGrayDark',
                                fontWeight: '700'
                            }}
                            onChange={handleSetValue()}
                            {...otherProps}
                        >
                            <OptionParcelas cardObj={formaPagamentoObj} totalValue={carrinho.valor_total_desconto} />
                        </Select>
                    </div>

                    {errors[CARTAO_PARCELA] && <InvalidInputMessageStyled>{errors[CARTAO_PARCELA].message}</InvalidInputMessageStyled>}
                </Cell>
            </Grid>
        </FormStyled>
    );
});
