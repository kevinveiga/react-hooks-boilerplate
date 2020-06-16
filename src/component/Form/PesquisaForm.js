import React, { useCallback, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { apiUrlNoticias } from '../../config';

import { PesquisaContext } from '../../store/pesquisa/pesquisaContext';

import { Button } from '../Button/Button';
import { Input } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const PesquisaForm = ({ ...props }) => {
    // CONTEXT
    const { setStatePesquisaDataContext } = useContext(PesquisaContext);

    // ACTION
    useEffect(() => {
        register('query');

        return () => {
            unregister('query');
        };
    }, [register, unregister]);

    // FUNCTION
    const keyPress = useCallback(
        (fn) => (element) => {
            if (element.keyCode == 13) {
                handleSubmit(fn);
            }
        },
        [handleSubmit]
    );

    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
            triggerValidation([element.target.name]);
        },
        [setValue, triggerValidation]
    );

    // FORM
    const { handleSubmit, register, setValue, triggerValidation, unregister } = useForm({
        mode: 'onSubmit'
    });

    const submitForm = (formData) => {
        if (formData.query) {
            window.history.replaceState('pesquisa', '', `pesquisa/${formData.query}`);

            setStatePesquisaDataContext({ params: formData, url: `${apiUrlNoticias}/busca` });
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit(submitForm)}>
            <Grid display="grid" gridAutoColumns="1fr" gridTemplateColumns={{ d: '1fr', xs: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                <Cell mb={3}>
                    <Svg height="25px" left="12px" name="svg-search" position="absolute" top="12px" zIndex={1} />

                    <Input
                        maxLength="50"
                        name="query"
                        onChange={handleValidation()}
                        onKeyDown={keyPress(submitForm)}
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
