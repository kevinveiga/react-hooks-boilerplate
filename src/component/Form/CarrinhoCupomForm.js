import React, { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const CarrinhoCupomForm = ({ ...props }) => {
    // ACTION
    useEffect(() => {
        register('query');

        return undefined;
    }, [register]);

    // FUNCTION
    const keyPress = useCallback(
        (fn) => (element) => {
            if (element.keyCode == 13) {
                handleSubmit(fn);
            }
        },
        [handleSubmit]
    );

    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
            triggerValidation([element.target.name]);
        },
        [setValue, triggerValidation]
    );

    // FORM
    const { handleSubmit, register, setValue, triggerValidation } = useForm({
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {};

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridTemplateColumns="3fr 1fr">
                <Cell>
                    <Input height="30px" maxLength="50" name="query" onChange={handleValidation()} onKeyDown={keyPress(submitForm)} placeholder="Inserir cupom" {...props} />
                </Cell>

                <Cell>
                    <Button height="30px" fontSize="12px" minWidth="auto" mx={{ d: 'auto', xs: 0 }} text="Aplicar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
