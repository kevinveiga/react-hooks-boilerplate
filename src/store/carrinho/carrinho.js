import React, { createContext, useContext, useMemo } from 'react';

import { useCarrinhoApi } from '../../service/carrinho';

const CarrinhoContext = createContext(undefined);

export const CarrinhoProvider = ({ children }) => {
    // API
    const {
        handleAddCarrinhoCupom,
        handleAddCarrinhoItem,
        handleRemoveCarrinhoCupom,
        handleRemoveCarrinhoItem,
        stateCarrinho,
        setStateCarrinhoData
    } = useCarrinhoApi();

    const carrinho = useMemo(
        () => [
            handleAddCarrinhoCupom,
            handleAddCarrinhoItem,
            handleRemoveCarrinhoCupom,
            handleRemoveCarrinhoItem,
            stateCarrinho,
            setStateCarrinhoData
        ],
        [handleAddCarrinhoCupom, handleAddCarrinhoItem, handleRemoveCarrinhoCupom, handleRemoveCarrinhoItem, stateCarrinho, setStateCarrinhoData]
    );

    return (
        <CarrinhoContext.Provider
            value={{
                handleAddCarrinhoCupomContext: carrinho[0],
                handleAddCarrinhoItemContext: carrinho[1],
                handleRemoveCarrinhoCupomContext: carrinho[2],
                handleRemoveCarrinhoItemContext: carrinho[3],
                stateCarrinhoContext: carrinho[4],
                setStateCarrinhoDataContext: carrinho[5]
            }}
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
