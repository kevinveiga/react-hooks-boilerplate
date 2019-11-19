import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';

import * as ACTION from '../store/action/action';

import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

export const useCursoApi = (url, initialData) => {
    const [stateCursoUrl, setStateCursoUrl] = useState(url);

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

export const useCursoConteudoApi = (obj, initialData) => {
    const [stateCursoConteudoData, setStateCursoConteudoData] = useState(obj);
    const [stateCursoConteudoPrevNextId, setStateCursoConteudoPrevNextId] = useState({});

    const [stateCursoConteudo, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    const prevNextId = useCallback(() => {
        if (stateCursoConteudoData.modulos) {
            const { conteudoId, modulos } = stateCursoConteudoData;

            let exitLoop = false;
            let nextModuloConteudoId;
            let prevModuloConteudoId;

            for (let i1 = 0, l1 = modulos.length; i1 < l1; i1 += 1) {
                nextModuloConteudoId = modulos[i1 + 1] && modulos[i1 + 1].conteudos[0].id;
                prevModuloConteudoId = modulos[i1 - 1] && modulos[i1 - 1].conteudos[modulos[i1 - 1].conteudos.length - 1].id;

                for (let i2 = 0, l2 = modulos[i1].conteudos.length; i2 < l2; i2 += 1) {
                    if (modulos[i1].conteudos[i2].id === conteudoId) {
                        setStateCursoConteudoPrevNextId({ nextId: modulos[i1].conteudos[i2 + 1] ? modulos[i1].conteudos[i2 + 1].id : nextModuloConteudoId, prevId: modulos[i1].conteudos[i2 - 1] ? modulos[i1].conteudos[i2 - 1].id : prevModuloConteudoId });

                        exitLoop = true;
                        break;
                    }
                }

                if (exitLoop) {
                    break;
                }
            }
        }
    }, [stateCursoConteudoData, setStateCursoConteudoPrevNextId]);

    useEffect(() => {
        if (!stateCursoConteudoData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            dispatch(ACTION.init());

            try {
                const result = await axios.get(`${stateCursoConteudoData.url}/${stateCursoConteudoData.conteudoId}`);

                if (!didCancel) {
                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());
                    prevNextId(stateCursoConteudoData.conteudoId, stateCursoConteudoData.modulos, stateCursoConteudoData.url);
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
    }, [prevNextId, stateCursoConteudoData]);

    return [stateCursoConteudo, stateCursoConteudoPrevNextId, setStateCursoConteudoData];
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

export const useCursoCategoriasApi = (url, initialData) => {
    const [stateCursoCategoriasUrl] = useState(url);

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
