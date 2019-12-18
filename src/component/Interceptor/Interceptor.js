import React, { useState } from 'react';

import { useInterceptor } from '../../service/interceptor';

import { useApp } from '../../store/app/app';

import { Loader } from '../Loader/Loader';
import { ModalMessage } from '../Modal/ModalMessage';

export const Interceptor = () => {
    // ACTION
    const { stateModalMessageContext, setStateModalMessageContext } = useApp();
    const [stateLoader, setStateLoader] = useState(false);

    useInterceptor(setStateLoader, setStateModalMessageContext);

    return (
        <>
            <Loader active={stateLoader} />

            <ModalMessage {...stateModalMessageContext} />
        </>
    );
};
