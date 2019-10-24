import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato, defaultErrorMsg } from '../../config';

import { CadastroContext } from '../../store/cadastro/cadastroContext';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Title2, Title4 } from '../../style/text';

const CadastroForm = ({ ...props }) => {
    // CONTEXT
    const setStateConhecerMais = useContext(CadastroContext);

    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'senha' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'telefone' }, { ...customValidate.phone });
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlContato, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateConhecerMais(true);
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error(result);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <>
            <Title4 align="center" color="colorGray2" themeColor="dark">
                Faça seu cadastro
            </Title4>

            <Title2 align="center" fontWeight="600" themeColor="dark">
                e comece a aprender
            </Title2>

            <Flex display="flex" flexWrap="wrap">
                <Box overflow="hidden" width="100%">
                    <FormStyled onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                            <Cell mb={3} width="100%">
                                {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}

                                <div>
                                    <InputValidation
                                        error={errors.nome}
                                        label="Nome completo"
                                        maxLength="50"
                                        name="nome"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        touched={formState.touched}
                                        {...props}
                                    />
                                </div>

                                {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3} width="100%">
                                <div>
                                    <InputValidation
                                        error={errors.email}
                                        label="E-mail"
                                        maxLength="50"
                                        name="email"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        touched={formState.touched}
                                        {...props}
                                    />
                                </div>

                                {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3} width="100%">
                                <div>
                                    <InputMaskValidation
                                        error={errors.telefone}
                                        label="Celular"
                                        mask={customMaskRegex.phone}
                                        name="telefone"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        touched={formState.touched}
                                        {...props}
                                    />
                                </div>

                                {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={4} width="100%">
                                <div>
                                    <InputValidation
                                        error={errors.senha}
                                        label="Senha"
                                        maxLength="11"
                                        name="senha"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        touched={formState.touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        {...props}
                                    />

                                    <Svg height="20px" name={stateViewPassword ? 'svg-no-view' : 'svg-view'} onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="22px" top="14px" zIndex={1} />
                                </div>

                                {errors.senha && <InvalidInputMessageStyled>{errors.senha.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell mb={3} width="100%">
                                <Button fontSize={{ d: 16, sm: 18 }} height="70px" text="Cadastrar-se" typeButton="submit" width="100%" />
                            </Cell>

                            <Cell mb={3} textAlign="center" width="100%">
                                <span>Você já possui uma conta?</span>

                                <LinkTo link="/login">
                                    <Button fontSize={{ d: 14, sm: 16 }} ml={{ d: 0, sm: 3 }} mt={{ d: 3, sm: 0 }} text="Fazer Login" themeSize="small" themeType="border" />
                                </LinkTo>
                            </Cell>

                            <Cell mb={3} textAlign="center" width="100%">
                                <P color="colorGray2" fontSize={14} themeColor="dark">
                                    Clicando em &quot;Cadastrar-se&quot; você concordará com os <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Termos de serviço" /> e{' '}
                                    <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Política de privacidade" />.
                                </P>
                            </Cell>
                        </Grid>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};

export default CadastroForm;
