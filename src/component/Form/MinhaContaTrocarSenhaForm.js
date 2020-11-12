import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPerfilAtualizarSenha, errorMsgDefault } from '../../config';

import { useApp } from '../../store/app/app';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const MinhaContaTrocarSenhaForm = memo(({ ...props }) => {
    // CONTEXT
    const { setStateModalContext } = useApp();

    // ACTION
    const [stateError, setStateError] = useState(false);
    const [stateViewPassword, setStateViewPassword] = useState(false);

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit
    } = useForm({
        defaultValues: { current_password: '', password: '', password_confirmation: '' },
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfilAtualizarSenha, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    setStateModalContext({ visible: false });
                } else if (result.data && result.data.message) {
                    setStateError(result.data.message);
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

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid display="grid" gridRowGap={2} p={{ d: 1, sm: 2 }}>
                <Cell>
                    <ResponseMessageContainerStyled>
                        {stateError && <ResponseMessageStyled>{stateError}</ResponseMessageStyled>}
                    </ResponseMessageContainerStyled>
                </Cell>

                <Cell mb={3}>
                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputValidation
                                        error={errors.current_password}
                                        label="Senha atual"
                                        maxLength="20"
                                        name={name}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        pr={4}
                                        touched={touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name="current_password"
                            rules={{ ...customValidate.password, ...customValidate.require }}
                        />

                        <Svg
                            bottom="12px"
                            height="16px"
                            name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                            onClick={() => setStateViewPassword(!stateViewPassword)}
                            position="absolute"
                            right="20px"
                            zIndex={1}
                        />
                    </div>

                    {errors.current_password && <InvalidInputMessageStyled>{errors.current_password.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell mb={3}>
                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputValidation
                                        error={errors.password}
                                        label="Nova senha"
                                        maxLength="20"
                                        name={name}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        pr={4}
                                        touched={touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name="password"
                            rules={{ ...customValidate.password, ...customValidate.require }}
                        />

                        <Svg
                            bottom="12px"
                            height="16px"
                            name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                            onClick={() => setStateViewPassword(!stateViewPassword)}
                            position="absolute"
                            right="20px"
                            zIndex={1}
                        />
                    </div>

                    {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell mb={4}>
                    <div>
                        <Controller
                            render={({ name, onBlur, onChange, value }) => {
                                return (
                                    <InputValidation
                                        error={errors.password_confirmation}
                                        label="Confirmação de senha"
                                        maxLength="20"
                                        name={name}
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        pr={4}
                                        touched={touched}
                                        type={stateViewPassword ? 'text' : 'password'}
                                        value={value}
                                        {...props}
                                    />
                                );
                            }}
                            control={control}
                            name="password_confirmation"
                            rules={{ ...customValidate.password, ...customValidate.require }}
                        />

                        <Svg
                            bottom="12px"
                            height="16px"
                            name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                            onClick={() => setStateViewPassword(!stateViewPassword)}
                            position="absolute"
                            right="20px"
                            zIndex={1}
                        />
                    </div>

                    {errors.password_confirmation && <InvalidInputMessageStyled>{errors.password_confirmation.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell>
                    <Button m="auto" text="Salvar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
