import React from 'react';
import useForm from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { Title3 } from '../../style/text';
import { customValidate } from '../../util/customValidate';

export const NoticiaForm = ({ ...props }) => {
    const { errors, formState, handleSubmit, register } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        // TODO: envio de formulário
        console.log(data);
    };

    console.log(errors);

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)} {...props}>
            <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" gridColumnGap={4} gridRowGap={2} p={5}>
                <Cell mb={3} width={1}>
                    <Title3 fontWeight="600" mb={1} themeColor="dark">
                        Solicite contato
                    </Title3>
                    <p>e comece a investir em seu futuro</p>
                </Cell>

                <Cell mb={3} width={1}>
                    <Input error={errors.nome} maxLength="50" name="nome" placeholder="Nome" ref={register(customValidate.name)} touched={formState.touched} />
                </Cell>

                <Cell mb={3} width={1}>
                    <Input error={errors.email} maxLength="50" name="email" placeholder="E-mail" ref={register(customValidate.email)} touched={formState.touched} />
                </Cell>

                <Cell mb={5} width={1}>
                    <Input error={errors.telefone} maxLength="50" name="telefone" placeholder="Telefone" ref={register(customValidate.phone)} touched={formState.touched} />
                </Cell>

                <Cell mb={3} width={1}>
                    <Button className="btn btn-lg btn-100" text="Solicitar Contato" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
