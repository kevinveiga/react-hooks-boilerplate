import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlCadastro, defaultErrorMsg } from '../../config';

import { Context } from '../../store/context';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label, Select } from './Form';
import { LinkTo } from '../Link/LinkTo';
import { OptionUF } from './OptionUF';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';
import { ConhecerMaisPartContentStyled, ConhecerMaisPartNumberStyled, ConhecerMaisPartTitleStyled, ConhecerMaisRadioStyled } from './ConhecerMaisFormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { P, Span, Title2, Title3, Title4 } from '../../style/text';

const CadastroForm = ({ ...props }) => {
    const { setStateAuthTokenGlobal } = useContext(Context);

    // ACTION
    const [stateConhecerMais, setStateConhecerMais] = useState(true);
    const [statePart, setStatePart] = useState(1);
    const [stateViewPassword, setStateViewPassword] = useState(false);

    useEffect(() => {
        register({ name: 'confirm_password' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'data_nascimento' }, { ...customValidate.date });
        register({ name: 'email' }, { ...customValidate.email });
        register({ name: 'endereco_cidade' });
        register({ name: 'endereco_estado' });
        register({ name: 'nome' }, { ...customValidate.name, ...customValidate.require });
        register({ name: 'password' }, { ...customValidate.password, ...customValidate.require });
        register({ name: 'telefone' }, { ...customValidate.cellphone });
    }, [register]);

    const handleClick = () => {
        setStatePart(statePart + 1);
    };

    // FORM
    const { errors, formState, handleSubmit, register, setError, setValue, triggerValidation } = useForm({
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    if (stateConhecerMais) {
                        console.log('submit');
                    } else {
                        setStateAuthTokenGlobal(result.data.token);
                        setStateConhecerMais(true);
                    }
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error(result);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('invalid', 'notMatch', responseError(error.response.data.errors));
                } else {
                    console.error(error);
                }
            }
        };

        fetchData();
    };

    return (
        <>
            {!stateConhecerMais ? (
                <>
                    <Title4 align="center" color="colorGray2" themeColor="dark">
                        Faça seu cadastro
                    </Title4>

                    <Title2 align="center" fontWeight="600" themeColor="dark">
                        e comece a aprender
                    </Title2>
                </>
            ) : (
                <Title3 align="center" fontWeight="600" mb={4} themeColor="dark">
                    Queremos conhecer um pouco
                    <br />
                    mais sobre você
                </Title3>
            )}

            <Flex display="flex" flexWrap="wrap">
                <Box overflow="hidden" width="100%">
                    <FormStyled onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={2} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }}>
                            <Cell>
                                <InvalidResponseMessageContainerStyled>{errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}</InvalidResponseMessageContainerStyled>
                            </Cell>

                            {!stateConhecerMais ? (
                                <>
                                    <Cell mb={3}>
                                        <div>
                                            <InputValidation
                                                error={errors.nome}
                                                label="Nome completo"
                                                maxLength="50"
                                                name="nome"
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                touched={formState.touched}
                                                {...props}
                                            />
                                        </div>

                                        {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                                    </Cell>

                                    <Cell mb={3}>
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

                                    <Cell mb={3}>
                                        <div>
                                            <InputMaskValidation
                                                error={errors.telefone}
                                                label="Celular"
                                                mask={customMaskRegex.phone}
                                                name="telefone"
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                touched={formState.touched}
                                                {...props}
                                            />
                                        </div>

                                        {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                                    </Cell>

                                    <Cell mb={4}>
                                        <div>
                                            <InputValidation
                                                error={errors.password}
                                                label="Senha"
                                                maxLength="11"
                                                name="password"
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                touched={formState.touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                {...props}
                                            />

                                            <Svg height="20px" name={stateViewPassword ? 'svg-no-view' : 'svg-view'} onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="25px" top="14px" zIndex={1} />
                                        </div>

                                        {errors.password && <InvalidInputMessageStyled>{errors.password.message}</InvalidInputMessageStyled>}
                                    </Cell>

                                    <Cell mb={4}>
                                        <div>
                                            <InputValidation
                                                error={errors.confirm_password}
                                                label="Confirmação de senha"
                                                maxLength="11"
                                                name="confirm_password"
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                touched={formState.touched}
                                                type={stateViewPassword ? 'text' : 'password'}
                                                {...props}
                                            />

                                            <Svg height="20px" name={stateViewPassword ? 'svg-no-view' : 'svg-view'} onClick={() => setStateViewPassword(!stateViewPassword)} position="absolute" right="25px" top="14px" zIndex={1} />
                                        </div>

                                        {errors.confirm_password && <InvalidInputMessageStyled>{errors.confirm_password.message}</InvalidInputMessageStyled>}
                                    </Cell>

                                    <Cell mb={3}>
                                        <Button fontSize={{ d: 16, sm: 18 }} height="70px" text="Cadastrar-se" typeButton="submit" width="100%" />
                                    </Cell>

                                    <Cell mb={3} textAlign="center">
                                        <span>Você já possui uma conta?</span>

                                        <LinkTo link="/login">
                                            <Button fontSize={{ d: 14, sm: 16 }} ml={{ d: 0, sm: 3 }} mt={{ d: 3, sm: 0 }} text="Fazer Login" themeSize="small" themeType="border" />
                                        </LinkTo>
                                    </Cell>

                                    <Cell mb={3} textAlign="center">
                                        <P color="colorGray2" fontSize={14} themeColor="dark">
                                            Clicando em &quot;Cadastrar-se&quot; você concordará com os <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Termos de serviço" /> e{' '}
                                            <LinkTo fontWeight="600" obj={{ hoverColor: 'colorPrimary', underline: true }} link="/falta-link" text="Política de privacidade" />.
                                        </P>
                                    </Cell>
                                </>
                            ) : (
                                <>
                                    <Cell mb={3}>
                                        <ConhecerMaisPartTitleStyled onClick={() => setStatePart(1)}>
                                            <ConhecerMaisPartNumberStyled active={statePart === 1}>1</ConhecerMaisPartNumberStyled>

                                            <Span color={statePart === 1 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                                Qual o seu sexo?
                                            </Span>
                                        </ConhecerMaisPartTitleStyled>

                                        <ConhecerMaisPartContentStyled active={statePart === 1} ml={4}>
                                            <ConhecerMaisRadioStyled id="sexo_masculino" name="sexo" type="radio" />

                                            <Label color="colorGrayDark" fontSize={14} forLabel="sexo_masculino" fontWeight="600" px={{ d: 3, md: 4 }} py={2}>
                                                Masculino
                                            </Label>

                                            <ConhecerMaisRadioStyled id="sexo_feminino" name="sexo" type="radio" />

                                            <Label color="colorGrayDark" fontSize={14} forLabel="sexo_feminino" fontWeight="600" ml={4} px={{ d: 3, md: 4 }} py={2}>
                                                Feminino
                                            </Label>
                                        </ConhecerMaisPartContentStyled>
                                    </Cell>

                                    <Cell mb={3}>
                                        <ConhecerMaisPartTitleStyled onClick={() => setStatePart(2)}>
                                            <ConhecerMaisPartNumberStyled active={statePart === 2}>2</ConhecerMaisPartNumberStyled>

                                            <Span color={statePart === 2 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                                Quando que você nasceu?
                                            </Span>
                                        </ConhecerMaisPartTitleStyled>

                                        <ConhecerMaisPartContentStyled active={statePart === 2} ml={4}>
                                            <Label text="Data de Nascimento" />

                                            <div>
                                                <InputMaskValidation
                                                    error={errors.data_nascimento}
                                                    mask={customMaskRegex.date}
                                                    name="data_nascimento"
                                                    onChange={async (e) => {
                                                        const input = e.target;
                                                        await triggerValidation({ name: input.name, value: input.value });
                                                    }}
                                                    placeholder="dd/mm/aaaa"
                                                    touched={formState.touched}
                                                    {...props}
                                                />
                                            </div>

                                            {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                                        </ConhecerMaisPartContentStyled>
                                    </Cell>

                                    <Cell mb={3}>
                                        <ConhecerMaisPartTitleStyled onClick={() => setStatePart(3)}>
                                            <ConhecerMaisPartNumberStyled active={statePart === 3}>3</ConhecerMaisPartNumberStyled>

                                            <Span color={statePart === 3 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                                Onde você mora?
                                            </Span>
                                        </ConhecerMaisPartTitleStyled>

                                        <ConhecerMaisPartContentStyled active={statePart === 3} ml={4}>
                                            <Box display="inline-block">
                                                <Label text="Cidade" />

                                                <div>
                                                    <InputValidation
                                                        error={errors.endereco_cidade}
                                                        maxLength="50"
                                                        name="endereco_cidade"
                                                        onChange={async (e) => {
                                                            const input = e.target;
                                                            await triggerValidation({ name: input.name, value: input.value });
                                                        }}
                                                        placeholder="Cidade"
                                                        touched={formState.touched}
                                                        {...props}
                                                    />
                                                </div>

                                                {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                                            </Box>

                                            <Box display="inline-block" ml={{ d: 0, md: 4 }} mt={{ d: 4, md: 0 }}>
                                                <Label text="Estado" />

                                                <div>
                                                    <Select
                                                        name="endereco_estado"
                                                        obj={{ color: formState.touched.indexOf('endereco_estado') > -1 ? 'colorGrayDark' : 'colorGray', colorLine: 'colorPrimary', fontWeight: formState.touched.indexOf('endereco_estado') > -1 ? '600' : '400' }}
                                                        onChange={async (e) => {
                                                            const input = e.target;
                                                            setValue(input.name, input.value);
                                                        }}
                                                    >
                                                        <OptionUF />
                                                    </Select>
                                                </div>
                                            </Box>
                                        </ConhecerMaisPartContentStyled>
                                    </Cell>

                                    <Cell mb={3}>
                                        {statePart < 3 && (
                                            <Button
                                                fontSize={{ d: 16, sm: 18 }}
                                                m="auto"
                                                onClick={() => {
                                                    handleClick();
                                                }}
                                                text="Pular Etapa"
                                                textTransform="none"
                                                themeSize="small"
                                                themeType="border"
                                                width="160px"
                                            />
                                        )}

                                        {statePart === 3 && <Button fontSize={{ d: 16, sm: 18 }} m="auto" text="Concluir" textTransform="none" themeSize="small" typeButton="submit" width="160px" />}
                                    </Cell>
                                </>
                            )}
                        </Grid>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};

export default CadastroForm;
