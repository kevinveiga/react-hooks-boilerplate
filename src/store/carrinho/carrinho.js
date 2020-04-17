import React, { createContext, useContext, useMemo, useState } from 'react';

const CarrinhoContext = createContext(undefined);

export const getSessionStorageCarrinho = () => {
    return JSON.parse(window.sessionStorage.getItem('carrinho')) || [];
};

export const CarrinhoProvider = ({ children }) => {
    const [stateCarrinho, setStateCarrinho] = useState(getSessionStorageCarrinho());

    const carrinho = useMemo(() => [stateCarrinho, setStateCarrinho], [stateCarrinho, setStateCarrinho]);

    return <CarrinhoContext.Provider value={carrinho}>{children}</CarrinhoContext.Provider>;
};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);

    if (context === undefined) {
        throw new Error('useCarrinho can only be used inside CarrinhoProvider');
    }

    return context;
};
