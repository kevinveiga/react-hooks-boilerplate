import * as ACTION_TYPE from './actionType';

export const add = () => {
    return {
        type: ACTION_TYPE.ADD
    };
};

export const changePayment = () => {
    return {
        type: ACTION_TYPE.CHANGE_PAYMENT
    };
};

export const changePaymentType = () => {
    return {
        type: ACTION_TYPE.CHANGE_PAYMENT_TYPE
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
