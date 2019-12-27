import React, { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { apiUrlCursos, apiUrlLogin, defaultErrorMsg } from '../../config';

import { cursoMatricula } from '../../service/curso';

import { useUser } from '../../store/auth/auth';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputValidation } from './Form';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';

export const EsqueceuSenhaForm = ({ location, ...otherProps }) => {
    // ACTION
    const [stateUser, setStateUser] = useUser();

    useEffect(() => {
        register('email', { ...customValidate.email });

        return undefined;
    }, [register]);

    // Function
    const handleValidation = useCallback(
        () => (element) => {
            setValue(element.target.name, element.target.value);
            triggerValidation([element.target.name]);
        },
        [setValue, triggerValidation]
    );

    // FORM
    const {
        errors,
        formState: { touched },
        handleSubmit,
        register,
        setError,
        setValue,
        triggerValidation
    } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlLogin, formData, { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    const cursoId = JSON.parse(window.sessionStorage.getItem('cursoId'));

                    setStateUser(result.data);

                    // Matricular curso ou redirecionar para Minha Conta Início
                    if (JSON.parse(cursoId)) {
                        cursoMatricula(cursoId, `${apiUrlCursos}/matricular`);
                    } else {
                        window.location.pathname = '/minha-conta/cursos';
                    }
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);

                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response) {
                    setError('invalid', 'notMatch', responseError(error.response.data.errors));
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <Flex display="flex" flexWrap="wrap">
            <Box overflow="hidden" width="100%">
                <FormStyled onSubmit={handleSubmit(submitForm)}>
                    <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                        <Cell>
                            <InvalidResponseMessageContainerStyled>
                                {errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}
                            </InvalidResponseMessageContainerStyled>
                        </Cell>

                        <Cell mb={3}>
                            <div>
                                <InputValidation error={errors.email} label="E-mail" maxLength="50" name="email" onChange={handleValidation()} touched={touched} {...otherProps} />
                            </div>

                            {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                        </Cell>

                        <Cell mb={3}>
                            <Button fontSize={{ d: 16, sm: 18 }} height="70px" mx="auto" text="Enviar" typeButton="submit" width="50%" />
                        </Cell>
                    </Grid>
                </FormStyled>
            </Box>
        </Flex>
    );
};
