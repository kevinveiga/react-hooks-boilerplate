import React, { memo, useCallback, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPerfil, errorMsgDefault } from '../../config';

import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { redirectRule } from '../../util/redirectRule';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label, SelectValidation } from './Form';
import { OptionUF } from './OptionUF';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';
import {
    ConhecerMaisPartContentStyled,
    ConhecerMaisPartNumberStyled,
    ConhecerMaisPartTitleStyled,
    ConhecerMaisRadioStyled
} from './ConhecerMaisFormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Span, Title3 } from '../../style/text';

export const ConhecerMaisForm = memo(({ formId, ...props }) => {
    // ACTION
    const [statePart, setStatePart] = useState(1);

    // FUNCTION
    const handlePart = useCallback(
        (value) => () => {
            setStatePart(value);
        },
        []
    );

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setError,
        setValue
    } = useForm({
        defaultValues: { sexo: '', data_nascimento: '', endereco_cidade: '', endereco_uf: '' },
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfil, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    // Regras de redirecionamento
                    redirectRule();
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message) {
                        setError('invalid', { type: 'manual', message: error.response.data.message });
                    } else {
                        setError('invalid', { type: 'manual', message: responseError(error.response.data.errors) });
                    }
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
                    <FormStyled id={formId} onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={4} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }} maxWidth="500px">
                            <Cell>
                                <InvalidResponseMessageContainerStyled>
                                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                                </InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(1)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 1}>1</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 1 ? 'colorGrayDark' : 'colorGrayLight'} fontSize="18px">
                                        Qual o seu sexo?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 1} ml={4}>
                                    <Controller
                                        as={
                                            <ConhecerMaisRadioStyled
                                                defaultChecked={false}
                                                defaultValue="masculino"
                                                id="sexo_masculino"
                                                type="radio"
                                            />
                                        }
                                        control={control}
                                        name="sexo"
                                    />

                                    <Label
                                        color="colorGrayDark"
                                        fontSize="14px"
                                        forLabel="sexo_masculino"
                                        fontWeight="700"
                                        px={{ d: 3, md: 4 }}
                                        onClick={handlePart(2)}
                                        py={2}
                                    >
                                        Masculino
                                    </Label>

                                    <Controller
                                        as={
                                            <ConhecerMaisRadioStyled defaultChecked={false} defaultValue="feminino" id="sexo_feminino" type="radio" />
                                        }
                                        control={control}
                                        name="sexo"
                                    />

                                    <Label
                                        color="colorGrayDark"
                                        fontSize="14px"
                                        forLabel="sexo_feminino"
                                        fontWeight="700"
                                        ml={4}
                                        onClick={handlePart(2)}
                                        px={{ d: 3, md: 4 }}
                                        py={2}
                                    >
                                        Feminino
                                    </Label>
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(2)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 2}>2</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 2 ? 'colorGrayDark' : 'colorGrayLight'} fontSize="18px">
                                        Quando que você nasceu?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 2} ml={4}>
                                    <Label mb="-15px" text="Data de Nascimento" />

                                    <div>
                                        <Controller
                                            render={({ name, onBlur, onChange, value }) => (
                                                <InputMaskValidation
                                                    error={errors.data_nascimento}
                                                    format="##/##/####"
                                                    mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
                                                    name={name}
                                                    onBlur={onBlur}
                                                    onValueChange={(values) => {
                                                        onChange(values.value);
                                                    }}
                                                    placeholder="dd/mm/aaaa"
                                                    pr={4}
                                                    touched={touched}
                                                    value={value}
                                                    {...props}
                                                />
                                            )}
                                            control={control}
                                            name="data_nascimento"
                                            rules={{ ...customValidate.date }}
                                        />
                                    </div>

                                    {errors.data_nascimento && (
                                        <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>
                                    )}
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={handlePart(3)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 3}>3</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 3 ? 'colorGrayDark' : 'colorGrayLight'} fontSize="18px">
                                        Onde você mora?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 3} ml={4}>
                                    <Box display="inline-block">
                                        <Label mb="-15px" text="Cidade" />

                                        <div>
                                            <Controller
                                                as={
                                                    <InputValidation
                                                        error={errors.endereco_cidade}
                                                        maxLength="50"
                                                        placeholder="Cidade"
                                                        pr={4}
                                                        touched={touched}
                                                        {...props}
                                                    />
                                                }
                                                control={control}
                                                name="endereco_cidade"
                                                rules={{ ...customValidate.require }}
                                            />
                                        </div>

                                        {errors.endereco_cidade && (
                                            <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>
                                        )}
                                    </Box>

                                    <Box display="inline-block" ml={{ d: 0, md: 4 }} mt={{ d: 4, md: 0 }}>
                                        <Label mb="-15px" text="Estado" />

                                        <div>
                                            <Controller
                                                as={
                                                    <SelectValidation
                                                        error={errors.endereco_uf}
                                                        obj={{
                                                            color: touched['endereco_uf'] ? 'colorGrayDark' : 'colorGray',
                                                            colorLine: 'colorPrimary',
                                                            fontWeight: touched['endereco_uf'] ? '700' : '400'
                                                        }}
                                                        touched={touched}
                                                        {...props}
                                                    >
                                                        <OptionUF />
                                                    </SelectValidation>
                                                }
                                                control={control}
                                                name="endereco_uf"
                                                rules={{ ...customValidate.require }}
                                            />
                                        </div>

                                        {errors.endereco_uf && <InvalidInputMessageStyled>{errors.endereco_uf.message}</InvalidInputMessageStyled>}
                                    </Box>
                                </ConhecerMaisPartContentStyled>
                            </Cell>
                        </Grid>

                        <Box my={4} width="100%">
                            {statePart < 3 && (
                                <Button
                                    fontSize={{ d: '16px', sm: '18px' }}
                                    mx="auto"
                                    onClick={handlePart(statePart + 1)}
                                    text="Pular Etapa"
                                    textTransform="none"
                                    themeSize="small"
                                    themeType="border"
                                    width="160px"
                                />
                            )}

                            {statePart === 3 && (
                                <Button
                                    fontSize={{ d: '16px', sm: '18px' }}
                                    mx="auto"
                                    text="Concluir"
                                    textTransform="none"
                                    themeSize="small"
                                    typeButton="submit"
                                    width="160px"
                                />
                            )}
                        </Box>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
});
