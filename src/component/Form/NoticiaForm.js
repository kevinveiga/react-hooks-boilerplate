import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlContato, errorMsgDefault } from '../../config';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Span, Title3 } from '../../style/text';

export const NoticiaForm = memo(({ ...props }) => {
    // ACTION
    const [stateError, setStateError] = useState(false);
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlContato, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    setStateRetornoForm(true);
                } else if (result.data.reason) {
                    setStateError(result.data.reason[0]);
                } else {
                    setStateError(errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    setStateError(responseError(error.response.data.errors));
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box
                alignItems="center"
                display={stateRetornoForm ? 'inline-flex' : { d: 'none', sm: 'inline-flex' }}
                flexWrap="wrap"
                minHeight={stateRetornoForm ? '60vh' : '100%'}
                p="75px"
                width={stateRetornoForm ? '100%' : 1 / 2}
            >
                {stateRetornoForm && (
                    <>
                        <Title3 fontWeight="700" mb={4} mx="auto" textAlign="center" themeColor="light">
                            Você deu o primeiro passo para sua <br /> <Span color="colorGreen">liberdade</Span>
                        </Title3>

                        <P mx="auto" textAlign="center" themeColor="light">
                            Em breve um de nossos assessores de investimentos irá entrar em contato.
                        </P>
                    </>
                )}
            </Box>

            <Box overflow="hidden" width={stateRetornoForm ? '0' : { d: 1, sm: 1 / 2 }}>
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <Grid display="grid" gridRowGap={2} p={{ d: 3, md: 5 }}>
                        <Cell mb={3}>
                            <Title3 fontWeight="700" mb={1} themeColor="dark">
                                Solicite contato
                            </Title3>

                            <p>e comece a investir em seu futuro</p>
                        </Cell>

                        <Cell>
                            <ResponseMessageContainerStyled>
                                {stateError && <ResponseMessageStyled>{stateError}</ResponseMessageStyled>}
                            </ResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.nome}
                                                maxLength="50"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                placeholder="Nome"
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="nome"
                                    rules={{ ...customValidate.name, ...customValidate.require }}
                                />
                            </div>

                            {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputValidation
                                                error={errors.email}
                                                maxLength="50"
                                                name={name}
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                }}
                                                placeholder="E-mail"
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="email"
                                    rules={{ ...customValidate.email, ...customValidate.require }}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={5}>
                            <div>
                                <Controller
                                    render={({ name, onBlur, onChange, value }) => {
                                        return (
                                            <InputMaskValidation
                                                error={errors.telefone}
                                                format="(##) #####-####"
                                                name={name}
                                                onBlur={onBlur}
                                                onValueChange={(values) => {
                                                    onChange(values.value);
                                                }}
                                                placeholder="Celular"
                                                pr={4}
                                                touched={touched}
                                                value={value}
                                                {...props}
                                            />
                                        );
                                    }}
                                    control={control}
                                    name="telefone"
                                    rules={{ ...customValidate.cellphone, ...customValidate.require }}
                                />
                            </div>

                            {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <Button fontSize={{ d: '16px', md: '18px' }} height="60px" text="Quero Investir" typeButton="submit" width="100%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
});
