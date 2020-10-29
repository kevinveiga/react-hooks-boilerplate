import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPerfilAtualizarSenha, errorMsgDefault } from '../../config';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';

export const MinhaContaTrocarSenhaForm = memo(({ ...props }) => {
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
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfilAtualizarSenha, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    setStateError(false);
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

    return (
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, md: 4 }}>
                <Cell>
                    <InvalidResponseMessageContainerStyled>
                        {stateError && <InvalidResponseMessageStyled>{stateError}</InvalidResponseMessageStyled>}
                    </InvalidResponseMessageContainerStyled>
                </Cell>

                <Cell mb={3}>
                    <div>
                        <Controller
                            as={
                                <InputValidation
                                    error={errors.password}
                                    label="Senha"
                                    maxLength="20"
                                    pr={4}
                                    touched={touched}
                                    type={stateViewPassword ? 'text' : 'password'}
                                    {...props}
                                />
                            }
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
                            right="16px"
                            zIndex={1}
                        />
                    </div>

                    {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell mb={3}>
                    <div>
                        <Controller
                            as={
                                <InputValidation
                                    error={errors.confirm_password}
                                    label="Confirmação de senha"
                                    maxLength="20"
                                    pr={4}
                                    touched={touched}
                                    type={stateViewPassword ? 'text' : 'password'}
                                    {...props}
                                />
                            }
                            control={control}
                            name="confirm_password"
                            rules={{ ...customValidate.password, ...customValidate.require }}
                        />

                        <Svg
                            bottom="12px"
                            height="16px"
                            name={stateViewPassword ? 'svg-no-view' : 'svg-view'}
                            onClick={() => setStateViewPassword(!stateViewPassword)}
                            position="absolute"
                            right="16px"
                            zIndex={1}
                        />
                    </div>

                    {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                </Cell>

                <Cell mb={3}>
                    <Button ml="auto" text="Salvar" themeSize="small" typeButton="submit" />
                </Cell>
            </Grid>
        </FormStyled>
    );
});
