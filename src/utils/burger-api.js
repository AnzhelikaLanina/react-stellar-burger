import {NORMA_API} from "./constants";
import {fetchWithRefresh} from "./auth-api";
import {request} from './utils';

export const getIngredientsData = () => request('/ingredients');

export const postOrder = (data) => {
    return fetchWithRefresh(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ ingredients: data }),
    })
}

export const getOrderInfoData = (order) => request(`/orders/${order}`);