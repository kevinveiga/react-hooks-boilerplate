import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';
import { ecommerceReducer } from '../store/reducer/ecommerceReducer';

export const useCarrinhoApi = (obj, initialData = {}) => {
    const [stateCarrinhoData, setStateCarrinhoData] = useState(obj);

    const [stateCarrinho, dispatch] = useReducer(ecommerceReducer, {
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateCarrinhoData.url);

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

    return [stateCarrinho, setStateCarrinhoData];
};

export const useCarrinhoAdicionar = (obj, initialData = {}) => {
    // TODO:
    const [stateCarrinhoData, setStateCarrinhoData] = useState(obj);

    const [stateCarrinho, dispatch] = useReducer(ecommerceReducer, {
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.post(stateCarrinhoData.url, stateCarrinhoData.params, { headers: { 'Content-Type': 'application/json' } });

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

    return [stateCarrinho, setStateCarrinhoData];
};
