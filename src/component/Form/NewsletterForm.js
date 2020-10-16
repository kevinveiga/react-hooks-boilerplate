import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlNewsletter, errorMsgDefault } from '../../config';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P, Title5 } from '../../style/text';

export const NewsletterForm = memo(({ ...props }) => {
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
                const result = await axios.post(apiUrlNewsletter, formData, { headers: { 'Content-Type': 'application/json' } });

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
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid
                display="grid"
                gridColumnGap={4}
                gridRowGap={2}
                gridTemplateColumns={{ d: '1fr', sm: 'repeat(auto-fit, minmax(150px, 1fr))' }}
                justifyContent="flex-end"
            >
                <InvalidResponseMessageContainerStyled left="0" position="absolute" top="-15px">
                    {stateError && <InvalidResponseMessageStyled>{stateError}</InvalidResponseMessageStyled>}
                </InvalidResponseMessageContainerStyled>

                <Cell mb={3}>
                    <div>
                        <Controller
                            as={<InputValidation error={errors.nome} maxLength="50" placeholder="Nome" pr={4} touched={touched} {...props} />}
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
                            as={<InputValidation error={errors.email} maxLength="50" placeholder="E-mail" pr={4} touched={touched} {...props} />}
                            control={control}
                            name="email"
                            rules={{ ...customValidate.email, ...customValidate.require }}
                        />
                    </div>

                    {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell mb={3} gridColumn={{ d: 1, sm: '1 / span 2', lg: 2 }}>
                    <Button ml="auto" text="Quero Assinar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
