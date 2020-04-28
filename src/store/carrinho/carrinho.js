import React, { createContext, useContext, useMemo } from 'react';

import { useCarrinhoApi } from '../../service/carrinho';

const CarrinhoContext = createContext(undefined);

export const CarrinhoProvider = ({ children }) => {
    // API
    const { handleRemoveCarrinhoItem, stateCarrinho, setStateCarrinhoData } = useCarrinhoApi();

    const carrinho = useMemo(() => [handleRemoveCarrinhoItem, stateCarrinho, setStateCarrinhoData], [
        handleRemoveCarrinhoItem,
        stateCarrinho,
        setStateCarrinhoData
    ]);

    return (
        <CarrinhoContext.Provider
            value={{ handleRemoveCarrinhoItemContext: carrinho[0], stateCarrinhoContext: carrinho[1], setStateCarrinhoDataContext: carrinho[2] }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);

    if (context === undefined) {
        throw new Error('useCarrinho can only be used inside CarrinhoProvider');
    }

    return context;
};
