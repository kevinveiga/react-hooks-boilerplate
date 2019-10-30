import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato, defaultErrorMsg } from '../../config';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation } from './Form';
import { BgImageLazyLoad } from '../LazyLoad/BgImageLazyLoad';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Span, Title3 } from '../../style/text';

const NoticiaForm = ({ ...props }) => {
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

                if (result.data && result.data.success == true) {
                    setStateRetornoForm(true);
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

        // const arrayOfObjects = [];

        // Object.keys(formData).map((key) => {
        //     const currentObject = formData[key];

        //     const newObject = {
        //         name: key,
        //         value: currentObject
        //     };

        //     return arrayOfObjects.push(newObject);
        // });

        // const titleObj = {
        //     name: 'identificador',
        //     value: 'Solicitou contato'
        // };

        // const tokenObj = {
        //     name: 'token_rdstation',
        //     value: 'a2355c67a1ed194cc301e2c0edf6495e'
        // };

        // arrayOfObjects.push(titleObj);
        // arrayOfObjects.push(tokenObj);

        // RdIntegration.post(arrayOfObjects, () => {
        //     setStateRetornoForm(true);
        // });
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box alignContent="center" display={stateRetornoForm ? 'inline-flex' : { d: 'none', sm: 'inline-flex' }} flexWrap="wrap" minHeight={stateRetornoForm ? '60vh' : '100%'} p="75px" width={stateRetornoForm ? '100%' : 1 / 2}>
                {stateRetornoForm ? (
                    <>
                        <Title3 fontWeight="600" mb={4} mx="auto" textAlign="center" themeColor="light">
                            Você deu o primeiro passo para sua <br /> <Span color="colorGreen">liberdade</Span>
                        </Title3>

                        <P mx="auto" textAlign="center" themeColor="light">
                            Em breve um de nossos assessores de investimentos irá entrar em contato.
                        </P>
                    </>
                ) : (
                    <>
                        <P themeColor="light">Texto</P>
                    </>
                )}
            </Box>

            <Box overflow="hidden" width={stateRetornoForm ? '0' : { d: 1, sm: 1 / 2 }}>
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridAutoColumns="1fr" gridRowGap={2} p={{ d: 3, md: 5 }}>
                        <Cell mb={3} width="100%">
                            <Title3 fontWeight="600" mb={1} themeColor="dark">
                                Solicite contato
                            </Title3>
                            <p>e comece a investir em seu futuro</p>
                        </Cell>

                        <InvalidResponseMessageContainerStyled>{errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}</InvalidResponseMessageContainerStyled>

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

export default NoticiaForm;
