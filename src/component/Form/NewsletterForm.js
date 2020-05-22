import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlNewsletter, errorMsgDefault } from '../../config';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P, Title5 } from '../../style/text';

export const NewsletterForm = ({ ...props }) => {
    // ACTION
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

    useEffect(() => {
        register('email', { ...customValidate.email, ...customValidate.require });
        register('nome', { ...customValidate.name, ...customValidate.require });

        return () => {
            unregister('email');
            unregister('nome');
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
                const result = await axios.post(apiUrlNewsletter, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateRetornoForm(true);
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                console.error('error: ', error);
            }
        };

        fetchData();
    };

    return stateRetornoForm ? (
        <div>
            <Title5 color="colorPrimary" mb={2} themeColor="dark">
                Obrigado por se cadastrar em nossa newsletter!
            </Title5>

            <P fontSize="14px" textAlign="center" themeColor="light">
                Você receberá em seu e-mail os melhores conteúdos
                <br />
                sobre investimentos e mercado financeiro.
            </P>
        </div>
    ) : (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid
                display="grid"
                gridColumnGap={4}
                gridRowGap={2}
                gridTemplateColumns={{ d: '1fr', sm: 'repeat(auto-fit, minmax(150px, 1fr))' }}
                justifyContent="flex-end"
            >
                <InvalidResponseMessageContainerStyled left="0" position="absolute" top="-15px">
                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                </InvalidResponseMessageContainerStyled>

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

                <Cell mb={3} gridColumn={{ d: 1, sm: '1 / span 2', lg: 2 }}>
                    <Button ml="auto" text="Quero Assinar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
