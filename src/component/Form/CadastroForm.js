import React, { memo, useContext, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlCadastro, errorMsgDefault } from '../../config';

import { useAuth } from '../../store/auth/auth';
import { CadastroContext } from '../../store/cadastro/cadastroContext';

import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';
import { scrollTo } from '../../util/scrollTo';
import { onFormError } from './util';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const CadastroForm = memo(({ formId, ...props }) => {
    // CONTEXT
    const { setStateConhecerMaisContext } = useContext(CadastroContext);
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
        defaultValues: { nome: '', email: '', liberta_xp: '', telefone: '', codigo_xp: '', password: '', confirm_password: '' },
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    // Salva dados do usuário no localStorage
                    setStateAuthContext(result.data);

                    // Exibe formulário Conhecer Mais Usuário
                    setStateConhecerMaisContext(true);
                } else {
                    setStateError(errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message) {
                        setStateError(error.response.data.message);
                    } else {
                        setStateError(responseError(error.response.data.errors));
                    }

                    scrollTo(null, true, 0, 0, '#scrollContextCadastroFormId');
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
                <FormStyled
                    id={formId}
                    onSubmit={handleSubmit(onSubmit, (formError) => onFormError(formError, formId, '#scrollContextCadastroFormId'))}
                >
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 3 }}>
                        <Cell>
                            <ResponseMessageContainerStyled>
                                {stateError && <ResponseMessageStyled>{stateError}</ResponseMessageStyled>}
                            </ResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.nome}
                                                label="Nome completo"
                                                maxLength="50"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="nome"
                                    rules={{ ...customValidate.name, ...customValidate.require }}
                                />
                            </div>

                            {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.email}
                                                label="E-mail"
                                                maxLength="50"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="email"
                                    rules={{ ...customValidate.email, ...customValidate.require }}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputMaskValidation
                                                error={errors.telefone}
                                                format="(##) #####-####"
                                                label="Celular"
                                                name={name}
                                                onBlur={onBlur}
                                                onValueChange={(values) => {
                                                    onChange(values.value);
                                                }}
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="telefone"
                                    rules={{ ...customValidate.cellphone, ...customValidate.require }}
                                />
                            </div>

                            {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3} mt={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.password}
                                                label="Senha"
                                                maxLength="20"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                pr={4}
                                                touched={touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="password"
                                    rules={{ ...customValidate.password, ...customValidate.require }}
                                />

                                <Svg
                                    bottom="12px"
                                    height="16px"
                                    name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                    onClick={() => setStateViewPassword(!stateViewPassword)}
                                    position="absolute"
                                    right="20px"
                                    zIndex={1}
                                />
                            </div>

                            {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={4}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.confirm_password}
                                                label="Confirmação de senha"
                                                maxLength="20"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                pr={4}
                                                touched={touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="confirm_password"
                                    rules={{ ...customValidate.password, ...customValidate.require }}
                                />

                                <Svg
                                    bottom="12px"
                                    height="16px"
                                    name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                                    onClick={() => setStateViewPassword(!stateViewPassword)}
                                    position="absolute"
                                    right="20px"
                                    zIndex={1}
                                />
                            </div>

                            {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" text="Cadastrar-se" typeButton="submit" width="100%" />
                        </Cell>

                        <Cell mb={3} textAlign="center">
                            <Box display={{ d: 'block', sm: 'inline-block' }}>
                                <span>Você já possui uma conta?</span>
                            </Box>

                            <Box display={{ d: 'block', sm: 'inline-block' }} ml={{ d: 0, sm: 4 }} mt={{ d: 3, sm: 0 }}>
                                <LinkTo link="/login">
                                    <Button fontSize={{ d: '14px', sm: '16px' }} text="Fazer Login" themeSize="small" themeType="border" />
                                </LinkTo>
                            </Box>
                        </Cell>

                        <Cell mb={3} textAlign="center">
                            <P color="colorGray2" fontSize="14px" themeColor="dark">
                                Clicando em &quot;Cadastrar-se&quot; você concordará com os{' '}
                                <LinkTo
                                    fontWeight="700"
                                    link="/falta-link"
                                    obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                                    text="Termos de serviço"
                                />{' '}
                                e{' '}
                                <LinkTo
                                    fontWeight="700"
                                    link="/falta-link"
                                    obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                                    text="Política de privacidade"
                                />
                                .
                            </P>
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
});
