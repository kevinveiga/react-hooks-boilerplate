import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import { defaultErrorMsg } from '../config';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useDestaqueApi = (initialUrl, initialData) => {
    const [stateDestaqueUrl, setStateDestaqueUrl] = useState(initialUrl);

    const [stateDestaque, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateDestaqueUrl);

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
    }, [stateDestaqueUrl]);

    return [stateDestaque, setStateDestaqueUrl];
};
