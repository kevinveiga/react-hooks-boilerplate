import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlEsqueceuSenha, errorMsgDefault, errorEmailNotFound } from '../../config';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const EsqueceuSenhaReiniciarForm = memo(({ email, token, ...props }) => {
    // ACTION
    const [stateRetornoForm, setStateRetornoForm] = useState(false);
    const [stateViewPassword, setStateViewPassword] = useState(false);

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
        const newFormData = formData;

        newFormData.email = email;
        newFormData.token = token;

        const fetchData = async () => {
            try {
                const result = await axios.post(`${apiUrlEsqueceuSenha}/reset`, newFormData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateRetornoForm(true);
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response && error.response.status == 404) {
                    setError('invalid', { type: 'manual', message: responseError(errorEmailNotFound) });
                } else {
                    setError('invalid', { type: 'manual', message: responseError(error.response.data.errors) });

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
                        Senha alterada com sucesso.
                    </P>
                </Box>
            ) : (
                <Box overflow="hidden" width="100%">
                    <FormStyled onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                            <Cell>
                                <InvalidResponseMessageContainerStyled>
                                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell mb={4}>
                                <div>
                                    <Controller
                                        as={
                                            <InputValidation
                                                error={errors.password}
                                                label="Senha"
                                                maxLength="20"
                                                pr={4}
                                                touched={touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                {...props}
                                            />
                                        }
                                        control={control}
                                        name="password"
                                        rules={{ ...customValidate.password, ...customValidate.require }}
                                    />

                                    <Svg
                                        bottom="10px"
                                        height="20px"
                                        name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                        onClick={() => setStateViewPassword(!stateViewPassword)}
                                        position="absolute"
                                        right="25px"
                                        zIndex={1}
                                    />
                                </div>

                                {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={4}>
                                <div>
                                    <Controller
                                        as={
                                            <InputValidation
                                                error={errors.password_confirmation}
                                                label="Confirmação de senha"
                                                maxLength="20"
                                                pr={4}
                                                touched={touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                {...props}
                                            />
                                        }
                                        control={control}
                                        name="password_confirmation"
                                        rules={{ ...customValidate.password, ...customValidate.require }}
                                    />

                                    <Svg
                                        bottom="10px"
                                        height="20px"
                                        name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                        onClick={() => setStateViewPassword(!stateViewPassword)}
                                        position="absolute"
                                        right="25px"
                                        zIndex={1}
                                    />
                                </div>

                                {errors.password_confirmation && (
                                    <InvalidInputMessageStyled>{errors.password_confirmation.message}</InvalidInputMessageStyled>
                                )}
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
