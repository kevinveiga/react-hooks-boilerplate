import { formatDateGet, formatDateSet, formatPhoneGet, formatPhoneSet } from './formatData';

export const formatFormDataGet = (formData) => {
    const formatFormDataGet = {};

    for (let i = 0, l = Object.keys(formData).length; i < l; i += 1) {
        const key = Object.keys(formData)[i];

        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            if (key === 'celular' || key === 'telefone') {
                formatFormDataGet[key] = formatPhoneGet(formData[key]);
            } else if (key === 'data_nascimento') {
                formatFormDataGet[key] = formatDateGet(formData[key]);
            } else {
                formatFormDataGet[key] = formData[key] == null ? '' : formData[key];
            }
        }
    }

    return formatFormDataGet;
};

export const formatFormDataSet = (formData) => {
    const formatFormDataSet = {};

    for (let i = 0, l = Object.keys(formData).length; i < l; i += 1) {
        const key = Object.keys(formData)[i];

        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            if (key === 'celular' || key === 'telefone') {
                formatFormDataSet[key] = formatPhoneSet(formData[key]);
            } else if (key === 'data_nascimento') {
                formatFormDataSet[key] = formatDateSet(formData[key]);
            } else {
                formatFormDataSet[key] = formData[key] == null ? '' : formData[key];
            }
        }
    }

    return formatFormDataSet;
};
