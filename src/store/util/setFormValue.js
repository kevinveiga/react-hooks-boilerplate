import { useLayoutEffect } from 'react';

export const useSetFormValue = (data, formId) => {
    useLayoutEffect(() => {
        Object.keys(data).forEach((key) => {
            const htmlElement = document.querySelector(`#${formId} input[name="${key}"]`);

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

                htmlElement[valueType] = data[key];
            }
        });
    }, [data, formId]);

    return null;
};
