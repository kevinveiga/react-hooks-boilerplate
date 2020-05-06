import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlEsqueceuSenha, defaultErrorMsg } from '../../config';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const EsqueceuSenhaReiniciarForm = ({ email, token, ...otherProps }) => {
    // ACTION
    const [stateRetornoForm, setStateRetornoForm] = useState(false);
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register('password_confirmation', { ...customValidate.password, ...customValidate.require });
        register('password', { ...customValidate.password, ...customValidate.require });

        return undefined;
    }, [register]);

    // FUNCTION
    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
            triggerValidation([element.target.name]);
        },
        [setValue, triggerValidation]
    );

    // FORM
    const {
        errors,
        formState: { touched },
        handleSubmit,
        register,
        setError,
        setValue,
        triggerValidation
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
                    setError('invalid', 'notMatch', defaultErrorMsg);

                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response) {
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
                                    <InputValidation
                                        error={errors.password}
                                        label="Senha"
                                        maxLength="20"
                                        name="password"
                                        onChange={handleValidation()}
                                        pr={4}
                                        touched={touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        {...otherProps}
                                    />

                                    <Svg
                                        height="20px"
                                        name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                        onClick={() => setStateViewPassword(!stateViewPassword)}
                                        position="absolute"
                                        right="25px"
                                        top="14px"
                                        zIndex={1}
                                    />
                                </div>

                                {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={4}>
                                <div>
                                    <InputValidation
                                        error={errors.password_confirmation}
                                        label="Confirmação de senha"
                                        maxLength="11"
                                        name="password_confirmation"
                                        onChange={handleValidation()}
                                        pr={4}
                                        touched={touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        {...otherProps}
                                    />

                                    <Svg
                                        height="20px"
                                        name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                        onClick={() => setStateViewPassword(!stateViewPassword)}
                                        position="absolute"
                                        right="25px"
                                        top="14px"
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
};
