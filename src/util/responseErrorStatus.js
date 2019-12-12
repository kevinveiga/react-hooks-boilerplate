import { responseErrorMsg } from '../config';

export const responseErrorStatus = (statusCode) => {
    switch (statusCode) {
        case 400:
            return `Erro ${statusCode} - Servidor não entendeu a requisição.`;
        case 401:
            return `Erro ${statusCode} - Não autenticado.`;
        case 403:
            return `Erro ${statusCode} - Não tem direitos de acesso ao conteúdo.`;
        case 404:
            return `Erro ${statusCode} - Servidor não pode encontrar o recurso solicitado.`;
        case 405:
            return `Erro ${statusCode} - Método desativado e não pode ser usado.`;
        case 406:
            return `Erro ${statusCode} - Não encontrou nenhum conteúdo seguindo os critérios fornecidos pelo agente.`;
        case 407:
            return `Erro ${statusCode} - Não autenticado no proxy.`;
        case 408:
            return `Erro ${statusCode} - Tempo de resposta do servidor excedido.`;
        case 409:
            return `Erro ${statusCode} - Conflito com requisição.`;
        case 410:
            return `Erro ${statusCode} - Conteúdo deletado.`;
        case 411:
            return `Erro ${statusCode} - Content-Length não definido.`;
        case 412:
            return `Erro ${statusCode} - Servidor não atende pré-condições de cabeçalho.`;
        case 413:
            return `Erro ${statusCode} - Requisição muito grande.`;
        case 414:
            return `Erro ${statusCode} - URI muito grande.`;
        case 415:
            return `Erro ${statusCode} - O formato de mídia dos dados requisitados não é suportado pelo servidor.`;
        case 416:
            return `Erro ${statusCode} - O trecho especificado pelo campo Range do cabeçalho na requisição, não pode ser preenchido.`;
        case 417:
            return `Erro ${statusCode} - Expectativa indicada pelo campo Expect do cabeçalho da requisição, não pode ser satisfeita pelo servidor.`;
        case 418:
            return `Erro ${statusCode} - O servidor recusa a tentativa de coar café em um bule de chá.`;
        case 421:
            return `Erro ${statusCode} - A requisição foi direcionada a um servidor inapto a produzir a resposta.`;
        case 422:
            return `Erro ${statusCode} - A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.`;
        case 423:
            return `Erro ${statusCode} - O recurso sendo acessado está chaveado.`;
        case 424:
            return `Erro ${statusCode} - A requisição falhou devido a falha em requisição prévia.`;
        case 426:
            return `Erro ${statusCode} - Atualização de protocolo necessária.`;
        case 428:
            return `Erro ${statusCode} - O servidor de origem requer que a resposta seja condicional.`;
        case 429:
            return `Erro ${statusCode} - Muitas requisições em um dado tempo.`;
        case 431:
            return `Erro ${statusCode} - O servidor não quer processar a requisição porque os campos de cabeçalho são muito grandes.`;
        case 451:
            return `Erro ${statusCode} - Usuário requisitou um recurso ilegal, tal como uma página censurada por um governo.`;
        case 500:
            return `Erro ${statusCode} - O servidor encontrou uma situação com a qual não sabe lidar.`;
        case 501:
            return `Erro ${statusCode} - O método da requisição não é suportado pelo servidor e não pode ser manipulado.`;
        case 502:
            return `Erro ${statusCode} - Resposta inválida.`;
        case 503:
            return `Erro ${statusCode} - O servidor não está pronto para manipular a requisição.`;
        case 504:
            return `Erro ${statusCode} - Tempo de resposta excedido.`;
        case 505:
            return `Erro ${statusCode} - A versão HTTP usada na requisição não é suportada pelo servidor.`;
        case 506:
            return `Erro ${statusCode} - Negociação transparente de conteúdo para a requisição resulta em uma referência circular.`;
        case 507:
            return `Erro ${statusCode} - Negociação transparente de conteúdo com ele mesmo, e portanto não é uma ponta válida no processo de negociação.`;
        case 508:
            return `Erro ${statusCode} - O servidor detectou um looping infinito ao processar a requisição.`;
        case 510:
            return `Erro ${statusCode} - Exigem-se extenções posteriores à requisição para o servidor atendê-la.`;
        case 511:
            return `Erro ${statusCode} - Não autenticado na rede.`;
        default:
            return responseErrorMsg;
    }
};
