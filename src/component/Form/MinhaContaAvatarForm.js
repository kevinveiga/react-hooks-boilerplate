import React, { memo, useCallback, useEffect } from 'react';

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

import logoBg from '../../asset/image/image-placeholder.svg';

export const MinhaContaAvatarForm = memo(() => {
    // API
    const [statePerfilAvatar, setStatePerfilAvatarData] = usePerfilAvatarApi({ url: apiUrlPerfilAvatar });

    // ACTION
    const [stateModalMessage, setStateModalMessage] = useModalMessage();

    useEffect(() => {
        register('avatar', { ...customValidate.photo });

        return () => {
            unregister('avatar');
        };
    }, [register, unregister]);

    // FUNCTION
    const handleFileChange = useCallback(
        () => (element) => {
            element.persist();

            setValue(element.target.name, element.target.files[0].name);

            const fetchData = async () => {
                const validate = await triggerValidation([element.target.name]);

                if (validate) {
                    try {
                        const form = new FormData();

                        form.append('avatar', element.target.files[0]);

                        const result = await axios.post(apiUrlPerfilAvatar, form, { headers: { 'Content-Type': 'multipart/form-data; boundary=' } });

                        if (result.data && result.data.success == true) {
                            setStatePerfilAvatarData({ update: true, url: apiUrlPerfilAvatar });
                            setStateModalMessage({ text: 'Dados salvos com sucesso.' });
                        } else {
                            setError('invalid', 'notMatch', errorMsgDefault);

                            console.error('result error: ', result);
                        }
                    } catch (error) {
                        if (error.response) {
                            if (error.response.data.message) {
                                setError('invalid', 'notMatch', error.response.data.message);
                            } else {
                                setError('invalid', 'notMatch', responseError(error.response.data.errors));
                            }
                        } else {
                            console.error('error: ', error);
                        }
                    }
                }
            };

            fetchData();
        },
        [setError, setStateModalMessage, setStatePerfilAvatarData, setValue, triggerValidation]
    );

    // FORM
    const {
        errors,
        formState: { touched },
        register,
        setError,
        setValue,
        triggerValidation,
        unregister
    } = useForm({
        mode: 'onChange'
    });

    return (
        <>
            <FormStyled>
                <ImageCircleContainer>
                    <Image text="avatar" url={(statePerfilAvatar.data && statePerfilAvatar.data.data) || logoBg} width="100%" />
                </ImageCircleContainer>

                <div>
                    <InputFileValidation error={errors.avatar} id="avatar" name="avatar" onChange={handleFileChange()} touched={touched}>
                        <Svg fill="colorWhite" height="20px" name="svg-camera" />
                    </InputFileValidation>
                </div>

                {errors.avatar && (
                    <P color="colorAlert" fontSize="14px" mt={3} textAlign="center">
                        {errors.avatar.message}
                    </P>
                )}
            </FormStyled>

            <ModalMessage {...stateModalMessage} />
        </>
    );
});
