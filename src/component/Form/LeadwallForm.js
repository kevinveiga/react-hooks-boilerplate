import React, { useContext, useEffect } from 'react';

import axios from 'axios';
import useForm from 'react-hook-form';

import { apiUrlPaywall, defaultErrorMsg } from '../../config';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

const LeadwallForm = ({ ...props }) => {
    // CONTEXT
    const setChangeLeadwallContext = useContext(NoticiaContext);

    // ACTION
    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });

        return undefined;
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPaywall, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    window.localStorage.setItem('leadwall', 'true');
                    setChangeLeadwallContext(true);
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error('result: ', result);
                }
            } catch (error) {
                console.error('error: ', error);
            }
        };

        fetchData();
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridColumnGap={4} gridRowGap={2}>
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
                    <Button fontSize={18} text="Liberar conteúdo" textTransform="none" typeButton="submit" width="100%" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};

export default LeadwallForm;
