import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const usePaywallApi = (url, initialData) => {
    const [statePaywallData, setStatePaywallData] = useState(url);

    const [statePaywall, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!statePaywallData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.post(statePaywallData.url, statePaywallData.data, { headers: { 'Content-Type': 'application/json' } });

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
    }, [statePaywallData]);

    return [statePaywall, setStatePaywallData];
};
