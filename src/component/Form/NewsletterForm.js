import React from 'react';
import useForm from 'react-hook-form';

import { apiUrlNewsletter } from '../../config';

import { useNewsletterApi } from '../../service/newsletter';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P, Title5 } from '../../style/text';

export const NewsletterForm = ({ ...props }) => {
    // API
    const [stateNewsletter, setStateNewsletterData] = useNewsletterApi(null, {});

    // FORM
    const { errors, formState, handleSubmit, register, setError } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        setStateNewsletterData({ data: formData, url: apiUrlNewsletter });
    };

    if (stateNewsletter.data && stateNewsletter.data.success == false) {
        setError('invalid', 'notMatch', stateNewsletter.data.reason[0]);
    }

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
                    <Input error={errors.nome} maxLength="50" name="nome" placeholder="Nome" ref={register(customValidate.name)} touched={formState.touched} />
                    {errors.nome && <InvalidInputMessage>{errors.nome.message}</InvalidInputMessage>}
                </Cell>

                <Cell mb={3}>
                    <Input error={errors.email} maxLength="50" name="email" placeholder="E-mail" ref={register(customValidate.email)} touched={formState.touched} />
                    {errors.email && <InvalidInputMessage>{errors.email.message}</InvalidInputMessage>}
                </Cell>

                <Cell mb={3} gridColumn={{ d: 1, sm: '1 / span 2', lg: 2 }}>
                    <Button className="btn btn-primary btn-sm btn-right" text="Quero Assinar" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
