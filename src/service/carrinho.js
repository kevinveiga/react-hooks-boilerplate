import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import { apiUrlCarrinho, errorMsgDefault } from '../config';

import * as ACTION from '../store/action/action';
import { ecommerceReducer } from '../store/reducer/ecommerceReducer';

import { getDateTime } from '../util/getDateTime';
import { getStorage, setStorage } from '../util/storage';

export const useCarrinhoApi = () => {
    // VARIABLE
    const initialData = {
        cupom: '',
        data_inicio: getDateTime(),
        forma_pagamento: { parcelas_quantidade: 0, parcelas_valor: 0, tipo: '', titulo: '' },
        itens: [],
        valor_total: 0,
        valor_total_desconto: 0
    };

    // ACTION
    const [stateCarrinhoData, setStateCarrinhoData] = useState({ url: apiUrlCarrinho, params: {} });

    const [stateCarrinho, dispatch] = useReducer(ecommerceReducer, {
        data: getStorage('carrinho', 'sessionStorage') ? JSON.parse(getStorage('carrinho', 'sessionStorage')) : { data: initialData },
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                // const result = await axios.post(stateCarrinhoData.url, stateCarrinhoData.params, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                setStorage('carrinho', JSON.stringify(result.data), 'sessionStorage');

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

    // FUNCTION
    const handleCarrinhoCupomAdd = (cupomCodigo, setError) => {
        // TODO:
        const fetchData = async () => {
            try {
                // const result = await axios.post(`${apiUrlCarrinho}/addCupom`, { cupomCodigo: cupomCodigo }, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                if (result.data && result.data.success == true) {
                    setStorage('carrinho', JSON.stringify(result.data), 'sessionStorage');

                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                } else if (result.data.reason) {
                    setError('invalid', { type: 'manual', message: result.data.reason[0] });
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                dispatch(ACTION.failure());

                console.error('error: ', error);
            }
        };

        fetchData();
    };

    const handleCarrinhoCupomRemove = (cupomId, setError) => () => {
        // TODO:
        const fetchData = async () => {
            try {
                // const result = await axios.post(`${apiUrlCarrinho}/removeCupom`, { cupomId: cupomId }, { headers: { 'Content-Type': 'application/json' } });

                const result = await axios.get('http://localhost:3000/src/service/carrinho.json');

                if (result.data && result.data.success == true) {
                    setStorage('carrinho', JSON.stringify(result.data), 'sessionStorage');

                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                } else if (result.data.reason) {
                    setError('invalid', { type: 'manual', message: result.data.reason[0] });
                } else {
                    setError('invalid', { type: 'manual', message: errorMsgDefault });

                    console.error('result error: ', result);
                }
            } catch (error) {
                dispatch(ACTION.failure());

                console.error('error: ', error);
            }
        };

        fetchData();
    };

    const handleCarrinhoItemAdd = useCallback(
        (id) => {
            // TODO:
            console.log('handleCarrinhoItemAddId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/add`, params: { itemId: id } });
            */
        },
        [setStateCarrinhoData]
    );

    const handleCarrinhoItemRemove = useCallback(
        (id) => {
            // TODO:
            console.log('handleCarrinhoItemRemoveId: ', id);

            /*
            setStateCarrinhoData({ url: `${apiUrlCarrinho}/remove`, params: { itemId: id } });
            */
        },
        [setStateCarrinhoData]
    );

    const handleFormaPagamento = useCallback((formaPagamentoObj) => {
        dispatch({ ...ACTION.paymentChange(), payload: formaPagamentoObj });
    }, []);

    const handleFormaPagamentoTipo = useCallback((formaPagamentoTipo) => {
        dispatch({ ...ACTION.paymentTypeChange(), payload: formaPagamentoTipo });
    }, []);

    return {
        handleCarrinhoCupomAdd,
        handleCarrinhoCupomRemove,
        handleCarrinhoItemAdd,
        handleCarrinhoItemRemove,
        handleFormaPagamento,
        handleFormaPagamentoTipo,
        stateCarrinho,
        setStateCarrinhoData
    };
};
