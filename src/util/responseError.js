import parse from 'html-react-parser';

import { defaultErrorMsg } from '../config';

export const responseError = (data) => {
    const errorsObj = data;
    const errors = [];

    if (errorsObj) {
        for (let i = 0, l = Object.keys(errorsObj).length; i < l; i += 1) {
            errors.push(`- ${errorsObj[Object.keys(errorsObj)[i]]}`);
        }
    } else {
        errors.push(`- ${defaultErrorMsg}`);
    }

    return parse(errors.join('<br />'));
};
