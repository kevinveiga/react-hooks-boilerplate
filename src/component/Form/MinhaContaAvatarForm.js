import React, { memo, useCallback, useState } from 'react';

import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

import { apiUrlPerfilAvatar, errorMsgDefault } from '../../config';

import { usePerfilAvatarApi } from '../../service/perfil';

import { useModalMessage } from '../../store/modalMessage/modalMessage';

import { customValidate } from '../../util/customValidate';
import { responseError } from '../../util/responseError';

import { InputFileValidation } from './Form';
import { ModalMessage } from '../Modal/ModalMessage';
import { Svg } from '../Svg/Svg';

import { FormStyled } from './FormStyled';

import { Image, ImageCircleContainer } from '../../style/image';
import { P } from '../../style/text';

import logoBg from '../../asset/image/logo-bg.png';

export const MinhaContaAvatarForm = memo(() => {
    // API
    const [statePerfilAvatar, setStatePerfilAvatarData] = usePerfilAvatarApi({ url: apiUrlPerfilAvatar });

    // ACTION
    const [stateError, setStateError] = useState(false);
    const [stateModalMessage, setStateModalMessage] = useModalMessage();

    // FUNCTION
    const handleFileChange = useCallback(
        (event) => {
            event.persist();

            const fetchData = async () => {
                const validate = await trigger([event.target.name]);

                if (validate) {
                    try {
                        const form = new FormData();

                        form.append('avatar', event.target.files[0]);

                        const result = await axios.post(apiUrlPerfilAvatar, form, { headers: { 'Content-Type': 'multipart/form-data; boundary=' } });

                        if (result.data && result.data.success == true) {
                            setStateError(false);

                            setStatePerfilAvatarData({ update: true, url: apiUrlPerfilAvatar });

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
                        } else {
                            console.error('error: ', error);
                        }
                    }
                }
            };

            fetchData();
        },
        [setStateError, setStateModalMessage, setStatePerfilAvatarData, trigger]
    );

    // FORM
    const {
        control,
        errors,
        formState: { touched },
        trigger
    } = useForm({
        defaultValues: { avatar: '' },
        mode: 'onChange'
    });

    return (
        <>
            <FormStyled>
                <ImageCircleContainer>
                    <Image text="avatar" url={(statePerfilAvatar.data && statePerfilAvatar.data.data) || logoBg} width="100%" />
                </ImageCircleContainer>

                <div>
                    <Controller
                        render={({ name, onBlur, onChange, value }) => {
                            return (
                                <InputFileValidation
                                    error={errors.avatar}
                                    id="avatar"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                        handleFileChange(e);
                                    }}
                                    touched={touched}
                                    value={value}
                                >
                                    <Svg fill="colorWhite" height="20px" name="svg-camera" />
                                </InputFileValidation>
                            );
                        }}
                        control={control}
                        name="avatar"
                        rules={{ ...customValidate.photo }}
                    />
                </div>

                {errors.avatar && (
                    <P color="colorAlert" fontSize="14px" mt={3} textAlign="center">
                        {errors.avatar.message}
                    </P>
                )}

                {stateError && (
                    <P color="colorAlert" fontSize="14px" mt={3} textAlign="center">
                        {stateError}
                    </P>
                )}
            </FormStyled>

            <ModalMessage {...stateModalMessage} />
        </>
    );
});
