import * as formatData from './formatData';

export const formatFormDataGet = (formData) => {
    const formatFormDataGet = {};

    for (let i = 0, l = Object.keys(formData).length; i < l; i += 1) {
        const key = Object.keys(formData)[i];

        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            if (key === 'celular' || key === 'telefone') {
                formatFormDataGet[key] = formatData.formatPhoneGet(formData[key]);
            } else if (key === 'data_nascimento') {
                formatFormDataGet[key] = formatData.formatDateGet(formData[key]);
            } else if (key === 'endereco_cep') {
                formatFormDataGet[key] = formatData.formatCepGet(formData[key]);
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
                formatFormDataSet[key] = formatData.formatPhoneSet(formData[key]);
            } else if (key === 'data_nascimento') {
                formatFormDataSet[key] = formatData.formatDateSet(formData[key]);
            } else if (key === 'endereco_cep') {
                formatFormDataSet[key] = formatData.formatCepSet(formData[key]);
            } else {
                formatFormDataSet[key] = formData[key] == null ? '' : formData[key];
            }
        }
    }

    return formatFormDataSet;
};
