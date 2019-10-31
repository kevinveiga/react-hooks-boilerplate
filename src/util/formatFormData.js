import { formatDate } from './formatDate';

export const formatFormData = (formData) => {
    const formatFormData = {};

    for (let i = 0, l = Object.keys(formData).length; i < l; i += 1) {
        const key = Object.keys(formData)[i];

        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            if (key === 'celular' || key === 'telefone') {
                formatFormData[key] = formData[key] ? formData[key].replace(/\D/g, '') : '';
            } else if (key === 'data_nascimento') {
                formatFormData[key] = formData[key] ? formatDate(formData[key]) : '';
            } else {
                formatFormData[key] = formData[key] == null ? '' : formData[key];
            }
        }
    }

    return formatFormData;
};
