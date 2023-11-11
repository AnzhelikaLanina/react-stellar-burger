import {
    ADD_INGREDIENT_CONSTRUCTOR,
    RESET_CONSTRUCTOR,
    REMOVE_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR
} from "../constants";
import {TIngredient} from "../../utils/types";


export interface IAddIngredientConstructor {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
    readonly item: TIngredient;
}

export interface IRemoveIngredientConstructor {
    readonly type: typeof REMOVE_INGREDIENT_CONSTRUCTOR;
    readonly uuid: string;
}

export interface IResetConstructor {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IMoveIngredientConstructor {
    readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export type TConstructorActions = IAddIngredientConstructor
    | IRemoveIngredientConstructor
    | IResetConstructor
    | IMoveIngredientConstructor;

export function addIngredient(item: TIngredient, uuid: string): IAddIngredientConstructor {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        item: {...item, uuid: uuid}
    };
}

export function removeIngredient(uuid: string): IRemoveIngredientConstructor {
    return {
        type: REMOVE_INGREDIENT_CONSTRUCTOR,
        uuid
    };
}

export function moveIngredient(dragIndex: number, hoverIndex: number): IMoveIngredientConstructor {
    return {
        type: MOVE_INGREDIENT_CONSTRUCTOR,
        dragIndex,
        hoverIndex
    };
}