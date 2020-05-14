import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

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

export const NoticiaForm = ({ ...props }) => {
    // ACTION
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

    useEffect(() => {
        register('nome', { ...customValidate.name, ...customValidate.require });
        register('email', { ...customValidate.email, ...customValidate.require });
        register('telefone', { ...customValidate.phone, ...customValidate.require });

        return () => {
            unregister('nome');
            unregister('email');
            unregister('telefone');
        };
    }, [register, unregister]);

    // FUNCTION
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
        triggerValidation,
        unregister
    } = useForm({
        mode: 'onSubmit'
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

                    console.error('result error: ', result);
                }
            } catch (error) {
                console.error('error: ', error);
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
            <Box
                alignItems="center"
                display={stateRetornoForm ? 'inline-flex' : { d: 'none', sm: 'inline-flex' }}
                flexWrap="wrap"
                minHeight={stateRetornoForm ? '60vh' : '100%'}
                p="75px"
                width={stateRetornoForm ? '100%' : 1 / 2}
            >
                {stateRetornoForm ? (
                    <>
                        <Title3 fontWeight="700" mb={4} mx="auto" textAlign="center" themeColor="light">
                            Você deu o primeiro passo para sua <br /> <Span color="colorGreen">liberdade</Span>
                        </Title3>

                        <P mx="auto" textAlign="center" themeColor="light">
                            Em breve um de nossos assessores de investimentos irá entrar em contato.
                        </P>
                    </>
                ) : (
                    <>
                        <Title3 fontWeight="700" mb={4} themeColor="light">
                            A <Span color="colorGreen">liberdade</Span> <br /> é feita com bons <Span color="colorGreen">investimentos.</Span>
                        </Title3>

                        <P themeColor="light">
                            A Liberta é um dos maiores escritórios credenciados à XP Investimentos e com mais de R$ 1 bilhão em custódia.
                        </P>
                    </>
                )}
            </Box>

            <Box overflow="hidden" width={stateRetornoForm ? '0' : { d: 1, sm: 1 / 2 }}>
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridRowGap={2} p={{ d: 3, md: 5 }}>
                        <Cell mb={3}>
                            <Title3 fontWeight="700" mb={1} themeColor="dark">
                                Solicite contato
                            </Title3>
                            <p>e comece a investir em seu futuro</p>
                        </Cell>

                        <Cell>
                            <InvalidResponseMessageContainerStyled>
                                {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                            </InvalidResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <InputValidation
                                error={errors.nome}
                                maxLength="50"
                                name="nome"
                                onChange={handleValidation()}
                                placeholder="Nome"
                                pr={4}
                                touched={touched}
                                {...props}
                            />
                            {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <InputValidation
                                error={errors.email}
                                maxLength="50"
                                name="email"
                                onChange={handleValidation()}
                                placeholder="E-mail"
                                pr={4}
                                touched={touched}
                                {...props}
                            />
                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={5}>
                            <InputMaskValidation
                                error={errors.telefone}
                                mask={customMaskRegex.phone}
                                name="telefone"
                                onChange={handleValidation()}
                                placeholder="Telefone"
                                pr={4}
                                touched={touched}
                                {...props}
                            />
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
};
