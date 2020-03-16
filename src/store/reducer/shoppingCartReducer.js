import * as ACTION_TYPE from '../action/actionType';

export const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_TO_CART:
            return {
                ...state,
                data: action.payload
            };
        case ACTION_TYPE.FAILURE:
            return {
                ...state,
                data: action.payload
            };
        case ACTION_TYPE.REMOVE_FROM_CART:
            return {
                ...state,
                data: state.filter((item) => item.id !== action.payload.id)
            };
        case ACTION_TYPE.SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        default:
            throw new Error();
    }
};
