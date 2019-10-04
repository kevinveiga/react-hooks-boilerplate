import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlContato } from '../../config';

import { customValidate } from '../../util/customValidate';

import { Button } from '../Button/Button';
import { InputValidation, Label } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessage, InvalidResponseMessage } from './FormStyled';

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

                if (result && result.success == false) {
                    setError('invalid', 'notMatch', result.reason[0]);
                } else {
                    // TODO: fazer redirect para página inicial do usuário
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
                    <Grid display="grid" gridAutoColumns="auto" gridAutoRows="auto" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                        {errors.invalid && <InvalidResponseMessage>{errors.invalid.message}</InvalidResponseMessage>}

                        <Cell mb={3} width="100%">
                            <Label text="E-mail" />

                            <div>
                                <InputValidation
                                    error={errors.email}
                                    maxLength="50"
                                    name="email"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="E-mail"
                                    touched={formState.touched}
                                    {...props}
                                />
                            </div>

                            {errors.email && <InvalidInputMessage>{errors.email.message}</InvalidInputMessage>}
                        </Cell>

                        <Cell mb={4} width="100%">
                            <Label text="Senha" />

                            <div>
                                <InputValidation
                                    error={errors.senha}
                                    maxLength="11"
                                    name="senha"
                                    onChange={async (e) => {
                                        const input = e.target;
                                        await triggerValidation({ name: input.name, value: input.value });
                                    }}
                                    placeholder="Senha"
                                    touched={formState.touched}
                                    type={stateViewPassword ? 'text' : 'password'}
                                    {...props}
                                />

                                <Svg height="20px" name="svg-view" onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="22px" top="14px" zIndex={1} />
                            </div>

                            {errors.senha && <InvalidInputMessage>{errors.senha.message}</InvalidInputMessage>}
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
