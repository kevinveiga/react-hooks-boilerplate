import React, { useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import useForm from 'react-hook-form';

import { apiUrlPerfil, defaultErrorMsg } from '../../config';

import { Context } from '../../store/context';

import { useWindowWidth } from '../../store/util/windowWidth';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataGet, formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';
import { scrollTo } from '../../util/scrollTo';
import { setFormValue } from '../../util/setFormValue';

import { Button } from '../Button/Button';
import { InputCheckboxRadio, InputFile, InputMaskValidation, InputValidation, Label, Select } from './Form';
import { OptionUF } from './OptionUF';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Image, ImageCircleContainer } from '../../style/image';
import { P, Span } from '../../style/text';
import { variable } from '../../style/variable';

import logo from '../../asset/image/logo.png';

export const MinhaContaForm = ({ data, formId, setStatePerfilData, ...otherProps }) => {
    // CONTEXT
    const { setStateModalMessageContext } = useContext(Context);

    // ACTION
    // const [stateViewPassword, setStateViewPassword] = useState(false);
    const [stateIsSubmit, setStateIsSubmit] = useState(false);
    const windowWidth = useWindowWidth();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, stateIsSubmit, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [stateIsSubmit]);
    /* eslint-enable react-hooks/exhaustive-deps */

    useEffect(() => {
        register({ name: 'data_nascimento' }, { ...customValidate.date });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'endereco_cep' }, { ...customValidate.cep, ...customValidate.require });
        register({ name: 'endereco_cidade' }, { ...customValidate.require });
        register({ name: 'endereco_complemento' });
        register({ name: 'endereco_logradouro' }, { ...customValidate.require });
        register({ name: 'endereco_uf' });
        register({ name: 'endereco_numero' }, { ...customValidate.number });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        // register({ name: 'password' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'receber_avisos_descontos_de_cursos' });
        register({ name: 'receber_curadoria_conteudos_noticias' });
        register({ name: 'sexo' });
        register({ name: 'telefone' }, { ...customValidate.phone, ...customValidate.require });

        return undefined;
    }, [register]);

    // Function
    const handleFileChange = useCallback(
        () => (event) => {
            if (event.target.files[0]) {
                Resizer.imageFileResizer(event.target.files[0], 300, 300, 'JPEG', 70, 0, (uri) => {
                    console.log(uri);
                    // TO DO: AXIOS
                });
            }
        },
        []
    );

    const handleSetValue = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
        },
        [setValue]
    );

    const handleSetValueChecked = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.checked);
        },
        [setValue]
    );

    const handleValidation = useCallback(
        () => (element) => {
            triggerValidation({ name: element.target.name, value: element.target.value });
        },
        [triggerValidation]
    );

    // FORM
    const { errors, formState, handleSubmit, register, setValue, setError, triggerValidation } = useForm({
        defaultValues: formatFormDataGet(data),
        mode: 'onChange'
    });

    // Valores inicias dos inputs
    useEffect(() => {
        setFormValue(formatFormDataGet(data), formId);

        return undefined;
    }, [data, formId]);

    const submitForm = (formData) => {
        setStateIsSubmit(true);

        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfil, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStatePerfilData({ update: true, url: apiUrlPerfil });
                    setStateModalMessageContext({ text: 'Dados salvos com sucesso.' });
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);

                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message) {
                        setError('invalid', 'notMatch', error.response.data.message);
                    } else {
                        setError('invalid', 'notMatch', responseError(error.response.data.errors));
                    }
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();

        setStateIsSubmit(false);
    };

    return (
        <>
            <Flex display="flex" flexWrap="wrap" justifyContent="center">
                <Box height="150px" mb={4} width="150px">
                    <ImageCircleContainer>
                        <Image objectFit="none" text="autor" url={logo} />
                    </ImageCircleContainer>

                    {/* <InputFile id="foto" name="foto" onChange={handleFileChange()}>
                        <Svg fill="colorWhite" height="20px" name="svg-camera" />
                    </InputFile> */}
                </Box>

                <Box overflow="hidden" width={{ d: '100%', md: 8 / 10 }}>
                    <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridColumnGap={5} gridRowGap={4} gridTemplateColumns={{ d: '1fr', md: '1fr 1fr 1fr 1fr' }} px={{ d: 1, md: 5 }} py={{ d: 2, md: 4 }}>
                            <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <InvalidResponseMessageContainerStyled>
                                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <Label color="colorGray2" mb="-10px" text="Nome completo" />

                                <div>
                                    <InputValidation error={errors.nome} maxLength="50" name="nome" onChange={handleValidation()} placeholder="Nome" touched={formState.touched} {...otherProps} />
                                </div>

                                {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="E-mail" />

                                <div>
                                    <InputValidation error={errors.email} maxLength="50" name="email" onChange={handleValidation()} placeholder="E-mail" touched={formState.touched} {...otherProps} />
                                </div>

                                {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Celular" />

                                <div>
                                    <InputMaskValidation
                                        error={errors.telefone}
                                        mask={customMaskRegex.phone}
                                        name="telefone"
                                        onChange={handleValidation()}
                                        placeholder="Telefone"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell>
                                <Label color="colorGray2" mb="-10px" text="CEP" />

                                <div>
                                    <InputMaskValidation
                                        error={errors.endereco_cep}
                                        mask={customMaskRegex.cep}
                                        name="endereco_cep"
                                        onBlur={handleValidation()}
                                        onChange={handleValidation()}
                                        placeholder="00000-000"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_cep && <InvalidInputMessageStyled>{errors.endereco_cep.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '2 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Endereço" />

                                <div>
                                    <InputValidation
                                        error={errors.endereco_logradouro}
                                        maxLength="100"
                                        name="endereco_logradouro"
                                        onChange={handleValidation()}
                                        placeholder="Rua do endereço"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_logradouro && <InvalidInputMessageStyled>{errors.endereco_logradouro.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell>
                                <Label color="colorGray2" mb="-10px" text="Nº" />

                                <div>
                                    <InputMaskValidation
                                        error={errors.endereco_numero}
                                        mask={Number}
                                        maxLength="5"
                                        name="endereco_numero"
                                        onChange={handleValidation()}
                                        placeholder="Número do endereço"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_numero && <InvalidInputMessageStyled>{errors.endereco_numero.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <Label color="colorGray2" mb="-10px" text="Complemento" />

                                <div>
                                    <InputValidation
                                        error={errors.endereco_complemento}
                                        maxLength="100"
                                        name="endereco_complemento"
                                        onChange={handleValidation()}
                                        placeholder="Complemento do endereço"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_complemento && <InvalidInputMessageStyled>{errors.endereco_complemento.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Cidade" />

                                <div>
                                    <InputValidation
                                        error={errors.endereco_cidade}
                                        maxLength="50"
                                        name="endereco_cidade"
                                        onChange={handleValidation()}
                                        placeholder="Cidade"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell>
                                <Label color="colorGray2" mb="-10px" text="Estado" />

                                <div>
                                    <Select name="endereco_uf" onChange={handleSetValue()} {...otherProps}>
                                        <OptionUF />
                                    </Select>
                                </div>
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Data de Nascimento" />

                                <div>
                                    <InputMaskValidation
                                        error={errors.data_nascimento}
                                        mask={customMaskRegex.date}
                                        name="data_nascimento"
                                        onChange={handleValidation()}
                                        placeholder="dd/mm/aaaa"
                                        touched={formState.touched}
                                        {...otherProps}
                                    />
                                </div>

                                {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Sexo" />

                                <div>
                                    <Select name="sexo" onChange={handleSetValue()} {...otherProps}>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                    </Select>
                                </div>
                            </Cell>

                            {/* <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                                <Label color="colorGray2" mb="-10px" text="Senha" />

                                <div>
                                    <InputValidation
                                        error={errors.password}
                                        maxLength="11"
                                        name="password"
                                        onChange={handleValidation()}
                                        placeholder="password"
                                        touched={formState.touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        {...otherProps}
                                    />

                                    <Svg height="20px" name={stateViewPassword ? 'svg-no-view' : 'svg-view'} onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="25px" top="14px" zIndex={1} />
                                </div>

                                {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                            </Cell> */}

                            <Cell mt={4} gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <P color="colorBlack3" fontWeight="700">
                                    Notificação de e-mail
                                </P>

                                <InputCheckboxRadio color="colorGray2" id="receber_avisos_descontos_de_cursos" name="receber_avisos_descontos_de_cursos" onChange={handleSetValueChecked()}>
                                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                    <Span fontSize={{ d: 14, sm: 16 }} verticalAlign="middle">
                                        Desejo receber avisos e descontos de cursos
                                    </Span>
                                </InputCheckboxRadio>

                                <InputCheckboxRadio color="colorGray2" id="receber_curadoria_conteudos_noticias" name="receber_curadoria_conteudos_noticias" onChange={handleSetValueChecked()}>
                                    <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                    <Span fontSize={{ d: 14, sm: 16 }} verticalAlign="middle">
                                        Desejo receber a curadoria de conteúdos e notícias
                                    </Span>
                                </InputCheckboxRadio>
                            </Cell>

                            <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                                <Button fontSize={{ d: 16, sm: 18 }} height="70px" mx="auto" text="Salvar" typeButton="submit" />
                            </Cell>
                        </Grid>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};
