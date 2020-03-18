import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';
import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useVideoApi = (obj, initialData = {}) => {
    const [stateVideoData, setStateVideoData] = useState(obj);

    const [stateVideo, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateVideoData.isIntersecting || !stateVideoData.url) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateVideoData.url);

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
    }, [stateVideoData]);

    return [stateVideo, setStateVideoData];
};
