import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useCursoApi = (initialUrl, initialData) => {
    const [stateCursoUrl, setStateCursoUrl] = useState(initialUrl);

    const [stateCurso, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateCursoUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateCursoUrl);

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
    }, [stateCursoUrl]);

    return [stateCurso, setStateCursoUrl];
};

export const useCursoCategoriaApi = (obj, initialData) => {
    const [stateCursoCategoriaData, setStateCursoCategoriaData] = useState(obj);

    const [stateCursoCategoria, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateCursoCategoriaData.url, { params: { page: stateCursoCategoriaData.page } });

                const isAppend = stateCursoCategoriaData.page > 1;

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
    }, [stateCursoCategoriaData]);

    return [stateCursoCategoria, setStateCursoCategoriaData];
};

export const useCursoCategoriasApi = (initialUrl, initialData) => {
    const [stateCursoCategoriasUrl] = useState(initialUrl);

    const [stateCursoCategorias, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(stateCursoCategoriasUrl);

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
    }, [stateCursoCategoriasUrl]);

    return stateCursoCategorias;
};
