import React, { useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato } from '../../config';

import { useContatoApi } from '../../service/contato';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { Input } from './Form';

import { FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Span, Title3 } from '../../style/text';

export const NoticiaForm = ({ ...props }) => {
    // ACTION
    const [stateContato, setStateContatoData] = useContatoApi(null, {});
    const [stateRetornoForm, setStateRetornoForm] = useState(false);

    // FORM
    const { errors, formState, handleSubmit, register } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        setStateContatoData({ data: formData, url: apiUrlContato });
    };

    if (stateContato.data && stateContato.data.success == true) {
        setStateRetornoForm(true);
    }

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box alignContent="center" display={stateRetornoForm ? 'inline-flex' : { d: 'none', sm: 'inline-flex' }} flexWrap="wrap" minHeight={stateRetornoForm ? '60vh' : '100%'} p="75px" width={stateRetornoForm ? '100%' : 1 / 2}>
                {stateRetornoForm ? (
                    <>
                        <Title3 fontWeight="600" mb={4} mx="auto" textAlign="center">
                            Retorno
                        </Title3>
                    </>
                ) : (
                    <>
                        <Title3 fontWeight="600" mb={4}>
                            Teste
                        </Title3>
                    </>
                )}
            </Box>

            <Box overflow="hidden" width={stateRetornoForm ? '0' : { d: 1, sm: 1 / 2 }}>
                <FormStyled onSubmit={handleSubmit(onSubmit)} {...props}>
                    <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" gridRowGap={2} p={{ d: 3, md: 5 }}>
                        {errors.invalid && <InvalidResponseMessage>{errors.invalid.message}</InvalidResponseMessage>}

                        <Cell mb={3} width="100%">
                            <Title3 fontWeight="600" mb={1} themeColor="dark">
                                Solicite contato
                            </Title3>
                            <p>e comece a investir em seu futuro</p>
                        </Cell>

                        <Cell mb={3} width="100%">
                            <Input error={errors.nome} maxLength="50" name="nome" placeholder="Nome" ref={register({ ...customValidate.name, ...customValidate.require })} touched={formState.touched} />
                            {errors.nome && <InvalidInputMessage>{errors.nome.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell mb={3} width="100%">
                            <Input error={errors.email} maxLength="50" name="email" placeholder="E-mail" ref={register(customValidate.email)} touched={formState.touched} />
                            {errors.email && <InvalidInputMessage>{errors.email.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell mb={5} width="100%">
                            <Input error={errors.telefone} maxLength="50" name="telefone" placeholder="Telefone" ref={register(customValidate.phone)} touched={formState.touched} />
                            {errors.telefone && <InvalidInputMessage>{errors.telefone.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell mb={3} width="100%">
                            <Button className="btn btn-lg btn-100" text="Quero Investir" typeButton="submit" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};
