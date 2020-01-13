import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlCursos, apiUrlPerfil, defaultErrorMsg } from '../../config';

import { cursoMatricula } from '../../service/curso';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label, Select } from './Form';
import { OptionUF } from './OptionUF';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';
import { ConhecerMaisPartContentStyled, ConhecerMaisPartNumberStyled, ConhecerMaisPartTitleStyled, ConhecerMaisRadioStyled } from './ConhecerMaisFormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Span, Title3 } from '../../style/text';

export const ConhecerMaisForm = ({ location, ...otherProps }) => {
    // ACTION
    const [statePart, setStatePart] = useState(1);

    useEffect(() => {
        register('data_nascimento', { ...customValidate.date });
        register('endereco_cidade');
        register('endereco_estado');
        register('sexo');

        return undefined;
    }, [register]);

    // Function
    const handlePart = useCallback(
        (value) => () => {
            setStatePart(value);
        },
        []
    );

    const handleSetValue = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
        },
        [setValue]
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
        defaultValues: { data_nascimento: '' },
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfil, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    const cursoId = JSON.parse(window.sessionStorage.getItem('cursoId'));

                    // Matricular curso ou redirecionar para Minha Conta Início
                    if (cursoId) {
                        cursoMatricula(cursoId, `${apiUrlCursos}/matricular`);
                    } else {
                        window.location.pathname = '/minha-conta/cursos';
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
        <>
            <Title3 align="center" fontWeight="700" mb={4} themeColor="dark">
                Queremos conhecer um pouco
                <br />
                mais sobre você
            </Title3>

            <Flex display="flex" flexWrap="wrap">
                <Box overflow="hidden" width="100%">
                    <FormStyled id="conhecerMaisFormId" onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={4} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }} maxWidth="500px">
                            <Cell>
                                <InvalidResponseMessageContainerStyled>
                                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(1)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 1}>1</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 1 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Qual o seu sexo?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 1} ml={4}>
                                    <ConhecerMaisRadioStyled defaultChecked={false} defaultValue="masculino" id="sexo_masculino" name="sexo" onChange={handleSetValue()} type="radio" />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_masculino" fontWeight="700" px={{ d: 3, md: 4 }} onClick={handlePart(2)} py={2}>
                                        Masculino
                                    </Label>

                                    <ConhecerMaisRadioStyled defaultChecked={false} defaultValue="feminino" id="sexo_feminino" name="sexo" onChange={handleSetValue()} type="radio" />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_feminino" fontWeight="700" ml={4} onClick={handlePart(2)} px={{ d: 3, md: 4 }} py={2}>
                                        Feminino
                                    </Label>
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(2)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 2}>2</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 2 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Quando que você nasceu?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 2} ml={4}>
                                    <Label text="Data de Nascimento" />

                                    <div>
                                        <InputMaskValidation
                                            error={errors.data_nascimento}
                                            mask={customMaskRegex.date}
                                            name="data_nascimento"
                                            onChange={handleValidation()}
                                            placeholder="dd/mm/aaaa"
                                            pr={4}
                                            touched={touched}
                                            {...otherProps}
                                        />
                                    </div>

                                    {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(3)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 3}>3</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 3 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Onde você mora?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 3} ml={4}>
                                    <Box display="inline-block">
                                        <Label text="Cidade" />

                                        <div>
                                            <InputValidation
                                                error={errors.endereco_cidade}
                                                maxLength="50"
                                                name="endereco_cidade"
                                                onChange={handleValidation()}
                                                pr={4}
                                                placeholder="Cidade"
                                                touched={touched}
                                                {...otherProps}
                                            />
                                        </div>

                                        {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                                    </Box>

                                    <Box display="inline-block" ml={{ d: 0, md: 4 }} mt={{ d: 4, md: 0 }}>
                                        <Label text="Estado" />

                                        <div>
                                            <Select
                                                name="endereco_estado"
                                                obj={{
                                                    color: touched['endereco_estado'] ? 'colorGrayDark' : 'colorGray',
                                                    colorLine: 'colorPrimary',
                                                    fontWeight: touched['endereco_estado'] ? '600' : '400'
                                                }}
                                                onChange={handleSetValue()}
                                            >
                                                <OptionUF />
                                            </Select>
                                        </div>
                                    </Box>
                                </ConhecerMaisPartContentStyled>
                            </Cell>
                        </Grid>

                        <Box my={4} width="100%">
                            {statePart < 3 && (
                                <Button
                                    fontSize={{ d: 16, sm: 18 }}
                                    mx="auto"
                                    onClick={handlePart(statePart + 1)}
                                    text="Pular Etapa"
                                    textTransform="none"
                                    themeSize="small"
                                    themeType="border"
                                    width="160px"
                                />
                            )}

                            {statePart === 3 && <Button fontSize={{ d: 16, sm: 18 }} mx="auto" text="Concluir" textTransform="none" themeSize="small" typeButton="submit" width="160px" />}
                        </Box>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};
