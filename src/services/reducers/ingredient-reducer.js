import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    OPEN_MODAL_INGREDIENT_DETAILS,
    CLOSE_MODAL_INGREDIENT_DETAILS
} from '../actions/ingredient';

const ingredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
    ingredientSelected: null
};

export const ingredientReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsError: false
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: true
            };
        }
        case OPEN_MODAL_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientSelected: action.ingredientSelected
            };
        }
        case CLOSE_MODAL_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientSelected: null
            };
        }
        default: {
            return state;
        }
    }
};