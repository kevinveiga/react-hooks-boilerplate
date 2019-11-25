import React, { useEffect, useState } from 'react';

import axios from 'axios';
import useForm from 'react-hook-form';

import { apiUrlNewsletter, defaultErrorMsg } from '../../config';

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
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });

        return undefined;
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
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
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error('result: ', result);
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

            <P fontSize={14} textAlign="center">
                Você receberá em seu e-mail os melhores conteúdos
                <br />
                sobre investimentos e mercado financeiro.
            </P>
        </div>
    ) : (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridColumnGap={4} gridRowGap={2} gridTemplateColumns={{ d: '1fr', sm: 'repeat(auto-fit, minmax(150px, 1fr))' }} justifyContent="flex-end">
                <InvalidResponseMessageContainerStyled left="0" position="absolute" top="-15px">
                    {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                </InvalidResponseMessageContainerStyled>

                <Cell mb={3}>
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

                <Cell mb={3}>
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

                <Cell mb={3} gridColumn={{ d: 1, sm: '1 / span 2', lg: 2 }}>
                    <Button ml="auto" text="Quero Assinar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
