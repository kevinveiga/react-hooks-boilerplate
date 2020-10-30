import React, { memo, useContext, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPaywall, errorMsgDefault } from '../../config';

import { convertOrigin } from '../../service/activeCampaign';

import { NoticiaContext } from '../../store/noticia/noticiaContext';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';
import { setStorage } from '../../util/storage';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const LeadwallForm = memo(({ ...props }) => {
    // CONTEXT
    const setChangeLeadwallContext = useContext(NoticiaContext);

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
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPaywall, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    setStorage('leadwall', 'true');

                    setChangeLeadwallContext(true);

                    convertOrigin(formData);
                } else if (result.data.reason) {
                    setStateError(result.data.reason[0]);
                } else {
                    setStateError(errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    setStateError(responseError(error.response.data.errors));
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid display="grid" gridColumnGap={4} gridRowGap={2}>
                <Cell>
                    <ResponseMessageContainerStyled>
                        {errors.invalid && <ResponseMessageStyled>{errors.invalid.message}</ResponseMessageStyled>}
                    </ResponseMessageContainerStyled>
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
