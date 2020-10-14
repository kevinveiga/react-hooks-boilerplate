import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';
import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useEntrevistaApi = (url, initialData = {}) => {
    const [stateEntrevistaUrl, setStateEntrevistaUrl] = useState(url);

    const [stateEntrevista, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateEntrevistaUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateEntrevistaUrl);

                if (!didCancel) {
                    dispatch(result.data && result.data.data ? { ...ACTION.success(), payload: result.data.data } : ACTION.failure());
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
    }, [stateEntrevistaUrl]);

    return [stateEntrevista, setStateEntrevistaUrl];
};

export const useEntrevistasApi = (obj, initialData = {}) => {
    const [stateEntrevistaData, setStateEntrevistaData] = useState(obj);

    const [stateEntrevistas, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateEntrevistaData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateEntrevistaData.url, { params: stateEntrevistaData.params });

                const isAppend = stateEntrevistaData.params.page > 1;

                if (!didCancel) {
                    dispatch(result.data ? { ...ACTION.success(), append: isAppend, payload: result.data } : ACTION.failure());
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
    }, [stateEntrevistaData]);

    return [stateEntrevistas, setStateEntrevistaData];
};

export const useEntrevistaPesquisaApi = (obj, initialData = []) => {
    const [stateEntrevistaPesquisaData, setStateEntrevistaPesquisaData] = useState(obj);

    const [stateEntrevistaPesquisa, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateEntrevistaPesquisaData) {
            dispatch({ ...ACTION.success(), payload: null });

            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.post(stateEntrevistaPesquisaData.url, stateEntrevistaPesquisaData.params, {
                    headers: { 'Content-Type': 'application/json' }
                });

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
    }, [stateEntrevistaPesquisaData]);

    return [stateEntrevistaPesquisa, setStateEntrevistaPesquisaData];
};
