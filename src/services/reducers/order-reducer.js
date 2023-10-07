import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    CLOSE_MODAL_ORDER_DETAILS,
    GET_ORDER_INFO_REQUEST,
    GET_ORDER_INFO_SUCCESS,
    GET_ORDER_INFO_ERROR
} from '../actions/order';

const orderInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderError: false,
    orderData: [],
    getOrderDataRequest: false,
    getOrderDataError: false,
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
        case GET_ORDER_INFO_REQUEST: {
            return {
                ...state,
                getOrderDataRequest: true
            };
        }
        case GET_ORDER_INFO_SUCCESS: {
            return {
                ...state,
                getOrderDataFailed: false,
                getOrderDataRequest: false,
                orderData: action.orderData
            };
        }
        case GET_ORDER_INFO_ERROR: {
            return {
                ...state,
                getOrderDataRequest: false,
                getOrderDataFailed: true
            };
        }
        default: {
            return state;
        }
    }
};