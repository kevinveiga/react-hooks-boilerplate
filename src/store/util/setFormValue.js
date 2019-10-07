import { useLayoutEffect } from 'react';

export const useSetFormValue = (data, formId) => {
    useLayoutEffect(() => {
        Object.keys(data).forEach((key) => {
            document.querySelector(`#${formId} input[name="${key}"]`).value = data[key];
        });
    }, [data, formId]);

    return null;
};
