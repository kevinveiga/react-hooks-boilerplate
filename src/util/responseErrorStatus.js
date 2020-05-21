import { responseErrorMsg } from '../config';

const errorStatusObj = {
    400: 'Servidor não entendeu a requisição',
    401: 'Não autorizado',
    403: 'Não tem direitos de acesso ao conteúdo',
    404: 'Servidor não pode encontrar o recurso solicitado',
    405: 'Método desativado e não pode ser usado',
    406: 'Não encontrou nenhum conteúdo seguindo os critérios fornecidos pelo agente',
    407: 'Não autenticado no proxy',
    408: 'Tempo de resposta do servidor excedido',
    409: 'Conflito com requisição',
    410: 'Conteúdo deletado',
    411: 'Content-Length não definido',
    412: 'Servidor não atende pré-condições de cabeçalho',
    413: 'Requisição muito grande',
    414: 'URI muito grande',
    415: 'O formato de mídia dos dados requisitados não é suportado pelo servidor',
    416: 'O trecho especificado pelo campo Range do cabeçalho na requisição, não pode ser preenchido',
    417: 'Expectativa indicada pelo campo Expect do cabeçalho da requisição, não pode ser satisfeita pelo servidor',
    418: 'O servidor recusa a tentativa de coar café em um bule de chá',
    421: 'A requisição foi direcionada a um servidor inapto a produzir a resposta',
    422: 'A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos',
    423: 'O recurso sendo acessado está chaveado',
    424: 'A requisição falhou devido a falha em requisição prévia',
    426: 'Atualização de protocolo necessária',
    428: 'O servidor de origem requer que a resposta seja condicional',
    429: 'Muitas requisições em um dado tempo',
    431: 'O servidor não quer processar a requisição porque os campos de cabeçalho são muito grandes',
    451: 'Usuário requisitou um recurso ilegal, tal como uma página censurada por um governo',
    500: 'O servidor encontrou uma situação com a qual não sabe lidar',
    501: 'O método da requisição não é suportado pelo servidor e não pode ser manipulado',
    502: 'Resposta inválida',
    503: 'O servidor não está pronto para manipular a requisição',
    504: 'Tempo de resposta excedido',
    505: 'A versão HTTP usada na requisição não é suportada pelo servidor',
    506: 'Negociação transparente de conteúdo para a requisição resulta em uma referência circular',
    507: 'Negociação transparente de conteúdo com ele mesmo, e portanto não é uma ponta válida no processo de negociação',
    508: 'O servidor detectou um looping infinito ao processar a requisição',
    510: 'Exigem-se extenções posteriores à requisição para o servidor atendê-la',
    511: 'Não autenticado na rede'
};

export const responseErrorStatus = (statusCode) => {
    let msg = responseErrorMsg;

    if (errorStatusObj[statusCode]) {
        msg = `Erro ${statusCode} - ${errorStatusObj[statusCode]}.`;
    }

    return msg;
};
