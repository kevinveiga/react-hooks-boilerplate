import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato, defaultErrorMsg } from '../../config';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';
import { setFormValue } from '../../util/setFormValue';

import { Button } from '../Button/Button';
import { InputCheckboxRadio, InputFile, InputMaskValidation, InputValidation, Label, Select } from './Form';
import { ModalMessage } from '../Modal/ModalMessage';
import { OptionUF } from './OptionUF';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Image, ImageCircleContainer } from '../../style/image';
import { P, Span } from '../../style/text';

export const MinhaContaForm = ({ data, formId, ...otherProps }) => {
    // ACTION
    const [stateModalMessage, setStateModalMessage] = useState(false);
    const [stateViewPassword, setStateViewPassword] = useState(false);

    // Valores inicias dos inputs
    useEffect(() => {
        const formatData = formatFormDataSet(data);

        setFormValue(formatData, formId);
    }, [data, formId]);

    useEffect(() => {
        register({ name: 'data_nascimento' }, { ...customValidate.date });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'endereco_cep' }, { ...customValidate.require });
        register({ name: 'endereco_cidade' }, { ...customValidate.require });
        register({ name: 'endereco_complemento' });
        register({ name: 'endereco_logradouro' }, { ...customValidate.require });
        register({ name: 'endereco_uf' });
        register({ name: 'endereco_numero' }, { ...customValidate.number });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'senha' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'sexo' });
        register({ name: 'telefone' }, { ...customValidate.phone });
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        defaultValues: data,
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlContato, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateModalMessage(true);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error(result);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('invalid', 'notMatch', responseError(error.response.data.errors));
                } else {
                    console.error(error);
                }
            }
        };

        fetchData();
    };

    return (
        <>
            <Flex display="flex" flexWrap="wrap">
                <Box height="150px" mb={4} width="150px">
                    <ImageCircleContainer>
                        <Image objectFit="cover" text="autor" url="https://picsum.photos/id/1011/1024/768" />
                    </ImageCircleContainer>

                    <InputFile id="foto" name="foto">
                        <Svg fill="colorWhite" height="20px" name="svg-camera" />
                    </InputFile>
                </Box>

                <Box overflow="hidden" width={{ d: '100%', md: 8 / 10 }}>
                    <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridColumnGap={5} gridRowGap={4} gridTemplateColumns={{ d: '1fr', md: '1fr 1fr 1fr 1fr' }} px={{ d: 1, md: 5 }} py={{ d: 2, md: 4 }}>
                            <InvalidResponseMessageContainerStyled>{errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}</InvalidResponseMessageContainerStyled>

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

                                {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
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

                                {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
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

                                {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
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
                                        placeholder="00000-000"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_cep && <InvalidInputMessageStyled>{errors.endereco_cep.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '2 / span 2' }}>
                                <Label color="colorGray2" text="Endereço" />

                                <div>
                                    <InputValidation
                                        error={errors.endereco_logradouro}
                                        maxLength="100"
                                        name="endereco_logradouro"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        placeholder="Rua do endereço"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_logradouro && <InvalidInputMessageStyled>{errors.endereco_logradouro.message}</InvalidInputMessageStyled>}
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

                                {errors.endereco_numero && <InvalidInputMessageStyled>{errors.endereco_numero.message}</InvalidInputMessageStyled>}
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

                                {errors.endereco_complemento && <InvalidInputMessageStyled>{errors.endereco_complemento.message}</InvalidInputMessageStyled>}
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

                                {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell>
                                <Label color="colorGray2" text="Estado" />

                                <div>
                                    <Select name="endereco_uf" {...otherProps}>
                                        <OptionUF />
                                    </Select>
                                </div>
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                                <Label color="colorGray2" text="Data de Nascimento" />

                                <div>
                                    <InputMaskValidation
                                        error={errors.data_nascimento}
                                        mask={customMaskRegex.date}
                                        name="data_nascimento"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            await triggerValidation({ name: input.name, value: input.value });
                                        }}
                                        placeholder="dd/mm/aaaa"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                                <Label color="colorGray2" text="Sexo" />

                                <div>
                                    <Select name="sexo" {...otherProps}>
                                        <option value="">Indefinido</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                    </Select>
                                </div>
                            </Cell>

                            {/* <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
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

                                    <Svg height="20px" name={stateViewPassword ? 'svg-no-view' : 'svg-view'} onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="25px" top="14px" zIndex={1} />
                                </div>

                                {errors.senha && <InvalidInputMessageStyled>{errors.senha.message}</InvalidInputMessageStyled>}
                            </Cell> */}

                            <Cell mt={4} gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <P color="colorBlack3" fontWeight="600">
                                    Notificação de e-mail
                                </P>

                                <InputCheckboxRadio color="colorGray2" id="receber_avisos_descontos_de_cursos" name="receber_avisos_descontos_de_cursos">
                                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                    <Span fontSize={{ d: 14, sm: 16 }} verticalAlign="middle">
                                        Desejo receber avisos e descontos de cursos
                                    </Span>
                                </InputCheckboxRadio>

                                <InputCheckboxRadio color="colorGray2" id="receber_curadoria_conteudos_noticias" name="receber_curadoria_conteudos_noticias">
                                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                    <Span fontSize={{ d: 14, sm: 16 }} verticalAlign="middle">
                                        Desejo receber a curadoria de conteúdos e notícias
                                    </Span>
                                </InputCheckboxRadio>
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <Button fontSize={{ d: 16, sm: 18 }} height="70px" m="auto" text="Salvar" typeButton="submit" />
                            </Cell>
                        </Grid>
                    </FormStyled>
                </Box>
            </Flex>

            <ModalMessage visible={stateModalMessage}>Dados salvos com sucesso.</ModalMessage>
        </>
    );
};
