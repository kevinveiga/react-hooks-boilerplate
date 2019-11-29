import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNoticiaApi = (initialData, url) => {
    const [stateNoticiaUrl, setStateNoticiaUrl] = useState(url);

    const [stateNoticia, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateNoticiaUrl) {
            return undefined;
        }

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

export const useNoticiaCategoriaApi = (initialData, obj) => {
    const [stateNoticiaCategoriaData, setStateNoticiaCategoriaData] = useState(obj);

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

export const useNoticiaCategoriasApi = (initialData, url) => {
    const [stateNoticiaCategoriasUrl] = useState(url);

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

    return stateNoticiaCategorias;
};
