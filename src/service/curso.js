import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import { apiUrlCursos } from '../config';

import * as ACTION from '../store/action/action';
import { dataFetchReducer } from '../store/reducer/dataFetchReducer';

import { removeStorage, setStorage } from '../util/storage';

/**
 * @description Registrar matrícula do curso, grava em sessionStorage o id do curso e faz um redirect.
 * @param {number} cursoId Id do curso.
 * @param {string} url Url da api.
 */
export const cursoMatricula = (cursoId, url = `${apiUrlCursos}/matricular`) => {
    // Adiciona o cursoId na sessionStorage
    setStorage('cursoId', JSON.stringify(cursoId), 'sessionStorage');

    const fetchData = async () => {
        try {
            const result = await axios.post(url, { curso_id: cursoId });

            if (result.data && result.data.success == true) {
                // Depois do usuário estar matriculado no curso, remove o cursoId da sessionStorage e redireciona para Minha Conta - Cursos
                removeStorage('cursoId', 'sessionStorage');

                window.location.pathname = `/minha-conta/curso/${cursoId}`;
            } else {
                console.error('result error: ', result);
            }
        } catch (error) {
            // Se o usuário não está logado, redireciona para Minha Conta - Cursos
            // onde é aplicada a regra de redirecionamento do Login
            if (error.response && error.response.status === 403) {
                window.location.pathname = `/minha-conta/curso/${cursoId}`;
            } else {
                console.error('error: ', error);
            }
        }
    };

    fetchData();

    return null;
};

/**
 * @description Retorna o state com todos os cursos ou somente um.
 * @param {string} url Url da api.
 * @param {object} initialData Dados iniciais.
 */
export const useCursoApi = (url, initialData = {}) => {
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

/**
 * @description Retorna o state dos dados do conteúdo, o state dos dados de conteúdo anterior e próximo, e o setState do conteúdo.
 * @param {object} initialData Dados iniciais.
 */
export const useCursoConteudoApi = (initialData = {}) => {
    const [stateCursoConteudoData, setStateCursoConteudoData] = useState();
    const [stateCursoConteudoPrevNext, setStateCursoConteudoPrevNext] = useState({});

    const [stateCursoConteudo, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    const prevNextId = useCallback(() => {
        if (stateCursoConteudoData.modulos) {
            const { conteudoId, modulos } = stateCursoConteudoData;

            let nextModuloConteudoId;
            let prevModuloConteudoId;

            for (let i1 = 0, l1 = modulos.length; i1 < l1; i1 += 1) {
                nextModuloConteudoId = modulos[i1 + 1] && modulos[i1 + 1].conteudos[0].id;
                prevModuloConteudoId = modulos[i1 - 1] && modulos[i1 - 1].conteudos[modulos[i1 - 1].conteudos.length - 1].id;

                for (let i2 = 0, l2 = modulos[i1].conteudos.length; i2 < l2; i2 += 1) {
                    if (modulos[i1].conteudos[i2].id === conteudoId) {
                        setStateCursoConteudoPrevNext({
                            moduloCurrentId: modulos[i1].id,
                            nextId: modulos[i1].conteudos[i2 + 1] ? modulos[i1].conteudos[i2 + 1].id : nextModuloConteudoId,
                            prevId: modulos[i1].conteudos[i2 - 1] ? modulos[i1].conteudos[i2 - 1].id : prevModuloConteudoId
                        });

                        return modulos[i1].id;
                    }
                }
            }
        }

        return 0;
    }, [stateCursoConteudoData, setStateCursoConteudoPrevNext]);

    useEffect(() => {
        if (!stateCursoConteudoData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `${stateCursoConteudoData.url}/${stateCursoConteudoData.cursoId}/${stateCursoConteudoData.conteudoId}`
                );

                if (!didCancel) {
                    dispatch(result.data ? { ...ACTION.success(), payload: result.data } : ACTION.failure());

                    if (stateCursoConteudoData.setCurrent) {
                        window.localStorage.setItem(
                            'conteudoAtualData',
                            JSON.stringify({
                                conteudoId: stateCursoConteudoData.conteudoId,
                                cursoId: stateCursoConteudoData.cursoId,
                                moduloCurrentId: prevNextId(),
                                modulos: stateCursoConteudoData.modulos,
                                url: stateCursoConteudoData.url
                            })
                        );
                    }
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

    return [stateCursoConteudo, stateCursoConteudoPrevNext, setStateCursoConteudoData];
};

/**
 * @description Retorna o state do progresso do curso e o setState do conteúdo visualizado do curso.
 * @param {object} initialData Dados iniciais.
 */
export const useCursoConteudoVisualizadoApi = (initialData = {}) => {
    const [stateCursoConteudoVisualizadoData, setStateCursoConteudoVisualizadoData] = useState();

    const [stateCursoProgresso, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        if (!stateCursoConteudoVisualizadoData) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const action =
                    stateCursoConteudoVisualizadoData.action.type === ACTION.remove().type ? 'remover-visualizacao' : 'registrar-visualizacao';

                const result = await axios.post(`${stateCursoConteudoVisualizadoData.url}/${action}`);

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
    }, [stateCursoConteudoVisualizadoData]);

    return [stateCursoProgresso, setStateCursoConteudoVisualizadoData];
};

/**
 * @description Retorna o state da categoria dos cursos e o setState da categoria dos cursos
 * @param {object} initialData Dados iniciais.
 */
export const useCursoCategoriaApi = (initialData = {}) => {
    const [stateCursoCategoriaData, setStateCursoCategoriaData] = useState();

    const [stateCursoCategoria, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
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

/**
 * @description Retorna o state de todas as categorias dos cursos.
 * @param {object} initialData Dados iniciais.
 */
export const useCursoCategoriasApi = (url, initialData = {}) => {
    const [stateCursoCategoriasUrl] = useState(url);

    const [stateCursoCategorias, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isError: false,
        isLoading: false
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
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
