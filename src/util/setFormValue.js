export const setFormValue = (data, formId) => {
    for (let i = 0, l = Object.keys(data).length; i < l; i += 1) {
        const key = Object.keys(data)[i];
        const htmlElement = document.querySelector(`#${formId} [name="${key}"]`);

        if (htmlElement) {
            let valueType = 'value';

            switch (htmlElement.type) {
                case 'checkbox':
                    valueType = 'checked';

                    break;
                case 'radio':
                    valueType = 'checked';

                    break;
                default:
                    valueType = 'value';
            }

            htmlElement[valueType] = data[key] == null ? '' : data[key];
        }
    }

    return null;
};
