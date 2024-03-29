import * as ACTION_TYPE from './actionType';

export const add = () => {
    return {
        type: ACTION_TYPE.ADD
    };
};

export const failure = () => {
    return {
        type: ACTION_TYPE.FAILURE
    };
};

export const init = () => {
    return {
        type: ACTION_TYPE.INIT
    };
};

export const paymentChange = () => {
    return {
        type: ACTION_TYPE.PAYMENT_CHANGE
    };
};

export const paymentTypeChange = () => {
    return {
        type: ACTION_TYPE.PAYMENT_TYPE_CHANGE
    };
};

export const remove = () => {
    return {
        type: ACTION_TYPE.REMOVE
    };
};

export const success = () => {
    return {
        type: ACTION_TYPE.SUCCESS
    };
};
