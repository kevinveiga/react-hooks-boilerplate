import React, { memo, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useCarrinho } from '../../store/carrinho/carrinho';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCupomForm = memo(({ ...props }) => {
    // CONTEXT
    const { handleCarrinhoCupomAddContext } = useCarrinho();

    // ACTION
    useEffect(() => {
        register('cupom', { ...customValidate.require });

        return () => {
            unregister('cupom');
        };
    }, [register, unregister]);

    // FUNCTION
    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
        },
        [setValue]
    );

    // FORM
    const { errors, handleSubmit, register, setError, setValue, unregister } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        handleCarrinhoCupomAddContext(formData.cupom, setError);
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridAutoRows="1fr" gridTemplateColumns="3fr 1fr">
                <Cell gridColumn={'1 / span 2'}>
                    <InvalidResponseMessageContainerStyled>
                        {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                    </InvalidResponseMessageContainerStyled>
                </Cell>

                <Cell gridColumn={1}>
                    <Input height="30px" maxLength="20" name="cupom" onChange={handleValidation()} placeholder="Inserir cupom" {...props} />
                </Cell>

                <Cell gridColumn={2}>
                    <Button
                        height="30px"
                        fontSize="12px"
                        minWidth="auto"
                        mx={{ d: 'auto', xs: 0 }}
                        text="Aplicar"
                        themeSize="small"
                        typeButton="submit"
                    />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
