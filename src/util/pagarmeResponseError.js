import parse from 'html-react-parser';

import { errorMsgDefault } from '../config';

export const pagarmeResponseError = (data) => {
    const errorsArray = data;
    const errors = [];

    try {
        if (errorsArray) {
            if (typeof errorsArray === 'string') {
                errors.push(`- ${errorsArray}`);
            } else {
                for (let i = 0, l = errorsArray.length; i < l; i += 1) {
                    if (errorsArray[i].type === 'action_forbidden') {
                        errors.push('- Tipo de forma de pagamento não aceita, ou número, ou tipo de cartão incorretos.');
                    } else {
                        errors.push(`- ${errorsArray[i].message}`);
                    }
                }
            }
        } else {
            errors.push(`- ${errorMsgDefault}`);
        }
    } catch (error) {
        errors.push(`- ${errorMsgDefault} - ${error}`);
    }

    return parse(errors.join('<br />'));
};
