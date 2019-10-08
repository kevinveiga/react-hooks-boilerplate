import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato } from '../../config';

import { useSetFormValue } from '../../store/util/setFormValue';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

export const MinhaContaForm = ({ data, formId, ...otherProps }) => {
    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    // Valores inicias dos inputs
    useSetFormValue(data, formId);

    useEffect(() => {
        register({ name: 'cidade' }, { ...customValidate.require });
        register({ name: 'data' }, { ...customValidate.date });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'endereco' }, { ...customValidate.require });
        register({ name: 'enderecoNumero' }, { ...customValidate.number });
        register({ name: 'enderecoComplemento' });
        register({ name: 'estado' });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'senha' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'sexo' });
        register({ name: 'telefone' }, { ...customValidate.phone });
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        defaultValues: { ...data },
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlContato, formData, { headers: { 'Content-Type': 'application/json' } });

                console.log('form: ', formData);

                if (result && result.success == false) {
                    setError('invalid', 'notMatch', result.reason[0]);
                } else {
                    // TODO: exibir mensagem de dados salvos com sucesso
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box overflow="hidden" width="100%">
                <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridAutoRows="auto" gridColumnGap={5} gridRowGap={4} gridTemplateColumns={{ d: '1fr', md: '1fr 1fr 1fr 1fr' }} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                        {errors.invalid && <InvalidResponseMessage>{errors.invalid.message}</InvalidResponseMessage>}

                        <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                            <Label color="colorGray2" text="Nome completo" />

                            <div>
                                <InputValidation
                                    error={errors.nome}
                                    maxLength="50"
                                    name="nome"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Nome"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.nome && <InvalidInputMessage>{errors.nome.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 3' }}>
                            <Label color="colorGray2" text="E-mail" />

                            <div>
                                <InputValidation
                                    error={errors.email}
                                    maxLength="50"
                                    name="email"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="E-mail"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.email && <InvalidInputMessage>{errors.email.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Celular" />

                            <div>
                                <InputMaskValidation
                                    error={errors.telefone}
                                    mask={customMaskRegex.phone}
                                    name="telefone"
                                    onChange={(e) => {
                                        const input = e.target;
                                        triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Telefone"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.telefone && <InvalidInputMessage>{errors.telefone.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 3' }}>
                            <Label color="colorGray2" text="Endereço" />

                            <div>
                                <InputValidation
                                    error={errors.endereco}
                                    maxLength="100"
                                    name="endereco"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Rua do endereço"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.endereco && <InvalidInputMessage>{errors.endereco.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Nº" />

                            <div>
                                <InputMaskValidation
                                    error={errors.enderecoNumero}
                                    mask={Number}
                                    maxLength="5"
                                    name="enderecoNumero"
                                    onChange={(e) => {
                                        const input = e.target;
                                        triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Número do endereço"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.enderecoNumero && <InvalidInputMessage>{errors.enderecoNumero.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                            <Label color="colorGray2" text="Complemento" />

                            <div>
                                <InputValidation
                                    error={errors.enderecoComplemento}
                                    maxLength="100"
                                    name="enderecoComplemento"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Complemento do endereço"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.enderecoComplemento && <InvalidInputMessage>{errors.enderecoComplemento.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Cidade" />

                            <div>
                                <InputValidation
                                    error={errors.cidade}
                                    maxLength="50"
                                    name="cidade"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Cidade"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.cidade && <InvalidInputMessage>{errors.cidade.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Estado" />

                            <div>
                                <InputValidation
                                    error={errors.estado}
                                    name="estado"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Estado"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.estado && <InvalidInputMessage>{errors.estado.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Data de Nascimento" />

                            <div>
                                <InputMaskValidation
                                    error={errors.data}
                                    mask={customMaskRegex.date}
                                    name="data"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="dd/mm/aaaa"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.data && <InvalidInputMessage>{errors.data.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '2 / span 1' }}>
                            <Label color="colorGray2" text="Sexo" />

                            <div>
                                <InputValidation
                                    error={errors.sexo}
                                    name="sexo"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Sexo"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.sexo && <InvalidInputMessage>{errors.sexo.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                            <Label color="colorGray2" text="Senha" />

                            <div>
                                <InputValidation
                                    error={errors.senha}
                                    maxLength="11"
                                    name="senha"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Senha"
                                    touched={formState.touched}
                                    type={stateViewPassword ? 'text' : 'password'}
                                    {...otherProps}
                                />

                                <Svg height="20px" name="svg-view" onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="22px" top="14px" zIndex={1} />
                            </div>

                            {errors.senha && <InvalidInputMessage>{errors.senha.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" m="auto" text="Cadastrar-se" typeButton="submit" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};
