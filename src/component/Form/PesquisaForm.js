import React, { useContext, useEffect } from 'react';

import useForm from 'react-hook-form';

import { apiUrlNoticias } from '../../config';

import { PesquisaContext } from '../../store/pesquisa/pesquisaContext';

import { Button } from '../Button/Button';
import { Input } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const PesquisaForm = ({ ...props }) => {
    // CONTEXT
    const setStatePesquisaDataContext = useContext(PesquisaContext);

    // ACTION
    useEffect(() => {
        register({ name: 'query' });

        return undefined;
    }, [register]);

    const keyPress = (e, fn) => {
        if (e.keyCode == 13) {
            handleSubmit(fn);
        }
    };

    // FORM
    const { handleSubmit, register, triggerValidation } = useForm({
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {
        window.history.replaceState('Pesquisa', '', formData.query);

        setStatePesquisaDataContext({ params: formData, url: `${apiUrlNoticias}/busca` });
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridAutoColumns="1fr" gridTemplateColumns={{ d: '1fr', xs: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                <Cell mb={3}>
                    <Svg height="25px" left="12px" name="svg-search" position="absolute" top="12px" zIndex={1} />

                    <Input
                        maxLength="50"
                        name="query"
                        onChange={async (e) => {
                            const input = e.target;
                            await triggerValidation({ name: input.name, value: input.value });
                        }}
                        onKeyDown={(e) => {
                            keyPress(e, submitForm);
                        }}
                        placeholder="O que você procura?"
                        {...props}
                    />
                </Cell>

                <Cell mb={3}>
                    <Button mx={{ d: 'auto', xs: 0 }} text="Buscar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
};
