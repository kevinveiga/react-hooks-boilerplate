import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato, defaultErrorMsg } from '../../config';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label, Select } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';
import { ConhecerMaisPartContentStyled, ConhecerMaisPartNumberStyled, ConhecerMaisPartTitleStyled, ConhecerMaisRadioStyled } from './ConhecerMaisFormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Span, Title3 } from '../../style/text';

const ConhecerMaisForm = ({ ...props }) => {
    // ACTION
    const [statePart, setStatePart] = useState(1);
    const [stateSelectEstado, setStateSelectEstado] = useState(null);

    useEffect(() => {
        register({ name: 'data' }, { ...customValidate.date });
        register({ name: 'endereco_cidade' }, { ...customValidate.require });
        register({ name: 'endereco_estado' });
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
                    // TODO: fazer redirect para página inicial do usuário
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
            <Title3 align="center" fontWeight="600" mb={4} themeColor="dark">
                Queremos conhecer um pouco
                <br />
                mais sobre você
            </Title3>

            <Flex display="flex" flexWrap="wrap">
                <Box overflow="hidden" width="100%">
                    <FormStyled onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={4} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }} maxWidth="500px">
                            <InvalidResponseMessageContainerStyled>{errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}</InvalidResponseMessageContainerStyled>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(1)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 1}>1</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 1 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Qual o seu sexo?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 1} ml={4}>
                                    <ConhecerMaisRadioStyled id="sexo_masculino" name="sexo" type="radio" />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_masculino" fontWeight="600" px={{ d: 3, md: 4 }} py={2}>
                                        Masculino
                                    </Label>

                                    <ConhecerMaisRadioStyled id="sexo_feminino" name="sexo" type="radio" />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_feminino" fontWeight="600" ml={4} px={{ d: 3, md: 4 }} py={2}>
                                        Feminino
                                    </Label>
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(2)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 2}>2</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 2 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Quando que você nasceu?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 2} ml={4}>
                                    <Label text="Data de Nascimento" />

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
                                            {...props}
                                        />
                                    </div>

                                    {errors.data && <InvalidInputMessageStyled>{errors.data.message}</InvalidInputMessageStyled>}
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(3)}>
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
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                placeholder="Cidade"
                                                touched={formState.touched}
                                                {...props}
                                            />
                                        </div>

                                        {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                                    </Box>

                                    <Box display="inline-block" ml={{ d: 0, md: 4 }} mt={{ d: 4, md: 0 }}>
                                        <Label text="Estado" />

                                        <div>
                                            <Select
                                                name="endereco_estado"
                                                obj={{ color: stateSelectEstado ? 'colorGrayDark' : 'colorGray', colorLine: 'colorPrimary', fontWeight: stateSelectEstado ? '600' : '400' }}
                                                onChange={(e) => {
                                                    const selectValue = e.target.value;
                                                    setStateSelectEstado(selectValue);
                                                }}
                                                value={stateSelectEstado}
                                            >
                                                <option value="">UF</option>
                                                <option value="rj">RJ</option>
                                                <option value="rs">RS</option>
                                                <option value="sp">SP</option>
                                            </Select>
                                        </div>
                                    </Box>
                                </ConhecerMaisPartContentStyled>
                            </Cell>
                        </Grid>

                        <Box my={4} width="100%">
                            {statePart < 3 ? (
                                <Button
                                    fontSize={{ d: 16, sm: 18 }}
                                    m="auto"
                                    onClick={() => {
                                        const nextPart = statePart + 1;
                                        setStatePart(nextPart);
                                    }}
                                    text="Pular Etapa"
                                    textTransform="none"
                                    themeSize="small"
                                    themeType="border"
                                    width="160px"
                                />
                            ) : (
                                <Button fontSize={{ d: 16, sm: 18 }} m="auto" text="Concluir" textTransform="none" themeSize="small" typeButton="submit" width="160px" />
                            )}
                        </Box>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};

export default ConhecerMaisForm;
