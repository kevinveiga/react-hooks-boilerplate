import React, { useContext } from 'react';
import useForm from 'react-hook-form';

import { apiUrlPaywall } from '../../config';

import { usePaywallApi } from '../../service/paywall';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled } from './FormStyled';

import { Grid, Cell } from '../../style/grid';

export const LeadwallForm = ({ ...props }) => {
    // API
    const [statePaywall, setStatePaywallData] = usePaywallApi(null, {});

    // CONTEXT
    const [setChangeLeadwall] = useContext(NoticiaContext);

    // FORM
    const { errors, formState, handleSubmit, register } = useForm({
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

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)} {...props}>
            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridColumnGap={4} gridRowGap={2}>
                <Cell mb={3} width="100%">
                    <Input error={errors.email} maxLength="50" name="email" placeholder="Insira seu e-mail" ref={register(customValidate.email)} touched={formState.touched} />
                </Cell>

                <Cell mb={3} width="100%">
                    <Button className="btn btn-primary btn-leadwall" text="Liberar conteúdo" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
