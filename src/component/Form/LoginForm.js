import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

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

export const LoginForm = memo(({ location, ...props }) => {
    // CONTEXT
    const { setStateAuthContext } = useAuth();

    // ACTION
    const [stateError, setStateError] = useState(false);
    const [stateViewPassword, setStateViewPassword] = useState(false);

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
                const result = await axios.post(apiUrlLogin, formData, { headers: { 'Content-Type': 'application/json' } });

                console.log('result: ', result);

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    // Salva dados do usuário no localStorage
                    setStateAuthContext(result.data);

                    // Regras de redirecionamento
                    redirectRule();
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

        return null;
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box overflow="hidden" width="100%">
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 4 }}>
                        <Cell>
                            <InvalidResponseMessageContainerStyled>
                                {stateError && <InvalidResponseMessageStyled>{stateError}</InvalidResponseMessageStyled>}
                            </InvalidResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    as={<InputValidation error={errors.email} label="E-mail" maxLength="50" pr={4} touched={touched} {...props} />}
                                    control={control}
                                    name="email"
                                    rules={{ ...customValidate.email, ...customValidate.require }}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
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

                        <Cell mb={3}>
                            <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" text="Acessar" typeButton="submit" width="100%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
});
