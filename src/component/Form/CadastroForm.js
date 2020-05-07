import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlCadastro, defaultErrorMsg } from '../../config';

import { useUser } from '../../store/auth/auth';
import { CadastroContext } from '../../store/cadastro/cadastroContext';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';
import { scrollTo } from '../../util/scrollTo';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Title2, Title4 } from '../../style/text';

export const CadastroForm = ({ location, ...otherProps }) => {
    // CONTEXT
    const setStateConhecerMaisContext = useContext(CadastroContext);

    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);
    const [stateUser, setStateUser] = useUser();

    useEffect(() => {
        register('confirm_password', { ...customValidate.password, ...customValidate.require });
        register('email', { ...customValidate.email });
        register('nome', { ...customValidate.name, ...customValidate.require });
        register('password', { ...customValidate.password, ...customValidate.require });
        register('telefone', { ...customValidate.cellphone });

        return undefined;
    }, [register]);

    // FUNCTION
    const handleScrollTo = useCallback(
        () => () => {
            const anchorElement =
                (document.querySelector('input[data-invalid="true"]') && 'input[data-invalid="true"]') ||
                (document.querySelector('#cadastroFormId') && '#cadastroFormId');

            scrollTo(anchorElement, true);
        },
        []
    );

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
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateUser(result.data);
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
                    <FormStyled id="cadastroFormId" onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 4 }}>
                            <Cell>
                                <InvalidResponseMessageContainerStyled>
                                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell mb={3}>
                                <div>
                                    <InputValidation
                                        error={errors.nome}
                                        label="Nome completo"
                                        maxLength="50"
                                        name="nome"
                                        onChange={handleValidation()}
                                        pr={4}
                                        touched={touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
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

                            <Cell mb={3}>
                                <div>
                                    <InputMaskValidation
                                        error={errors.telefone}
                                        label="Celular"
                                        mask={customMaskRegex.phone}
                                        name="telefone"
                                        onChange={handleValidation()}
                                        pr={4}
                                        touched={touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={4}>
                                <div>
                                    <InputValidation
                                        error={errors.password}
                                        label="Senha"
                                        maxLength="50"
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
                                        error={errors.confirm_password}
                                        label="Confirmação de senha"
                                        maxLength="50"
                                        name="confirm_password"
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

                                {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3}>
                                <Button
                                    fontSize={{ d: '16px', sm: '18px' }}
                                    height="60px"
                                    onClick={handleScrollTo()}
                                    text="Cadastrar-se"
                                    typeButton="submit"
                                    width="100%"
                                />
                            </Cell>

                            <Cell mb={3} textAlign="center">
                                <Box display={{ d: 'block', xs: 'inline-block' }}>
                                    <span>Você já possui uma conta?</span>
                                </Box>

                                <Box display={{ d: 'block', xs: 'inline-block' }} ml={{ d: 0, sm: 3 }} mt={{ d: 3, sm: 0 }}>
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
        </>
    );
};
