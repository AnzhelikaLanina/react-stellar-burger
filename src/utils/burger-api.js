import {NORMA_API} from "./constants";
import {checkResponse} from "./utils";

export const getIngredientsData = () => {
    return fetch(`${NORMA_API}/ingredients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => checkResponse(res));
}

export const postOrder = (data) => {
    return fetch(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients: data }),
    })
        .then((res) => checkResponse(res));
}