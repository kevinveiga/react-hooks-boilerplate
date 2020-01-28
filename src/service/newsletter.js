import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNewsletterApi = (url, initialData = {}) => {
    const [stateNewsletterData, setStateNewsletterData] = useState(url);

    const [stateNewsletter, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateNewsletterData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.post(stateNewsletterData.url, stateNewsletterData.data, { headers: { 'Content-Type': 'application/json' } });

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
    }, [stateNewsletterData]);

    return [stateNewsletter, setStateNewsletterData];
};
