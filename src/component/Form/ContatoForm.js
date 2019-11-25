import React from 'react';

import useForm from 'react-hook-form';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { Title3 } from '../../style/text';

export const NoticiaForm = ({ ...props }) => {
    // FORM
    const { errors, formState, handleSubmit, register } = useForm({
        mode: 'onChange'
    });

    const submitForm = (data) => {
        // TODO: envio de formulário
        console.log(data);
    };

    console.log(errors);

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridAutoColumns="1fr" gridColumnGap={4} gridRowGap={2} p={5}>
                <Cell mb={3} width="100%">
                    <Title3 fontWeight="600" mb={1} themeColor="dark">
                        Solicite contato
                    </Title3>
                    <p>e comece a investir em seu futuro</p>
                </Cell>

                <Cell mb={3} width="100%">
                    <Input error={errors.nome} maxLength="50" name="nome" placeholder="Nome" ref={register(customValidate.name)} touched={formState.touched} />
                </Cell>

                <Cell mb={3} width="100%">
                    <Input error={errors.email} maxLength="50" name="email" placeholder="E-mail" ref={register(customValidate.email)} touched={formState.touched} />
                </Cell>

                <Cell mb={5} width="100%">
                    <Input error={errors.telefone} maxLength="50" name="telefone" placeholder="Telefone" ref={register(customValidate.phone)} touched={formState.touched} />
                </Cell>

                <Cell mb={3} width="100%">
                    <Button className="btn btn-lg btn-100" text="Solicitar Contato" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
