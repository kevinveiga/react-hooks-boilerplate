import * as ACTION_TYPE from './actionType';

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

export const success = () => {
    return {
        type: ACTION_TYPE.SUCCESS
    };
};
