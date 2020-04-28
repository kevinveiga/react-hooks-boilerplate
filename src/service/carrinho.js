import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import { apiUrlCarrinho } from '../config';

import * as ACTION from '../store/action/action';
import { ecommerceReducer } from '../store/reducer/ecommerceReducer';

import { getStorage, setStorage } from '../util/storage';

export const useCarrinhoApi = () => {
    // TODO:
    const [stateCarrinhoData, setStateCarrinhoData] = useState({ url: apiUrlCarrinho, params: {} });

    const [stateCarrinho, dispatch] = useReducer(ecommerceReducer, {
        data: getStorage('carrinho', 'sessionStorage') || {}
    });

    // FUNCTION
    const handleAddCarrinhoItem = useCallback(
        (id) => () => {
            // TODO:
            console.log('handleAddCarrinhoItemId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/add`, params: id });
            */
        },
        [setStateCarrinhoData]
    );

    const handleAddCarrinhoCupom = useCallback(
        (cupom) => () => {
            // TODO:
            console.log('handleAddCarrinhoCupom: ', cupom);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/addCupom`, params: cupom });
            */
        },
        [setStateCarrinhoData]
    );

    const handleRemoveCarrinhoItem = useCallback(
        (id) => () => {
            // TODO:
            console.log('handleRemoveCarrinhoItemId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/remove`, params: id });
            */
        },
        [setStateCarrinhoData]
    );

    const handleRemoveCarrinhoCupom = useCallback(
        (cupom) => () => {
            // TODO:
            console.log('handleRemoveCarrinhoCupom: ', cupom);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/removeCupom`, params: cupom });
            */
        },
        [setStateCarrinhoData]
    );

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                // const result = await axios.post(stateCarrinhoData.url, stateCarrinhoData.params, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                setStorage('carrinho', result.data, 'sessionStorage');

                if (!didCancel) {
                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch(ACTION.failure());
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateCarrinhoData]);

    return { handleRemoveCarrinhoItem, stateCarrinho, setStateCarrinhoData };
};
