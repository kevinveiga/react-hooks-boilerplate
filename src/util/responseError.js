import parse from 'html-react-parser';

import { defaultErrorMsg } from '../config';

export const responseError = (data) => {
    const objErrors = data;
    const errors = [];

    if (objErrors) {
        for (let i = 0, l = Object.keys(objErrors).length; i < l; i += 1) {
            errors.push(`- ${objErrors[Object.keys(objErrors)[i]]}`);
        }
    } else {
        errors.push(`- ${defaultErrorMsg}`);
    }

    return parse(errors.join('<br />'));
};
