import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import useForm from 'react-hook-form';

import { apiUrlPaywall } from '../../config';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const LeadwallForm = ({ ...props }) => {
    // ACTION
    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });
    }, [register]);

    // CONTEXT
    const [setChangeLeadwall] = useContext(NoticiaContext);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPaywall, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result && result.success == false) {
                    setError('invalid', 'notMatch', result.reason[0]);
                } else {
                    window.localStorage.setItem('leadwall', 'true');
                    setChangeLeadwall(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)} {...props}>
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
                    <Button fontSize={18} text="Liberar conteúdo" textTransform="none" typeButton="submit" width="100%" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
