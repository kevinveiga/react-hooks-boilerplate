import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import useForm from 'react-hook-form';

import { apiUrlCursos, apiUrlLogin, defaultErrorMsg } from '../../config';

import { cursoMatricula } from '../../service/curso';

import { useUser } from '../../store/auth/auth';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const LoginForm = ({ location, ...otherProps }) => {
    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);
    const [stateUser, setStateUser] = useUser();

    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'password' }, { ...customValidate.password, ...customValidate.require });

        return undefined;
    }, [register]);

    // Function
    const handleValidation = useCallback(
        () => (element) => {
            triggerValidation({ name: element.target.name, value: element.target.value });
        },
        [triggerValidation]
    );

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlLogin, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    const cursoId = JSON.parse(window.sessionStorage.getItem('cursoId'));

                    setStateUser(result.data);

                    // Matricular curso ou redirecionar para Minha Conta Início
                    if (JSON.parse(cursoId)) {
                        cursoMatricula(cursoId, `${apiUrlCursos}/matricular`);
                    } else {
                        window.location.pathname = '/minha-conta/inicio';
                    }
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
                                <InputValidation error={errors.email} label="E-mail" maxLength="50" name="email" onChange={handleValidation()} touched={formState.touched} {...otherProps} />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={4}>
                            <div>
                                <InputValidation
                                    error={errors.password}
                                    label="Senha"
                                    maxLength="11"
                                    name="password"
                                    onChange={handleValidation()}
                                    touched={formState.touched}
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

                        <Cell mb={3}>
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" text="Acessar" typeButton="submit" width="100%" />
                        </Cell>

                        <Cell mb={3} textAlign="center">
                            <P color="colorGray2" fontSize={14} themeColor="dark">
                                <LinkTo obj={{ hoverColor: 'colorGray2', underline: true }} link="/esqueceu-senha" text="Esqueceu sua senha?" />
                            </P>
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};
