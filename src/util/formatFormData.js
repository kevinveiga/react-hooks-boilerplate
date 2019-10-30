export const formatFormData = (formData) => {
    const formatFormData = {};

    for (let i = 0, l = Object.keys(formData).length; i < l; i += 1) {
        const key = Object.keys(formData)[i];

        if (Object.prototype.hasOwnProperty.call(formData, key)) {
            if (key === 'celular' || key === 'telefone') {
                formatFormData[key] = formData[key].replace(/\D/g, '');
            } else {
                formatFormData[key] = formData[key];
            }
        }
    }

    return formatFormData;
};
