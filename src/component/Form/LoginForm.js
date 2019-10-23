import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato, defaultErrorMsg } from '../../config';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation, Label } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P } from '../../style/text';

const LoginForm = ({ ...props }) => {
    // ACTION
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'senha' }, { ...customValidate.password, ...customValidate.require });
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlContato, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    // TODO: fazer redirect para página inicial do usuário
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error(result);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box overflow="hidden" width="100%">
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                        {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}

                        <Cell mb={3} width="100%">
                            <div>
                                <InputValidation
                                    error={errors.email}
                                    label="E-mail"
                                    maxLength="50"
                                    name="email"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    touched={formState.touched}
                                    {...props}
                                />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={4} width="100%">
                            <div>
                                <InputValidation
                                    error={errors.senha}
                                    label="Senha"
                                    maxLength="11"
                                    name="senha"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    touched={formState.touched}
                                    type={stateViewPassword ? 'text' : 'password'}
                                    {...props}
                                />

                                <Svg height="20px" name="svg-view" onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="22px" top="14px" zIndex={1} />
                            </div>

                            {errors.senha && <InvalidInputMessageStyled>{errors.senha.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3} width="100%">
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" text="Acessar" typeButton="submit" width="100%" />
                        </Cell>

                        <Cell mb={3} textAlign="center" width="100%">
                            <P color="colorGray2" fontSize={14} themeColor="dark">
                                <LinkTo obj={{ hoverColor: 'colorGray2', underline: true }} link="" text="Esqueceu sua senha?" />
                            </P>
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};

export default LoginForm;
