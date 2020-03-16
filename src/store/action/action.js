import * as ACTION_TYPE from './actionType';

export const add = () => {
    return {
        type: ACTION_TYPE.ADD
    };
};

export const addQuantity = () => {
    return {
        type: ACTION_TYPE.ADD_QUANTITY
    };
};

export const addToCart = () => {
    return {
        type: ACTION_TYPE.ADD_TO_CART
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

export const removeQuantity = () => {
    return {
        type: ACTION_TYPE.REMOVE_QUANTITY
    };
};

export const removeFromCart = () => {
    return {
        type: ACTION_TYPE.REMOVE_FROM_CART
    };
};

export const success = () => {
    return {
        type: ACTION_TYPE.SUCCESS
    };
};
