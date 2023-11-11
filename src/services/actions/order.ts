import {getOrderInfoData, postOrder} from '../../utils/burger-api';

import {
    GET_ORDER_REQUEST,
    GET_ORDER_ERROR,
    GET_ORDER_SUCCESS,
    CLOSE_MODAL_ORDER_DETAILS,
    GET_ORDER_INFO_REQUEST,
    GET_ORDER_INFO_ERROR,
    GET_ORDER_INFO_SUCCESS,
    RESET_CONSTRUCTOR
} from "../constants";
import {AppDispatch} from "../types";
import {TOrder, TOrderNumber} from "../../utils/types";

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: TOrderNumber;
}

export interface IGetOrderError {
    readonly type: typeof GET_ORDER_ERROR;
}

export interface ICloseModalOrderDetails {
    readonly type: typeof CLOSE_MODAL_ORDER_DETAILS;
}

export interface IGetOrderInfoRequest {
    readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccess {
    readonly type: typeof GET_ORDER_INFO_SUCCESS;
    readonly payload: TOrder;
}

export interface IGetOrderInfoError {
    readonly type: typeof GET_ORDER_INFO_ERROR;
}

export type TOrderActions = IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderError
    | ICloseModalOrderDetails
    | IGetOrderInfoRequest
    | IGetOrderInfoSuccess
    | IGetOrderInfoError;

export const getOrderNumber = (data: string[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        postOrder(data)
            .then(res => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: res.order.number
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
            })
    }
}

export const closeModalOrderDetails = (): ICloseModalOrderDetails => {
    return {
        type: CLOSE_MODAL_ORDER_DETAILS
    }
}

export const getOrderInfo = (order: string | undefined) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_INFO_REQUEST
        });
       getOrderInfoData(order)
            .then(res => {
                dispatch({
                    type: GET_ORDER_INFO_SUCCESS,
                    payload: res.orders[0]
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_ORDER_INFO_ERROR
                });
            })
    }
}