export const customRegex = {
    cellPhone: /^\(?(\d{2})\)?\s?(\d{1})-?(\d{4})-?(\d{4})$/,
    cep: /^(\d{5})-?(\d{3})$/,
    date: /^(([0-2][0-9]|(3)[0-1])\/?(((0)[0-9])|((1)[0-2]))\/?(\d{4}))?$/,
    email: /^(([^<>()[\]{}\\.,;:\s@"]+(\.[^<>()[\]{}\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    notNumber: /^\D+$/,
    number: /^[1-9]\d*$/,
    password: /^(?=.*([A-z]|[0-9])).{6,10}$/,
    phone: /^\(?(\d{2})\)?\s?(\d{1})-?(\d{4})-?(\d{3,4})$/
};
