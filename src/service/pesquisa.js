import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const usePesquisaApi = (initialData, obj) => {
    const [statePesquisaData, setStatePesquisaData] = useState(obj);

    const [statePesquisa, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.post(statePesquisaData.url, statePesquisaData.params, { headers: { 'Content-Type': 'application/json' } });

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
    }, [statePesquisaData]);

    return [statePesquisa, setStatePesquisaData];
};
