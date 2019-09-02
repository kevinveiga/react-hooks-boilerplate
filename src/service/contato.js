import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useContatoApi = (initialUrl, initialData) => {
    const [stateContatoData, setStateContatoData] = useState(initialUrl);

    const [stateContato, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.post(stateContatoData.url, stateContatoData.data, { headers: { 'Content-Type': 'application/json' } });

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
    }, [stateContatoData]);

    return [stateContato, setStateContatoData];
};
