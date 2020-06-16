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

    const memoCarrinho = useMemo(
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
                handleAddCarrinhoCupomContext: memoCarrinho[0],
                handleAddCarrinhoItemContext: memoCarrinho[1],
                handleRemoveCarrinhoCupomContext: memoCarrinho[2],
                handleRemoveCarrinhoItemContext: memoCarrinho[3],
                stateCarrinhoContext: memoCarrinho[4],
                setStateCarrinhoDataContext: memoCarrinho[5]
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
