import React, { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useCarrinho } from '../../store/carrinho/carrinho';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { InputMaskValidation, InputValidation, Label, Select } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCartaoForm = ({ formId, ...otherProps }) => {
    // ACTION
    const { handleAddCarrinhoCupomContext } = useCarrinho();

    useEffect(() => {
        register('cartao_cvv', { ...customValidate.cardCvv, ...customValidate.require });
        register('cartao_data', { ...customValidate.cardDate, ...customValidate.require });
        register('cartao_nome', { ...customValidate.name, ...customValidate.require });
        register('cartao_numero', { ...customValidate.cardNumber, ...customValidate.require });
        register('cartao_parcela', { ...customValidate.require });
        register('cpf', { ...customValidate.cpf, ...customValidate.require });

        return () => {
            unregister('cartao_cvv');
            unregister('cartao_data');
            unregister('cartao_nome');
            unregister('cartao_numero');
            unregister('cartao_parcela');
            unregister('cpf');
        };
    }, [register, unregister]);

    // FUNCTION
    const handleSetValue = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
        },
        [setValue]
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
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {
        handleAddCarrinhoCupomContext(formData.cupom, setError);
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
                            error={errors.cartao_nome}
                            maxLength="50"
                            name="cartao_nome"
                            onChange={handleValidation()}
                            placeholder="Seu nome exatamente como está no cartão"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors.cartao_nome && <InvalidInputMessageStyled>{errors.cartao_nome.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CPF" />

                    <div>
                        <InputMaskValidation
                            error={errors.cpf}
                            mask={customMaskRegex.cpf}
                            maxLength="14"
                            name="cpf"
                            onChange={handleValidation()}
                            placeholder="000.000.000-00"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors.cpf && <InvalidInputMessageStyled>{errors.cpf.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Número do cartão" />

                    <div>
                        <InputMaskValidation
                            error={errors.cartao_numero}
                            mask={customMaskRegex.cardNumber}
                            maxLength="19"
                            name="cartao_numero"
                            onChange={handleValidation()}
                            placeholder="0000 0000 0000 0000"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors.cartao_numero && <InvalidInputMessageStyled>{errors.cartao_numero.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'3 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="Mês/Ano" />

                    <div>
                        <InputMaskValidation
                            error={errors.cartao_data}
                            mask={customMaskRegex.cardDate}
                            maxLength="7"
                            name="cartao_data"
                            onChange={handleValidation()}
                            placeholder="MM/AAAA"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors.cartao_data && <InvalidInputMessageStyled>{errors.cartao_data.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'4 / span 1'}>
                    <Label color="colorGray2" mb="-15px" text="CVV" />

                    <div>
                        <InputMaskValidation
                            error={errors.cartao_cvv}
                            mask={customMaskRegex.cardCvv}
                            maxLength="3"
                            name="cartao_cvv"
                            onChange={handleValidation()}
                            placeholder="000"
                            pr={4}
                            touched={touched}
                            {...otherProps}
                        />
                    </div>

                    {errors.cartao_cvv && <InvalidInputMessageStyled>{errors.cartao_cvv.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell gridColumn={'1 / span 2'}>
                    <Label color="colorGray2" mb="-15px" text="Escolha como você quer pagar (parcelamento)" />

                    <div>
                        <Select
                            name="cartao_parcela"
                            obj={{
                                color: 'colorGrayDark',
                                fontWeight: '700'
                            }}
                            onChange={handleSetValue()}
                            value="1"
                            {...otherProps}
                        >
                            <option value="1">1x de 100,00 s/ juros</option>
                            <option value="2">2x de 50,00 s/ juros</option>
                            <option value="3">3x de 33,33 s/ juros</option>
                            <option value="4">4x de 25,00 s/ juros</option>
                            <option value="5">5x de 20,00 s/ juros</option>
                            <option value="6">6x de 16,66 s/ juros</option>
                            <option value="7">7x de 14,28 s/ juros</option>
                            <option value="8">8x de 12,50 s/ juros</option>
                            <option value="9">9x de 11,11 s/ juros</option>
                            <option value="10">10x de 10,00 s/ juros</option>
                        </Select>
                    </div>

                    {errors.cartao_parcela && <InvalidInputMessageStyled>{errors.cartao_parcela.message}</InvalidInputMessageStyled>}
                </Cell>
            </Grid>
        </FormStyled>
    );
};
