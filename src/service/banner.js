import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useBannerApi = (initialUrl, initialData) => {
    const [stateBannerUrl, setStateBannerUrl] = useState(initialUrl);

    const [stateBanner, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateBannerUrl);

                if (!didCancel) {
                    dispatch({ ...ACTION.success(), payload: result.data });
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
    }, [stateBannerUrl]);

    return [stateBanner, setStateBannerUrl];
};
