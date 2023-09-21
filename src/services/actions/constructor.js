export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR = "MOVE_INGREDIENT_CONSTRUCTOR";

export function addIngredient(item, uuid) {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        item: {...item, uuid: uuid}
    };
}

export function removeIngredient(uuid) {
    return {
        type: REMOVE_INGREDIENT_CONSTRUCTOR,
        uuid
    };
}

export function moveIngredient(dragIndex, hoverIndex) {
    return {
        type: MOVE_INGREDIENT_CONSTRUCTOR,
        dragIndex,
        hoverIndex
    };
}