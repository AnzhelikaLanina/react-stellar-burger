import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    CLOSE_MODAL_ORDER_DETAILS
} from '../actions/order';

const orderInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderError: false
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderError: false
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false
            };
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true
            };
        }
        case CLOSE_MODAL_ORDER_DETAILS: {
            return {
                ...state,
                orderNumber: null
            };
        }
        default: {
            return state;
        }
    }
};