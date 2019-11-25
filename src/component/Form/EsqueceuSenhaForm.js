import React, { useContext, useEffect } from 'react';

import axios from 'axios';
import useForm from 'react-hook-form';

import { apiUrlLogin, defaultErrorMsg } from '../../config';

import { Context } from '../../store/context';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

const EsqueceuSenhaForm = ({ location, ...otherProps }) => {
    // CONTEXT
    const { setStateAuthTokenContext } = useContext(Context);

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
                const result = await axios.post(apiUrlLogin, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateAuthTokenContext(result.data.token);

                    window.location.pathname = (location.state && location.state.referer.pathname) || '/minha-conta/inicio';
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('invalid', 'notMatch', responseError(error.response.data.errors));
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box overflow="hidden" width="100%">
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                        <Cell>
                            <InvalidResponseMessageContainerStyled>
                                {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                            </InvalidResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <InputValidation
                                    error={errors.email}
                                    label="E-mail"
                                    maxLength="50"
                                    name="email"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" m="auto" text="Enviar" typeButton="submit" width="50%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};

export default EsqueceuSenhaForm;
