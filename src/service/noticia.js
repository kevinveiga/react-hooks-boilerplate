import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import * as ACTION from '../store/action/action';
import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useNoticiaApi = (url, initialData = {}) => {
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

export const useNoticiaCategoriaApi = (initialData = {}) => {
    const [stateNoticiasCategoriaData, setStateNoticiasCategoriaData] = useState();

    const [stateNoticiasCategoria, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateNoticiasCategoriaData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateNoticiasCategoriaData.url, { params: { page: stateNoticiasCategoriaData.page } });

                const isAppend = stateNoticiasCategoriaData.page > 1;

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
    }, [stateNoticiasCategoriaData]);

    return [stateNoticiasCategoria, setStateNoticiasCategoriaData];
};

export const useNoticiaCategoriasApi = (url, initialData = {}) => {
    const [stateNoticiaCategoriasUrl] = useState(url);

    const [stateNoticiaCategorias, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateNoticiaCategoriasUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
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

export const useNoticiaPesquisaApi = (obj, initialData = {}) => {
    const [stateNoticiaPesquisaData, setStateNoticiaPesquisaData] = useState(obj);

    const [stateNoticiaPesquisa, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateNoticiaPesquisaData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.post(stateNoticiaPesquisaData.url, stateNoticiaPesquisaData.params, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!didCancel) {
                    window.history.replaceState('noticia-pesquisa', '', `noticia-pesquisa/${stateNoticiaPesquisaData.params.query}`);

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
    }, [stateNoticiaPesquisaData]);

    return [stateNoticiaPesquisa, setStateNoticiaPesquisaData];
};
