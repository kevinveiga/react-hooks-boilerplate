const validateMessage = {
    EMAIL: 'E-mail inválido',
    MAX: 'Máximo de dígitos inválido',
    MAXLENGTH: 'Máximo de caracteres inválido',
    MIN: 'Máximo de dígitos inválido',
    MINLENGTH: 'Mínimo de caracteres inválido',
    NUMBER: 'Número inválido',
    PASSWORD: 'Senha inválida, pelo menos 1 caracter alfabético e numérico',
    PHONE: 'Telefone inválido',
    REQUIRED: 'Obrigatório'
};

export const customValidate = {
    email: {
        pattern: { message: validateMessage.EMAIL, value: /^(([^<>()[\]{}\\.,;:\s@"]+(\.[^<>()[\]{}\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
    },
    name: {
        minLength: { message: 'Mínimo de 5 caracteres', value: 5 }
    },
    number: {
        pattern: { message: validateMessage.NUMBER, value: /^[1-9]\d*$/ }
    },
    password: {
        maxLength: { message: 'Máximo de 10 caracteres', value: 10 },
        minLength: { message: 'Mínimo de 6 caracteres', value: 6 },
        pattern: { message: validateMessage.PASSWORD, value: /^(?=.*[a-z])(?=.*[0-9]).{6,10}$/ }
    },
    phone: {
        pattern: { message: validateMessage.PHONE, value: /^\(?(\d{2})\)?\s?(\d{1})-?(\d{4})-?(\d{3,4})$/ }
    },
    require: {
        required: validateMessage.REQUIRED
    }
};
