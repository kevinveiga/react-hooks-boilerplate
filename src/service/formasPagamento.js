import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';
import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useFormasPagamentoApi = (url, initialData = {}) => {
    // ACTION
    const [stateFormasPagamentoUrl] = useState(url);

    const [stateFormasPagamento, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateFormasPagamentoUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateFormasPagamentoUrl);

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
    }, [stateFormasPagamentoUrl]);

    return stateFormasPagamento;
};
