import React, { useState } from 'react';

import { useInterceptor } from '../../service/interceptor';

import { useModalMessage } from '../../store/modalMessage/modalMessage';

import { Loader } from '../Loader/Loader';
import { ModalMessage } from '../Modal/ModalMessage';

export const Interceptor = () => {
    // ACTION
    const [stateLoader, setStateLoader] = useState(false);
    const [stateModalMessage, setStateModalMessage] = useModalMessage(false);

    useInterceptor(setStateLoader, setStateModalMessage);

    return (
        <>
            <Loader active={stateLoader} />

            <ModalMessage {...stateModalMessage} />
        </>
    );
};
