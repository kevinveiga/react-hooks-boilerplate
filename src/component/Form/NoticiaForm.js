import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato } from '../../config';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Span, Title3 } from '../../style/text';

export const NoticiaForm = ({ ...props }) => {
    // ACTION
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

    useEffect(() => {
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'email' }, { ...customValidate.email });
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

                if (result && result.success == false) {
                    setError('invalid', 'notMatch', result.reason[0]);
                } else {
                    setStateRetornoForm(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box alignContent="center" display={stateRetornoForm ? 'inline-flex' : { d: 'none', sm: 'inline-flex' }} flexWrap="wrap" minHeight={stateRetornoForm ? '60vh' : '100%'} p="75px" width={stateRetornoForm ? '100%' : 1 / 2}>
                {stateRetornoForm ? (
                    <>
                        <Title3 fontWeight="600" mb={4} mx="auto" textAlign="center" themeColor="light">
                            Retorno
                        </Title3>
                    </>
                ) : (
                    <>
                        <Title3 fontWeight="600" mb={4} themeColor="light">
                            Teste
                        </Title3>
                    </>
                )}
            </Box>

            <Box overflow="hidden" width={stateRetornoForm ? '0' : { d: 1, sm: 1 / 2 }}>
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridAutoColumns="1fr" gridRowGap={2} p={{ d: 3, md: 5 }}>
                        {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}

                        <Cell mb={3} width="100%">
                            <Title3 fontWeight="600" mb={1} themeColor="dark">
                                Solicite contato
                            </Title3>
                            <p>e comece a investir em seu futuro</p>
                        </Cell>

                        <Cell mb={3} width="100%">
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
                                {...props}
                            />
                            {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3} width="100%">
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
                                {...props}
                            />
                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={5} width="100%">
                            <InputMaskValidation
                                error={errors.telefone}
                                mask={customMaskRegex.phone}
                                name="telefone"
                                onChange={async (e) => {
                                    const input = e.target;
                                    await triggerValidation({ name: input.name, value: input.value });
                                }}
                                placeholder="Telefone"
                                touched={formState.touched}
                                {...props}
                            />
                            {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3} width="100%">
                            <Button fontSize={{ d: 16, md: 18 }} height="70px" text="Quero Investir" typeButton="submit" width="100%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};
