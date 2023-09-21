import {postOrder} from '../../utils/burger-api';
import {RESET_CONSTRUCTOR} from './constructor';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const CLOSE_MODAL_ORDER_DETAILS = 'CLOSE_MODAL_ORDER_DETAILS';
export const getOrderNumber = (data) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        postOrder(data)
            .then(res => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderNumber: res.order.number
                });
                dispatch({
                    type: RESET_CONSTRUCTOR
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_ORDER_ERROR
                });
                dispatch({
                    type: RESET_CONSTRUCTOR
                });
            })
    }
}

export const closeModalOrderDetails = () => {
    return {
        type: CLOSE_MODAL_ORDER_DETAILS
    }
}