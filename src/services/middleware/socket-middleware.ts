import { getUser } from "../actions/auth";
import {TProfileOrdersActions} from "../actions/profile-orders";
import {TOrderFeedActions} from "../actions/order-feed";
import {TFeedMiddleware, TProfileOrdersMiddleware} from "../types/middleware-types";
import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../types";

export const socketMiddleware = (wsActions: TFeedMiddleware | TProfileOrdersMiddleware): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TProfileOrdersActions | TOrderFeedActions ) => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
                dispatch({type: wsConnecting});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === "Invalid or missing token") {
                        dispatch(getUser())
                    } else {
                        dispatch({ type: onMessage, payload: parsedData });
                    }
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};