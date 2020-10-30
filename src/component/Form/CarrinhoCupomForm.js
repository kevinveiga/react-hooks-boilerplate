import React, { memo, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { useCarrinho } from '../../store/carrinho/carrinho';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCupomForm = memo(({ ...props }) => {
    // CONTEXT
    const { handleCarrinhoCupomAddContext } = useCarrinho();

    // ACTION
    const [stateError, setStateError] = useState(false);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        handleCarrinhoCupomAddContext(formData.cupom, setStateError);
    };

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid display="grid" gridAutoRows="1fr" gridTemplateColumns="3fr 1fr">
                <Cell gridColumn={'1 / span 2'}>
                    <ResponseMessageContainerStyled>
                        {stateError && <ResponseMessageStyled>{stateError}</ResponseMessageStyled>}
                    </ResponseMessageContainerStyled>
                </Cell>

                <Cell gridColumn={1}>
                    <Controller
                        as={
                            <InputValidation
                                error={errors.cupom}
                                height="30px"
                                maxLength="20"
                                placeholder="Inserir cupom"
                                touched={touched}
                                {...props}
                            />
                        }
                        control={control}
                        name="cupom"
                        rules={{ ...customValidate.require }}
                    />
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
