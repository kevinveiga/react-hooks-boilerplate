import React, { memo, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlCep, apiUrlPerfil, errorMsgDefault } from '../../config';

import { useApp } from '../../store/app/app';
import { useAuth, getLocalStorageUser } from '../../store/auth/auth';
import { useModalMessage } from '../../store/modalMessage/modalMessage';

import { customValidate } from '../../util/customValidate';
import { formatCepSet } from '../../util/formatData';
import { formatFormDataGet, formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';
import { setFormValue } from '../../util/setFormValue';
import { scrollTo } from '../../util/scrollTo';
import { onFormError } from './util';

import { Button } from '../Button/Button';
import { Input, InputCheckboxRadio, InputMaskValidation, InputValidation, Label, Select, SelectValidation } from './Form';
import { Loader } from '../Loader/Loader';
import { ModalMessage } from '../Modal/ModalMessage';
import { OptionUF } from './OptionUF';
import { Svg } from '../Svg/Svg';

import { FormStyled, InvalidInputMessageStyled, ResponseMessageContainerStyled, ResponseMessageStyled } from './FormStyled';

import { Cell, Grid } from '../../style/grid';
import { P, Span } from '../../style/text';

export const MinhaContaForm = memo(({ data, formId, setStatePerfilData, ...props }) => {
    // CONTEXT
    const { setStateModalContext } = useApp();
    const { setStateAuthContext } = useAuth();

    // VARIABLE
    const axiosInstance = axios.create();

    // ACTION
    const [stateCep, setStateCep] = useState(data.endereco_cep);
    const [stateError, setStateError] = useState(false);
    const [stateLoader, setStateLoader] = useState(false);
    const [stateModalMessage, setStateModalMessage] = useModalMessage();

    // FUNCTION
    const handleFindAddress = () => {
        const element = document.querySelector('input[name="endereco_cep"]');
        const formatedCep = formatCepSet(element.value);

        if (formatedCep && formatedCep !== stateCep) {
            setStateCep(formatedCep);

            const fetchData = async () => {
                setStateLoader(true);

                try {
                    const result = await axiosInstance.get(`${apiUrlCep}/${formatedCep}`);

                    if (result.data && result.status === 200) {
                        setFormValue(
                            formatFormDataGet({
                                endereco_cidade: result.data.address.city.name,
                                endereco_logradouro: `${result.data.address.streetSuffix} ${result.data.address.street}`,
                                endereco_uf: result.data.address.state.toLowerCase()
                            }),
                            formId,
                            setValue
                        );
                    } else {
                        setStateModalMessage({ backgroundColor: 'colorRed', text: 'Erro ao buscar pelo CEP!' });

                        console.error('result error: ', result);
                    }
                } catch (error) {
                    setStateModalMessage({ backgroundColor: 'colorRed', text: 'CEP inválido!' });

                    console.error('result: ', error);
                }

                setStateLoader(false);
            };

            fetchData();
        }
    };

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: formatFormDataGet(data),
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlPerfil, formatFormDataSet(formData), {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (result.data && result.data.success == true) {
                    setStateError(false);

                    const userObj = getLocalStorageUser();

                    // Salva dados do usuário no localStorage
                    setStateAuthContext({ ...userObj, ...result.data.data });

                    // Verifica que teve uma diferença no estado do perfil (update: true) e atualiza os dados do perfil
                    setStatePerfilData({ update: true, url: apiUrlPerfil });

                    // Exibe mensagem
                    setStateModalMessage({ text: 'Dados salvos com sucesso.' });
                } else {
                    setStateError(errorMsgDefault);

                    console.error('result error: ', result);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message) {
                        setStateError(error.response.data.message);
                    } else {
                        setStateError(responseError(error.response.data.errors));
                    }

                    scrollTo(null, true);
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <>
            <FormStyled id={formId} onSubmit={handleSubmit(onSubmit, (formError) => onFormError(formError, formId))}>
                <Grid
                    display="grid"
                    gridColumnGap={5}
                    gridRowGap={4}
                    gridTemplateColumns={{ d: '1fr', md: '1fr 1fr 1fr 1fr' }}
                    px={{ d: 1, md: 4 }}
                    py={{ d: 2, md: 4 }}
                >
                    <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <ResponseMessageContainerStyled>
                            {stateError && <ResponseMessageStyled>{stateError}</ResponseMessageStyled>}
                        </ResponseMessageContainerStyled>
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <Label color="colorGray2" mb="-15px" text="Nome completo" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputValidation
                                            error={errors.nome}
                                            maxLength="50"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            placeholder="Nome"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="nome"
                                rules={{ ...customValidate.name, ...customValidate.require }}
                            />
                        </div>

                        {errors.nome && <InvalidInputMessageStyled>{errors.nome.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="E-mail" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputValidation
                                            error={errors.email}
                                            maxLength="50"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            placeholder="E-mail"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="email"
                                rules={{ ...customValidate.email, ...customValidate.require }}
                            />
                        </div>

                        {errors.email && <InvalidInputMessageStyled>{errors.email.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="Celular" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputMaskValidation
                                            error={errors.telefone}
                                            format="(##) #####-####"
                                            name={name}
                                            onBlur={onBlur}
                                            onValueChange={(values) => {
                                                onChange(values.value);
                                            }}
                                            placeholder="Celular"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="telefone"
                                rules={{ ...customValidate.cellphone, ...customValidate.require }}
                            />
                        </div>

                        {errors.telefone && <InvalidInputMessageStyled>{errors.telefone.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell>
                        <Label color="colorGray2" mb="-15px" text="CEP" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputMaskValidation
                                            error={errors.endereco_cep}
                                            format="#####-###"
                                            name={name}
                                            onBlur={() => {
                                                handleFindAddress();
                                                onBlur();
                                            }}
                                            onValueChange={(values) => {
                                                onChange(values.value);
                                            }}
                                            placeholder="00000-000"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="endereco_cep"
                                rules={{ ...customValidate.cep, ...customValidate.require }}
                            />

                            <Button
                                bottom="10px"
                                onClick={() => {
                                    handleFindAddress();
                                }}
                                position="absolute"
                                right="15px"
                                themeSize="none"
                                themeType="none"
                                title="Preencher endereço pelo cep"
                                zIndex={1}
                            >
                                <Svg height="14px" name="svg-search" />
                            </Button>
                        </div>

                        {errors.endereco_cep && <InvalidInputMessageStyled>{errors.endereco_cep.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '2 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="Endereço" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputValidation
                                            error={errors.endereco_logradouro}
                                            maxLength="100"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            placeholder="Rua do endereço"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="endereco_logradouro"
                                rules={{ ...customValidate.require }}
                            />
                        </div>

                        {errors.endereco_logradouro && <InvalidInputMessageStyled>{errors.endereco_logradouro.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell>
                        <Label color="colorGray2" mb="-15px" text="Nº" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputMaskValidation
                                            decimalSeparator={false}
                                            error={errors.endereco_numero}
                                            maxLength="5"
                                            name={name}
                                            onBlur={onBlur}
                                            onValueChange={(values) => {
                                                onChange(values.formattedValue);
                                            }}
                                            placeholder="Número do endereço"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="endereco_numero"
                                rules={{ ...customValidate.number, ...customValidate.require }}
                            />
                        </div>

                        {errors.endereco_numero && <InvalidInputMessageStyled>{errors.endereco_numero.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <Label color="colorGray2" mb="-15px" text="Complemento" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <Input
                                            maxLength="100"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            placeholder="Complemento do endereço"
                                            pr={4}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="endereco_complemento"
                            />
                        </div>
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="Cidade" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputValidation
                                            error={errors.endereco_cidade}
                                            maxLength="50"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            placeholder="Cidade"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="endereco_cidade"
                                rules={{ ...customValidate.require }}
                            />
                        </div>

                        {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell>
                        <Label color="colorGray2" mb="-15px" text="Estado" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <SelectValidation
                                            error={errors.endereco_uf}
                                            name={name}
                                            obj={{
                                                color: touched['endereco_uf'] && value ? 'colorGrayDark' : 'colorGray',
                                                colorLine: 'colorPrimary',
                                                fontWeight: touched['endereco_uf'] ? '700' : '400'
                                            }}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        >
                                            <OptionUF />
                                        </SelectValidation>
                                    );
                                }}
                                control={control}
                                name="endereco_uf"
                                rules={{ ...customValidate.require }}
                            />
                        </div>

                        {errors.endereco_uf && <InvalidInputMessageStyled>{errors.endereco_uf.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="Data de Nascimento" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputMaskValidation
                                            error={errors.data_nascimento}
                                            format="##/##/####"
                                            mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
                                            name={name}
                                            onBlur={onBlur}
                                            onValueChange={(values) => {
                                                onChange(values.formattedValue);
                                            }}
                                            placeholder="dd/mm/aaaa"
                                            pr={4}
                                            touched={touched}
                                            value={value}
                                            {...props}
                                        />
                                    );
                                }}
                                control={control}
                                name="data_nascimento"
                                rules={{ ...customValidate.date }}
                            />
                        </div>

                        {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '3 / span 2' }}>
                        <Label color="colorGray2" mb="-15px" text="Sexo" />

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <Select
                                            name={name}
                                            obj={{
                                                color: touched['sexo'] && value ? 'colorGrayDark' : 'colorGray',
                                                colorLine: 'colorPrimary',
                                                fontWeight: touched['sexo'] ? '700' : '400'
                                            }}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                            }}
                                            value={value}
                                            {...props}
                                        >
                                            <option value="masculino">Masculino</option>
                                            <option value="feminino">Feminino</option>
                                        </Select>
                                    );
                                }}
                                control={control}
                                name="sexo"
                            />
                        </div>
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <P color="colorGray2" fontSize="14px" mb={2}>
                            Senha
                        </P>

                        <button onClick={() => setStateModalContext({ component: 'trocarSenha', visible: true })} type="button">
                            <Span textDecoration="underline">Trocar senha de acesso</Span>
                        </button>
                    </Cell>

                    <Cell mt={3} gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <P color="colorBlack3" fontWeight="700" mb={2}>
                            Notificação de e-mail
                        </P>

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputCheckboxRadio
                                            checked={data.receber_avisos_descontos_de_cursos}
                                            color="colorGray2"
                                            id="receber_avisos_descontos_de_cursos"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => onChange(e.target.checked)}
                                            value={value}
                                        >
                                            <Span fontSize={{ d: '14px', sm: '16px' }} verticalAlign="middle">
                                                Desejo receber avisos e descontos de cursos
                                            </Span>
                                        </InputCheckboxRadio>
                                    );
                                }}
                                control={control}
                                name="receber_avisos_descontos_de_cursos"
                            />
                        </div>

                        <div>
                            <Controller
                                render={({ name, onBlur, onChange, value }) => {
                                    return (
                                        <InputCheckboxRadio
                                            checked={data.receber_curadoria_conteudos_noticias}
                                            color="colorGray2"
                                            id="receber_curadoria_conteudos_noticias"
                                            name={name}
                                            onBlur={onBlur}
                                            onChange={(e) => onChange(e.target.checked)}
                                            value={value}
                                        >
                                            <Span fontSize={{ d: '14px', sm: '16px' }} verticalAlign="middle">
                                                Desejo receber a curadoria de conteúdos e notícias
                                            </Span>
                                        </InputCheckboxRadio>
                                    );
                                }}
                                control={control}
                                name="receber_curadoria_conteudos_noticias"
                            />
                        </div>
                    </Cell>

                    <Cell gridColumn={{ d: '1', md: '1 / span 4' }}>
                        <Button fontSize={{ d: '16px', sm: '18px' }} height="60px" mx="auto" text="Salvar" typeButton="submit" />
                    </Cell>
                </Grid>
            </FormStyled>

            <Loader active={stateLoader} />

            <ModalMessage {...stateModalMessage} />
        </>
    );
});
