import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import useForm from 'react-hook-form';

import { apiUrlCadastro, defaultErrorMsg } from '../../config';

import { CadastroContext } from '../../store/cadastro/cadastroContext';
import { Context } from '../../store/context';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Title2, Title4 } from '../../style/text';

export const CadastroForm = ({ ...props }) => {
    // CONTEXT
    const setStateConhecerMaisContext = useContext(CadastroContext);
    const { setStateAuthTokenContext } = useContext(Context);

    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register({ name: 'confirm_password' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'password' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'telefone' }, { ...customValidate.cellphone });

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
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateAuthTokenContext(result.data.token);
                    setStateConhecerMaisContext(true);
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
        <>
            <Title4 align="center" color="colorGray2" themeColor="dark">
                Faça seu cadastro
            </Title4>

            <Title2 align="center" fontWeight="700" themeColor="dark">
                e comece a aprender
            </Title2>

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
                                    <InputValidation error={errors.nome} label="Nome completo" maxLength="50" name="nome" onChange={handleValidation()} touched={formState.touched} {...props} />
                                </div>

                                {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3}>
                                <div>
                                    <InputValidation error={errors.email} label="E-mail" maxLength="50" name="email" onChange={handleValidation()} touched={formState.touched} {...props} />
                                </div>

                                {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3}>
                                <div>
                                    <InputMaskValidation
                                        error={errors.telefone}
                                        label="Celular"
                                        mask={customMaskRegex.phone}
                                        name="telefone"
                                        onChange={handleValidation()}
                                        touched={formState.touched}
                                        {...props}
                                    />
                                </div>

                                {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
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
                                        {...props}
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
                                        error={errors.confirm_password}
                                        label="Confirmação de senha"
                                        maxLength="11"
                                        name="confirm_password"
                                        onChange={handleValidation()}
                                        touched={formState.touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        {...props}
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

                                {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3}>
                                <Button fontSize={{ d: 16, sm: 18 }} height="70px" text="Cadastrar-se" typeButton="submit" width="100%" />
                            </Cell>

                            <Cell mb={3} textAlign="center">
                                <Box display={{ d: 'block', xs: 'inline-block' }}>
                                    <span>Você já possui uma conta?</span>
                                </Box>

                                <Box display={{ d: 'block', xs: 'inline-block' }} ml={{ d: 0, sm: 3 }} mt={{ d: 3, sm: 0 }}>
                                    <LinkTo link="/login">
                                        <Button fontSize={{ d: 14, sm: 16 }} text="Fazer Login" themeSize="small" themeType="border" />
                                    </LinkTo>
                                </Box>
                            </Cell>

                            <Cell mb={3} textAlign="center">
                                <P color="colorGray2" fontSize={14} themeColor="dark">
                                    Clicando em &quot;Cadastrar-se&quot; você concordará com os{' '}
                                    <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Termos de serviço" /> e{' '}
                                    <LinkTo fontWeight="700" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Política de privacidade" />.
                                </P>
                            </Cell>
                        </Grid>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};
