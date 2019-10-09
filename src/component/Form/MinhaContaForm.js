import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato } from '../../config';

import { useSetFormValue } from '../../store/util/setFormValue';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Checkbox, InputMaskValidation, InputValidation, Label, Select } from './Form';
import { Svg } from '../Svg/Svg';

import { FilePhoto, FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Image, ImageCircleContainer } from '../../style/image';
import { P, Span } from '../../style/text';

export const MinhaContaForm = ({ data, formId, ...otherProps }) => {
    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    // Valores inicias dos inputs
    useSetFormValue(data, formId);

    useEffect(() => {
        register({ name: 'data' }, { ...customValidate.date });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'endereco' }, { ...customValidate.require });
        register({ name: 'endereco_cep' }, { ...customValidate.require });
        register({ name: 'endereco_cidade' }, { ...customValidate.require });
        register({ name: 'endereco_complemento' });
        register({ name: 'endereco_estado' });
        register({ name: 'endereco_numero' }, { ...customValidate.number });
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
            <Box height="150px" mb={4} width="150px">
                <ImageCircleContainer>
                    <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                </ImageCircleContainer>

                <FilePhoto id="foto" name="foto" />

                <Label forLabel="foto">
                    <Svg fill="colorWhite" height="20px" name="svg-camera" />
                </Label>
            </Box>

            <Box overflow="hidden" width={{ d: '100%', md: 8 / 10 }}>
                <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridAutoRows="auto" gridColumnGap={5} gridRowGap={4} gridTemplateColumns={{ d: '1fr', md: '1fr 1fr 1fr 1fr' }} px={{ d: 1, md: 5 }} py={{ d: 2, md: 4 }}>
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

                        <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
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

                        <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
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

                        <Cell>
                            <Label color="colorGray2" text="CEP" />

                            <div>
                                <InputMaskValidation
                                    error={errors.endereco_cep}
                                    mask={customMaskRegex.cep}
                                    name="endereco_cep"
                                    onChange={(e) => {
                                        const input = e.target;
                                        triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Cep"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.endereco_cep && <InvalidInputMessage>{errors.endereco_cep.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '2 / span 2' }}>
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
                                    error={errors.endereco_numero}
                                    mask={Number}
                                    maxLength="5"
                                    name="endereco_numero"
                                    onChange={(e) => {
                                        const input = e.target;
                                        triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Número do endereço"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.endereco_numero && <InvalidInputMessage>{errors.endereco_numero.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                            <Label color="colorGray2" text="Complemento" />

                            <div>
                                <InputValidation
                                    error={errors.endereco_complemento}
                                    maxLength="100"
                                    name="endereco_complemento"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Complemento do endereço"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.endereco_complemento && <InvalidInputMessage>{errors.endereco_complemento.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                            <Label color="colorGray2" text="Cidade" />

                            <div>
                                <InputValidation
                                    error={errors.endereco_cidade}
                                    maxLength="50"
                                    name="endereco_cidade"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Cidade"
                                    touched={formState.touched}
                                    {...otherProps}
                                />
                            </div>

                            {errors.endereco_cidade && <InvalidInputMessage>{errors.endereco_cidade.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell>
                            <Label color="colorGray2" text="Estado" />

                            <div>
                                <Select name="endereco_estado" {...otherProps}>
                                    <option value="rj">RJ</option>
                                    <option value="rs">RS</option>
                                    <option value="sp">SP</option>
                                </Select>
                            </div>
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
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

                        <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                            <Label color="colorGray2" text="Sexo" />

                            <div>
                                <Select name="sexo" {...otherProps}>
                                    <option value="indefinido">Indefinido</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </Select>
                            </div>
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

                        <Cell mt={4} gridColumn={{ d: '1', md: '1 / span 4' }}>
                            <P color="colorBlack3" fontWeight="600">
                                Notificação de e-mail
                            </P>

                            <Checkbox color="colorGray2" fontSize={{ d: 16, sm: 18 }} id="notificacao_descontos" name="notificacao_descontos">
                                <Span verticalAlign="middle">Desejo receber avisos e descontos de cursos</Span>
                            </Checkbox>

                            <Checkbox color="colorGray2" fontSize={{ d: 16, sm: 18 }} id="notificacao_conteudo" name="notificacao_conteudo">
                                <Span verticalAlign="middle">Desejo receber a curadoria de conteúdos e notícias</Span>
                            </Checkbox>
                        </Cell>

                        <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" m="auto" text="Salvar" typeButton="submit" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};