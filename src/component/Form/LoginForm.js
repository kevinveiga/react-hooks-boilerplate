import React, { memo, useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlLogin, errorMsgDefault } from '../../config';

import { useAuth } from '../../store/auth/auth';

import { customValidate } from '../../util/customValidate';
import { redirectRule } from '../../util/redirectRule';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

export const LoginForm = memo(({ location, ...otherProps }) => {
    // CONTEXT
    const { setStateAuthContext } = useAuth();

    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register('email', { ...customValidate.email, ...customValidate.require });
        register('password', { ...customValidate.password, ...customValidate.require });

        return () => {
            unregister('email');
            unregister('password');
        };
    }, [register, unregister]);

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
        triggerValidation,
        unregister
    } = useForm({
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlLogin, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    // Salva dados do usuário no localStorage
                    setStateAuthContext(result.data);

                    // Regras de redirecionamento
                    redirectRule();
                } else {
                    setError('invalid', 'notMatch', errorMsgDefault);

                    console.error('result error: ', result);
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
            <Box overflow="hidden" width="100%">
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 4 }}>
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
                                    onChange={handleValidation()}
                                    pr={4}
                                    touched={touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
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

                        <Cell mb={3}>
                            <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" text="Acessar" typeButton="submit" width="100%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
});
