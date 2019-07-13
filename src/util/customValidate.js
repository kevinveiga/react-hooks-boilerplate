const validateMessage = {
    EMAIL: 'E-mail inválido',
    MAX: 'Máximo de dígitos inválido',
    MAXLENGTH: 'Máximo de caracteres inválido',
    MIN: 'Máximo de dígitos inválido',
    MINLENGTH: 'Mínimo de caracteres inválido',
    PHONE: 'Telefone inválido',
    REQUIRED: 'Obrigatório'
};

export const customValidate = {
    email: {
        pattern: { message: validateMessage.EMAIL, value: /^(([^<>()[\]{}\\.,;:\s@"]+(\.[^<>()[\]{}\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
        required: validateMessage.REQUIRED
    },
    name: {
        minLength: { message: 'Mínimo de 5 caracteres', value: 5 },
        required: validateMessage.REQUIRED
    },
    phone: {
        pattern: { message: validateMessage.PHONE, value: /^\(?(\d{2})\)?\s?(\d{4}|\d{5})-?(\d{4})$/ },
        required: validateMessage.REQUIRED
    }
};
