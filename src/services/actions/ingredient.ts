import {getIngredientsData} from '../../utils/burger-api';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_SUCCESS,
    OPEN_MODAL_INGREDIENT_DETAILS,
    CLOSE_MODAL_INGREDIENT_DETAILS
} from "../constants";
import {AppDispatch} from "../types";
import {TIngredient} from "../../utils/types";

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export interface IGetIngredientsError {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IOpenModalIngredientDetails {
    readonly type: typeof OPEN_MODAL_INGREDIENT_DETAILS;
    readonly ingredientSelected: TIngredient;
}

export interface ICloseModalIngredientDetails {
    readonly type: typeof CLOSE_MODAL_INGREDIENT_DETAILS;
}

export type TIngredientsActions = IGetIngredientsRequest
    | IGetIngredientsError
    | IGetIngredientsSuccess
    | IOpenModalIngredientDetails
    | ICloseModalIngredientDetails;

export const getIngredients = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsData()
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                });
            })
    }
}

export const openModalIngredientDetails = (ingredientSelected: TIngredient): IOpenModalIngredientDetails => {
    return {
        type: OPEN_MODAL_INGREDIENT_DETAILS,
        ingredientSelected
    }
}

export const closeModalIngredientDetails = (): ICloseModalIngredientDetails => {
    return {
        type: CLOSE_MODAL_INGREDIENT_DETAILS
    }
}