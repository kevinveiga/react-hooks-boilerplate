import React, { memo, useCallback, useContext, useRef } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { PesquisaContext } from '../../store/pesquisa/pesquisaContext';

import { Button } from '../Button/Button';
import { Input } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const PesquisaForm = memo(({ ...props }) => {
    // CONTEXT
    const { statePesquisaParamContext, setStatePesquisaParamContext } = useContext(PesquisaContext);

    // REF
    const queryRef = useRef('');

    // FORM
    const { control, handleSubmit, reset } = useForm({
        defaultValues: { query: '' },
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        if (formData.query) {
            setStatePesquisaParamContext({
                ...statePesquisaParamContext,
                params: { ...statePesquisaParamContext.params, page: 1, query: formData.query }
            });
        }
    };

    // FUNCTION
    const keyPress = useCallback(
        (fn) => (element) => {
            if (element.keyCode === 13) {
                handleSubmit(fn);
            }
        },
        [handleSubmit]
    );

    const limparPesquisa = () => () => {
        queryRef.current.value = '';
        reset({ query: '' });
        setStatePesquisaParamContext({
            ...statePesquisaParamContext,
            params: { ...statePesquisaParamContext.params, page: 1, query: '' }
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid display="grid" gridTemplateColumns={{ d: '1fr 1fr', md: '1fr auto auto' }}>
                <Cell gridColumn={{ d: '1 / span 2', md: '1' }} mb={3}>
                    <Svg height="25px" left="12px" name="svg-search" position="absolute" top="12px" zIndex={1} />

                    <Controller
                        control={control}
                        name="query"
                        render={({ name, onBlur, onChange, value }) => {
                            return (
                                <Input
                                    autoComplete="off"
                                    maxLength="50"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                    }}
                                    onKeyDown={keyPress(onSubmit)}
                                    placeholder="O que você procura?"
                                    ref={queryRef}
                                    value={value}
                                    {...props}
                                />
                            );
                        }}
                    />
                </Cell>

                <Cell justifySelf="flex-end" mb={3} mr={3}>
                    <Button mx={{ d: 'auto', md: 0 }} text="Buscar" themeSize="small" typeButton="submit" />
                </Cell>

                <Cell justifySelf="flex-start" mb={3}>
                    <Button mx={{ d: 'auto', md: 0 }} onClick={limparPesquisa()} text="Limpar Busca" themeSize="small" themeType="border" />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
