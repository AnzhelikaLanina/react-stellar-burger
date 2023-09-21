import {getIngredientsData} from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const OPEN_MODAL_INGREDIENT_DETAILS = 'OPEN_MODAL_INGREDIENT_DETAILS';
export const CLOSE_MODAL_INGREDIENT_DETAILS = 'CLOSE_MODAL_INGREDIENT_DETAILS';

export const getIngredients = () => {
    return function (dispatch) {
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

export const openModalIngredientDetails = (ingredientSelected) => {
    return {
        type: OPEN_MODAL_INGREDIENT_DETAILS,
        ingredientSelected
    }
}

export const closeModalIngredientDetails = () => {
    return {
        type: CLOSE_MODAL_INGREDIENT_DETAILS
    }
}