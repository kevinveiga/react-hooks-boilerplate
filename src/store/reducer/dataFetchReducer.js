import * as ACTION_TYPE from '../action/actionType';

export const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false
            };
        case ACTION_TYPE.INIT:
            return {
                ...state,
                isError: false,
                isLoading: true
            };
        case ACTION_TYPE.SUCCESS:
            if (action.append) {
                if (Object.keys(state.data).length > 0) {
                    action.payload.data.unshift(...state.data.data);
                }
            }

            return {
                ...state,
                data: action.payload,
                isError: false,
                isLoading: false
            };
        default:
            throw new Error();
    }
};
