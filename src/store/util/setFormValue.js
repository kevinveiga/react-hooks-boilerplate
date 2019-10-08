import { useLayoutEffect } from 'react';

export const useSetFormValue = (data, formId) => {
    useLayoutEffect(() => {
        Object.keys(data).forEach((key) => {
            const htmlElement = document.querySelector(`#${formId} input[name="${key}"]`);

            if (htmlElement) {
                htmlElement.value = data[key];
            }
        });
    }, [data, formId]);

    return null;
};
