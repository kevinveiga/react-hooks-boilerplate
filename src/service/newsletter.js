import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import { defaultErrorMsg } from '../config';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNewsletterApi = (initialUrl, initialData) => {
    const [stateNewsletterData, setStateNewsletterData] = useState(initialUrl);

    const [stateNewsletter, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.post(stateNewsletterData.url, stateNewsletterData.data, { headers: { 'Content-Type': 'application/json' } });

                if (!didCancel) {
                    dispatch({ ...ACTION.success(), payload: result.data || { data: [], errorMsg: defaultErrorMsg } });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ ...ACTION.failure(), payload: { data: [], errorMsg: error } });
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
