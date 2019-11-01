import { customRegex } from './customRegex';

export const formatDateGet = (date) => {
    const newDate = new Date(date);

    const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    return date ? `${day}/${month}/${year}` : '';
};

export const formatDateSet = (date) => {
    const newDate = new Date(date);

    const day = newDate
        .getDate()
        .toString()
        .padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();

    return date ? `${day}/${month}/${year}` : '';
};

export const formatPhoneGet = (phone) => {
    const formatPhone = phone.replace(/\D/g, '');
    const match = formatPhone.match(customRegex.phone);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }

    return '';
};

export const formatPhoneSet = (phone) => {
    return phone ? phone.replace(/\D/g, '') : '';
};
