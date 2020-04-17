import * as ACTION_TYPE from '../action/actionType';

export const ecommerceReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TO_CART:
            return {
                ...state,
                data: action.payload.cartItems,
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
        case ACTION_TYPE.REMOVE_FROM_CART:
            return {
                ...state,
                data: state.filter((item) => item.id !== action.payload.id),
                isError: false,
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
