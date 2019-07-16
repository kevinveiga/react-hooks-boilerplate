import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNoticiaApi = (initialUrl, initialData) => {
    const [noticiaUrl, setNoticiaUrl] = useState(initialUrl);

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
                const result = await axios.get(noticiaUrl);

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
    }, [noticiaUrl]);

    return [stateNoticia, setNoticiaUrl];
};

export const useNoticiaCategoriaApi = (initialValue, initialData) => {
    const [noticiaCategoria, setNoticiaCategoria] = useState(initialValue);

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
                const result = await axios.get(noticiaCategoria.url, { params: { page: noticiaCategoria.page } });

                const isAppend = noticiaCategoria.page > 1;

                if (!didCancel) {
                    dispatch({ ...ACTION.success(), append: isAppend, payload: result.data });
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
    }, [noticiaCategoria]);

    return [stateNoticiaCategoria, setNoticiaCategoria];
};

export const useNoticiaCategoriasApi = (initialUrl, initialData) => {
    const [noticiaCategoriasUrl, setNoticiaCategoriasUrl] = useState(initialUrl);

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
                const result = await axios.get(noticiaCategoriasUrl);

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
    }, [noticiaCategoriasUrl]);

    return [stateNoticiaCategorias, setNoticiaCategoriasUrl];
};
