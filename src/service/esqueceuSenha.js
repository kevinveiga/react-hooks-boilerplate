import { useEffect, useState } from 'react';

import axios from 'axios';

export const useEsqueceuSenhaApi = (url) => {
    const [stateEsqueceuSenhaUrl] = useState(url);

    const [stateEsqueceuSenha, setStateEsqueceuSenha] = useState(JSON.parse('{ "data": [] }'));

    useEffect(() => {
        if (!stateEsqueceuSenhaUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateEsqueceuSenhaUrl);

                if (!didCancel) {
                    setStateEsqueceuSenha(result);
                }
            } catch (error) {
                if (!didCancel) {
                    console.error('Erro ao buscar dados do usuário');
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateEsqueceuSenhaUrl]);

    return stateEsqueceuSenha;
};
