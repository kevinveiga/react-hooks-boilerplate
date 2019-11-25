import React from 'react';

import { P } from '../../style/text';

export const LoaderComponent = () => {
    return <P themeColor="light">Carregando...</P>;
};

export const LoaderComponentError = () => {
    return <P themeColor="light">Erro no carregamento...</P>;
};
