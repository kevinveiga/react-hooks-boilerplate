import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNoticiaApi = (initialUrl, initialData) => {
    const [stateNoticiaUrl, setStateNoticiaUrl] = useState(initialUrl);

    const [stateNoticia, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateNoticiaUrl);

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
    }, [stateNoticiaUrl]);

    return [stateNoticia, setStateNoticiaUrl];
};

export const useNoticiaCategoriaApi = (initialValue, initialData) => {
    const [stateNoticiaCategoriaData, setStateNoticiaCategoriaData] = useState(initialValue);

    const [stateNoticiaCategoria, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateNoticiaCategoriaData.url, { params: { page: stateNoticiaCategoriaData.page } });

                const isAppend = stateNoticiaCategoriaData.page > 1;

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
    }, [stateNoticiaCategoriaData]);

    return [stateNoticiaCategoria, setStateNoticiaCategoriaData];
};

export const useNoticiaCategoriasApi = (initialUrl, initialData) => {
    const [stateNoticiaCategoriasUrl, setStateNoticiaCategoriasUrl] = useState(initialUrl);

    const [stateNoticiaCategorias, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateNoticiaCategoriasUrl);

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
    }, [stateNoticiaCategoriasUrl]);

    return [stateNoticiaCategorias, setStateNoticiaCategoriasUrl];
};
