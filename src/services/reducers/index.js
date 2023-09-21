import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';
import { constructorReducer } from './constructor-reducer';
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    constructor: constructorReducer,
    auth: authReducer
});