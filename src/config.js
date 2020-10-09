const apiUrl = `${process.env.API_URL}/api/v1`;

export const apiUrlCadastro = `${apiUrl}/auth/registrar`;

export const apiUrlCarrinho = `${apiUrl}/carrinho`;

export const apiUrlCep = `${apiUrl}/cep`;

export const apiUrlConfiguracoes = `${apiUrl}/configuracoes`;

export const apiUrlContato = `${apiUrl}/contato`;

export const apiUrlCursos = `${apiUrl}/cursos`;

export const apiUrlEntrevistas = `${apiUrl}/entrevistas`;

export const apiUrlEntrevistasTags = `${apiUrlEntrevistas}/tags`;

export const apiUrlEsqueceuSenha = `${apiUrl}/password`;

export const apiUrlFormasPagamento = 'http://localhost:3000/src/service/formasPagamento.json';

export const apiUrlHome = `${apiUrl}/home`;

export const apiUrlLogin = `${apiUrl}/auth/login`;

export const apiUrlNewsletter = `${apiUrl}/newsletter`;

export const apiUrlNoticias = `${apiUrl}/noticias`;

export const apiUrlNoticiasBusca = `${apiUrlNoticias}/busca`;

export const apiUrlPaywall = `${apiUrl}/paywall`;

export const apiUrlPerfil = `${apiUrl}/perfil`;

export const apiUrlPerfilAvatar = `${apiUrl}/perfil/avatar`;

export const errorEmailNotFound = 'Email não cadastrado';

export const errorMsgDefault = 'Erro desconhecido';

export const errorMsgResponse = 'Algo deu errado, tente novamente.';

export const pagarmeEncryptionKey = process.env.PAGARME_ENCRYPTION_KEY;

export const socketUrl = process.env.SOCKET_URL;
