import React, { memo, useContext } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPaywall, errorMsgDefault } from '../../config';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';
import { setStorage } from '../../util/storage';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const LeadwallForm = memo(({ ...props }) => {
    // CONTEXT
    const setChangeLeadwallContext = useContext(NoticiaContext);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setError
    } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPaywall, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStorage('leadwall', 'true');

                    setChangeLeadwallContext(true);
                } else if (result.data.reason) {
                    setError('invalid', { type: 'manual', message: result.data.reason[0] });
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    setError('invalid', { type: 'manual', message: responseError(error.response.data.errors) });
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridColumnGap={4} gridRowGap={2}>
                <Cell>
                    <InvalidResponseMessageContainerStyled>
                        {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                    </InvalidResponseMessageContainerStyled>
                </Cell>

                <Cell mb={3}>
                    <div>
                        <Controller
                            as={
                                <InputValidation
                                    error={errors.email}
                                    maxLength="50"
                                    placeholder="Insira seu e-mail"
                                    pr={4}
                                    right="15px"
                                    touched={touched}
                                    {...props}
                                />
                            }
                            control={control}
                            name="email"
                            rules={{ ...customValidate.email, ...customValidate.require }}
                        />
                    </div>
                </Cell>

                <Cell mb={3}>
                    <Button fontSize="18px" text="Liberar conteúdo" textTransform="none" typeButton="submit" width="100%" />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
