import React, { useEffect } from 'react';
import useForm from 'react-hook-form';

import { apiUrlNewsletter } from '../../config';

import { useNewsletterApi } from '../../service/newsletter';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P, Title5 } from '../../style/text';

export const NewsletterForm = ({ ...props }) => {
    // API
    const [stateNewsletter, setStateNewsletterData] = useNewsletterApi(null, {});

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        setStateNewsletterData({ data: formData, url: apiUrlNewsletter });
    };

    if (stateNewsletter.data && stateNewsletter.data.success == false) {
        setError('invalid', 'notMatch', stateNewsletter.data.reason[0]);
    }

    useEffect(() => {
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'email' }, { ...customValidate.email });
    }, [register]);

    return stateNewsletter.data && stateNewsletter.data.success == true ? (
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
        <FormStyled onSubmit={handleSubmit(onSubmit)} {...props}>
            <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridColumnGap={4} gridRowGap={2} gridTemplateColumns={{ d: '1fr', sm: 'repeat(auto-fit, minmax(150px, 1fr))' }} justifyContent="flex-end">
                {errors.invalid && <InvalidResponseMessage>{errors.invalid.message}</InvalidResponseMessage>}

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
                    {errors.nome && <InvalidInputMessage>{errors.nome.message}</InvalidInputMessage>}
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
                    {errors.email && <InvalidInputMessage>{errors.email.message}</InvalidInputMessage>}
                </Cell>

                <Cell mb={3} gridColumn={{ d: 1, sm: '1 / span 2', lg: 2 }}>
                    <Button className="btn btn-primary btn-sm btn-right" text="Quero Assinar" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
