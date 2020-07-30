import { removeStorage, getStorage } from './storage';

import { cursoMatricula } from '../service/curso';

export const redirectRule = (url) => {
    try {
        const cursoId = getStorage('cursoId', 'sessionStorage');
        const redirectUrl = url || getStorage('redirectUrl', 'sessionStorage') || '/minha-conta/cursos';

        // Limpa url na sessionStorage, somente depois de passar o valor para redirectUrl
        removeStorage('redirectUrl', 'sessionStorage');

        // Verifica se deve usar a função para fazer a matricula com o cursoId e redirecionar para o curso dentro de Minha Conta,
        // ou redireciona para uma URL passada no parâmetro ou no sessionStorage,
        // se nenhum dos casos for verdadeiro, direciona para /minha-conta/cursos
        if (cursoId && redirectUrl === `/minha-conta/curso/${cursoId}`) {
            cursoMatricula(cursoId);
        } else {
            window.location.assign(redirectUrl);
        }
    } catch (error) {
        console.error(error);
    }
};
