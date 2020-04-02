import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCupomForm = ({ ...props }) => {
    // ACTION
    useEffect(() => {
        register('cupom');

        return undefined;
    }, [register]);

    // FORM
    const { handleSubmit, register } = useForm({
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {};

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridTemplateColumns="3fr 1fr">
                <Cell>
                    <Input height="30px" maxLength="20" name="cupom" placeholder="Inserir cupom" {...props} />
                </Cell>

                <Cell>
                    <Button height="30px" fontSize="12px" minWidth="auto" mx={{ d: 'auto', xs: 0 }} text="Aplicar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
