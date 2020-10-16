import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlEsqueceuSenha, errorMsgDefault, errorEmailNotFound } from '../../config';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const EsqueceuSenhaForm = memo(({ ...props }) => {
    // ACTION
    const [stateError, setStateError] = useState(false);
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

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
                const result = await axios.post(`${apiUrlEsqueceuSenha}/create`, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    setStateRetornoForm(true);
                } else {
                    setStateError(errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response && error.response.status == 404) {
                    setStateError(responseError(errorEmailNotFound));
                } else {
                    setStateError(responseError(error.response.data.errors));

                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            {stateRetornoForm ? (
                <Box width="100%">
                    <P color="colorPrimary" fontSize="24px" mt={5} mx="auto" textAlign="center">
                        Recuperação de senha enviada com sucesso para o e-mail informado.
                    </P>
                </Box>
            ) : (
                <Box overflow="hidden" width="100%">
                    <FormStyled onSubmit={handleSubmit(onSubmit)}>
                        <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                            <Cell>
                                <InvalidResponseMessageContainerStyled>
                                    {stateError && <InvalidResponseMessageStyled>{stateError}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell mb={4}>
                                <div>
                                    <Controller
                                        as={
                                            <InputValidation error={errors.email} label="E-mail" maxLength="50" pr={4} touched={touched} {...props} />
                                        }
                                        control={control}
                                        name="email"
                                        rules={{ ...customValidate.email, ...customValidate.require }}
                                    />
                                </div>

                                {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3}>
                                <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" mx="auto" text="Enviar" typeButton="submit" width="50%" />
                            </Cell>
                        </Grid>
                    </FormStyled>
                </Box>
            )}
        </Flex>
    );
});
