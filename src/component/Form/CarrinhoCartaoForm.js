import React, { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useCarrinho } from '../../store/carrinho/carrinho';

import { customValidate } from '../../util/customValidate';

import { InputValidation, Label, SelectValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCartaoForm = ({ ...otherProps }) => {
    // ACTION
    const { handleAddCarrinhoCupomContext } = useCarrinho();

    useEffect(() => {
        register('cartao_cvv', { ...customValidate.require });
        register('cartao_data', { ...customValidate.require });
        register('cartao_nome', { ...customValidate.name, ...customValidate.require });
        register('cartao_numero', { ...customValidate.require });
        register('cartao_parcela', { ...customValidate.require });
        register('cpf', { ...customValidate.require });

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
        <FormStyled onSubmit={handleSubmit(submitForm)}>
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
                        <InputValidation
                            error={errors.cpf}
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
                        <InputValidation
                            error={errors.cartao_numero}
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
                    <Label color="colorGray2" mb="-15px" text="Dia/Ano" />

                    <div>
                        <InputValidation
                            error={errors.cartao_data}
                            maxLength="9"
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
                        <InputValidation
                            error={errors.cartao_cvv}
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
                        <SelectValidation
                            error={errors.cartao_parcela}
                            name="cartao_parcela"
                            obj={{
                                color: touched['cartao_parcela'] ? 'colorGrayDark' : 'colorGray',
                                colorLine: 'colorPrimary',
                                fontWeight: touched['cartao_parcela'] ? '700' : '400'
                            }}
                            onChange={handleValidation()}
                            touched={touched}
                            {...otherProps}
                        >
                            <option value="">UF</option>
                            <option value="ac">AC</option>
                        </SelectValidation>
                    </div>

                    {errors.cartao_parcela && <InvalidInputMessageStyled>{errors.cartao_parcela.message}</InvalidInputMessageStyled>}
                </Cell>
            </Grid>
        </FormStyled>
    );
};
