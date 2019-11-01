import { customRegex } from './customRegex';

export const formatDateGet = (date) => {
    if (!date) {
        return '';
    }

    const newDate = new Date(date);

    const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatDateSet = (date) => {
    if (!date) {
        return '';
    }

    const newDate = new Date(date);

    const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatPhoneGet = (phone) => {
    if (!phone) {
        return '';
    }

    const formatPhone = phone.replace(/\D/g, '');
    const match = formatPhone.match(customRegex.phone);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }

    return '';
};

export const formatPhoneSet = (phone) => {
    if (!phone) {
        return '';
    }

    return phone.replace(/\D/g, '');
};

export const formatCepGet = (cep) => {
    if (!cep) {
        return '';
    }

    const formatCep = cep.replace(/\D/g, '');
    const match = formatCep.match(customRegex.cep);

    if (match) {
        return `${match[1]}-${match[2]}`;
    }

    return '';
};

export const formatCepSet = (cep) => {
    if (!cep) {
        return '';
    }

    return cep.replace(/\D/g, '');
};
