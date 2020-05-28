import * as ACTION_TYPE from '../action/actionType';

export const ecommerceReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.CHANGE_PAYMENT:
            return {
                ...state,
                data: { data: { ...state.data.data, forma_pagamento: action.payload } },
                isError: false,
                isLoading: false
            };
        case ACTION_TYPE.CHANGE_PAYMENT_TYPE:
            return {
                ...state,
                data: { data: { ...state.data.data, forma_pagamento_tipo: action.payload } },
                isError: false,
                isLoading: false
            };
        case ACTION_TYPE.FAILURE:
            return {
                ...state,
                data: action.payload,
                isError: true,
                isLoading: false
            };
        case ACTION_TYPE.SUCCESS:
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
