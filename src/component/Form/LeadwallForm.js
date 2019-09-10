import React, { useContext, useEffect } from 'react';
import useForm from 'react-hook-form';

import { apiUrlPaywall } from '../../config';

import { usePaywallApi } from '../../service/paywall';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled } from './FormStyled';

import { Grid, Cell } from '../../style/grid';

export const LeadwallForm = ({ ...props }) => {
    // API
    const [statePaywall, setStatePaywallData] = usePaywallApi(null, {});

    // CONTEXT
    const [setChangeLeadwall] = useContext(NoticiaContext);

    // FORM
    const { errors, formState, handleSubmit, register, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        setStatePaywallData({ data: formData, url: apiUrlPaywall });
    };

    // ACTION
    if (statePaywall.data && statePaywall.data.success == true && statePaywall.isError == false) {
        window.localStorage.setItem('leadwall', 'true');
        setChangeLeadwall(true);
    }

    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });
    }, [register]);

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)} {...props}>
            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridColumnGap={4} gridRowGap={2}>
                <Cell mb={3} width="100%">
                    <InputValidation
                        error={errors.email}
                        maxLength="50"
                        name="email"
                        onChange={async (e) => {
                            const input = e.target;
                            await triggerValidation({ name: input.name, value: input.value });
                        }}
                        placeholder="Insira seu e-mail"
                        right="15px"
                        touched={formState.touched}
                        {...props}
                    />
                </Cell>

                <Cell mb={3} width="100%">
                    <Button className="btn btn-primary btn-leadwall" text="Liberar conteúdo" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
