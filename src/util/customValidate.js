import { customRegex } from './customRegex';

const validateMessage = {
    cellphone: 'Celular inválido',
    cep: 'Cep inválido',
    cpf: 'Cpf inválido',
    cardCvv: 'Código verificador inválido',
    cardDate: 'Data do cartão inválida',
    cardNumber: 'Cartão inválido',
    date: 'Data inválida',
    email: 'E-mail inválido',
    max: 'Máximo de dígitos inválido',
    maxLength: 'Máximo de caracteres inválido',
    min: 'Máximo de dígitos inválido',
    minLength: 'Mínimo de caracteres inválido',
    number: 'Número inválido',
    password: 'Senha inválida',
    phone: 'Telefone inválido',
    required: 'Obrigatório'
};

export const customValidate = {
    address: {
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 }
    },
    cellphone: {
        pattern: { message: validateMessage.cellphone, value: customRegex.cellphone }
    },
    cep: {
        pattern: { message: validateMessage.cep, value: customRegex.cep }
    },
    cpf: {
        pattern: { message: validateMessage.cpf, value: customRegex.cpf }
    },
    cardCvv: {
        pattern: { message: validateMessage.cardCvv, value: customRegex.cardCvv }
    },
    cardDate: {
        pattern: { message: validateMessage.cardDate, value: customRegex.cardDate }
    },
    cardNumber: {
        pattern: { message: validateMessage.cardNumber, value: customRegex.cardNumber }
    },
    date: {
        pattern: { message: validateMessage.date, value: customRegex.date }
    },
    email: {
        pattern: { message: validateMessage.email, value: customRegex.email }
    },
    name: {
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 }
    },
    number: {
        pattern: { message: validateMessage.number, value: customRegex.number }
    },
    password: {
        maxLength: { message: 'Máximo de 50 caracteres', value: 50 },
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 },
        pattern: { message: validateMessage.password, value: customRegex.password }
    },
    phone: {
        pattern: { message: validateMessage.phone, value: customRegex.phone }
    },
    photo: {
        pattern: { message: 'Formato não é valido', value: customRegex.photo }
    },
    require: {
        required: validateMessage.required
    }
};
