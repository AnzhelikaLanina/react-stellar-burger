import {
    WS_ORDER_CONNECT,
    WS_ORDER_DISCONNECT,
    WS_ORDER_CONNECTING,
    WS_ORDER_OPEN,
    WS_ORDER_CLOSE,
    WS_ORDER_MESSAGE,
    WS_ORDER_ERROR
} from "../constants";
import {TOrders} from "../../utils/types";


export interface IWsOrderConnect {
    readonly type: typeof WS_ORDER_CONNECT;
    readonly payload: string;
}

export interface IWsOrderDisconnect {
    readonly type: typeof WS_ORDER_DISCONNECT;
}

export interface IWsOrderConnecting {
    readonly type: typeof WS_ORDER_CONNECTING;
}

export interface IWsOrderOpen {
    readonly type: typeof WS_ORDER_OPEN;
}

export interface IWsOrderClose {
    readonly type: typeof WS_ORDER_CLOSE;
}

export interface IWsOrderMessage {
    readonly type: typeof WS_ORDER_MESSAGE;
    readonly payload: TOrders;
}

export interface IWsOrderError {
    readonly type: typeof WS_ORDER_ERROR;
    readonly payload: string;
}

export type TOrderFeedActions = IWsOrderConnect
    | IWsOrderDisconnect
    | IWsOrderConnecting
    | IWsOrderOpen
    | IWsOrderClose
    | IWsOrderMessage
    | IWsOrderError;

export const wsOrderConnect = (url: string): IWsOrderConnect => ({
    type: WS_ORDER_CONNECT,
    payload: url,
});

export const wsOrderDisconnect = (): IWsOrderDisconnect => ({
    type: WS_ORDER_DISCONNECT,
});