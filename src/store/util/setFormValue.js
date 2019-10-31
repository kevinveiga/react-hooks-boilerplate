import { useEffect } from 'react';

export const useSetFormValue = (data, formId) => {
    useEffect(() => {
        Object.keys(data).forEach((key) => {
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
        });

        return undefined;
    }, [data, formId]);

    return null;
};
