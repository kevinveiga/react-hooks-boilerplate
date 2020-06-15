import parse from 'html-react-parser';

import { errorMsgDefault } from '../config';

export const responseError = (data) => {
    const errorsObj = data;
    const errors = [];

    if (errorsObj) {
        if (typeof errorsObj === 'string') {
            errors.push(`- ${errorsObj}`);
        } else {
            for (let i = 0, l = Object.keys(errorsObj).length; i < l; i += 1) {
                errors.push(`- ${errorsObj[Object.keys(errorsObj)[i]]}`);
            }
        }
    } else {
        errors.push(`- ${errorMsgDefault}`);
    }

    return parse(errors.join('<br />'));
};
