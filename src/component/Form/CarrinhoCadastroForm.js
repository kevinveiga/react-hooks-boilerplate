import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlCadastro, errorMsgDefault } from '../../config';

import { useAuth } from '../../store/auth/auth';

import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { redirectRule } from '../../util/redirectRule';
import { responseError } from '../../util/responseError';
import { scrollTo } from '../../util/scrollTo';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

export const CarrinhoCadastroForm = memo(({ formId, location, ...props }) => {
    // CONTEXT
    const { setStateAuthContext } = useAuth();

    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setError
    } = useForm({
        defaultValues: { nome: '', email: '', telefone: '', password: '', confirm_password: '' },
        mode: 'onChange'
    });

    const onError = (formError) => {
        const inputName = Object.keys(formError).length && Object.keys(formError)[0];

        const anchorElement =
            (document.getElementsByName(inputName) && `input[name="${inputName}"]`) || (document.querySelector(`#${formId}`) && `#${formId}`);

        scrollTo(anchorElement, true);
    };

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    // Salva dados do usuário no localStorage
                    setStateAuthContext(result.data);

                    // Regras de redirecionamento
                    redirectRule();
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    setError('invalid', { type: 'manual', message: responseError(error.response.data.errors) });
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
                <FormStyled id={formId} onSubmit={handleSubmit(onSubmit, onError)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 4 }}>
                        <Cell>
                            <InvalidResponseMessageContainerStyled>
                                {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                            </InvalidResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    as={
                                        <InputValidation
                                            error={errors.nome}
                                            label="Nome completo"
                                            maxLength="50"
                                            pr={4}
                                            touched={touched}
                                            {...props}
                                        />
                                    }
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
                                    as={<InputValidation error={errors.email} label="E-mail" maxLength="50" pr={4} touched={touched} {...props} />}
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
                                            error={errors.confirm_password}
                                            label="Confirmação de senha"
                                            maxLength="20"
                                            pr={4}
                                            touched={touched}
                                            type={stateViewPassword ? 'text' : 'password'}
                                            {...props}
                                        />
                                    }
                                    control={control}
                                    name="confirm_password"
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

                            {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" text="Cadastrar-se" typeButton="submit" width="100%" />
                        </Cell>

                        <Cell mb={3} textAlign="center">
                            <P color="colorGray2" fontSize="14px" themeColor="dark">
                                Clicando em &quot;Cadastrar-se&quot; você concordará com os{' '}
                                <LinkTo
                                    fontWeight="700"
                                    obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                                    link="/falta-link"
                                    text="Termos de serviço"
                                />{' '}
                                e{' '}
                                <LinkTo
                                    fontWeight="700"
                                    obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                                    link="/falta-link"
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
