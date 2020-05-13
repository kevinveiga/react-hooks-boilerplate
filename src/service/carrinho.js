import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import { apiUrlCarrinho, defaultErrorMsg } from '../config';

import * as ACTION from '../store/action/action';
import { ecommerceReducer } from '../store/reducer/ecommerceReducer';

import { getDateTime } from '../util/getDateTime';
import { getStorage, setStorage } from '../util/storage';

export const useCarrinhoApi = () => {
    // VARIABLE
    const initialData = { cupom: '', data_inicio: getDateTime(), items: [], total: 0, total_desconto: 0 };

    // ACTION
    const [stateCarrinhoData, setStateCarrinhoData] = useState({ url: apiUrlCarrinho, params: {} });

    const [stateCarrinho, dispatch] = useReducer(ecommerceReducer, {
        data: getStorage('carrinho', 'sessionStorage') || { data: initialData },
        isError: false,
        isLoading: false
    });

    // FUNCTION
    const handleAddCarrinhoCupom = (codigo, setError) => {
        // TODO:
        const fetchData = async () => {
            try {
                // const result = await axios.post(`${apiUrlCarrinho}/addCupom`, { cupomCodigo: codigo }, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                if (result.data && result.data.success == true) {
                    setStorage('carrinho', result.data, 'sessionStorage');

                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);

                    console.error('result error: ', result);
                }
            } catch (error) {
                dispatch(ACTION.failure());

                console.error('error: ', error);
            }
        };

        fetchData();
    };

    const handleAddCarrinhoItem = useCallback(
        (id) => () => {
            // TODO:
            console.log('handleAddCarrinhoItemId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/add`, params: { itemId: id } });
            */
        },
        [setStateCarrinhoData]
    );

    const handleRemoveCarrinhoCupom = (cupomId, setError) => () => {
        // TODO:
        const fetchData = async () => {
            try {
                // const result = await axios.post(`${apiUrlCarrinho}/removeCupom`, { cupomId: cupomId }, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                if (result.data && result.data.success == true) {
                    setStorage('carrinho', result.data, 'sessionStorage');

                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                } else if (result.data.reason) {
                    setError('invalid', 'notMatch', result.data.reason[0]);
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);

                    console.error('result error: ', result);
                }
            } catch (error) {
                dispatch(ACTION.failure());

                console.error('error: ', error);
            }
        };

        fetchData();
    };

    const handleRemoveCarrinhoItem = useCallback(
        (id) => () => {
            // TODO:
            console.log('handleRemoveCarrinhoItemId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/remove`, params: { itemId: id } });
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

                console.error('error: ', error);
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateCarrinhoData]);

    return {
        handleAddCarrinhoCupom,
        handleAddCarrinhoItem,
        handleRemoveCarrinhoCupom,
        handleRemoveCarrinhoItem,
        stateCarrinho,
        setStateCarrinhoData
    };
};
