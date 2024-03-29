export const setFormValue = (data, formId, setValue) => {
    for (let i = 0, l = Object.keys(data).length; i < l; i += 1) {
        const key = Object.keys(data)[i];

        if (Object.prototype.hasOwnProperty.call(data, key)) {
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

                if (setValue) {
                    setValue(key, data[key]);
                }
            }
        }
    }

    return null;
};
