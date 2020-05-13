import { customRegex } from './customRegex';

const validateMessage = {
    CELLPHONE: 'Celular inválido',
    CEP: 'Cep inválido',
    DATE: 'Data inválida',
    EMAIL: 'E-mail inválido',
    MAX: 'Máximo de dígitos inválido',
    MAXLENGTH: 'Máximo de caracteres inválido',
    MIN: 'Máximo de dígitos inválido',
    MINLENGTH: 'Mínimo de caracteres inválido',
    NUMBER: 'Número inválido',
    PASSWORD: 'Senha inválida',
    PHONE: 'Telefone inválido',
    REQUIRED: 'Obrigatório'
};

export const customValidate = {
    address: {
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 }
    },
    cellphone: {
        pattern: { message: validateMessage.CELLPHONE, value: customRegex.cellPhone }
    },
    cep: {
        pattern: { message: validateMessage.CEP, value: customRegex.cep }
    },
    date: {
        pattern: { message: validateMessage.DATE, value: customRegex.date }
    },
    email: {
        pattern: { message: validateMessage.EMAIL, value: customRegex.email }
    },
    name: {
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 }
    },
    number: {
        pattern: { message: validateMessage.NUMBER, value: customRegex.number }
    },
    password: {
        maxLength: { message: 'Máximo de 50 caracteres', value: 50 },
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 },
        pattern: { message: validateMessage.PASSWORD, value: customRegex.password }
    },
    phone: {
        pattern: { message: validateMessage.PHONE, value: customRegex.phone }
    },
    photo: {
        pattern: { message: 'Formato não é valido', value: customRegex.photo }
    },
    require: {
        required: validateMessage.REQUIRED
    }
};
