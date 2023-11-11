import { store } from "../store";
import {TAuthActions} from "../actions/auth";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TIngredientsActions} from "../actions/ingredient";
import {TProfileOrdersActions} from "../actions/profile-orders";
import {TOrderFeedActions} from "../actions/order-feed";
import {TOrderActions} from "../actions/order";
import {TConstructorActions} from "../actions/constructor";
import {ActionCreator} from "redux";

type TApplicationActions = TAuthActions
    | TIngredientsActions
    | TProfileOrdersActions
    | TOrderFeedActions
    | TOrderActions
    | TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, unknown, RootState, TApplicationActions>>;