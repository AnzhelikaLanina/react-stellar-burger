import {NORMA_API} from "./constants";
import {fetchWithRefresh} from "./auth-api";
import {request} from './utils';

export const getIngredientsData = () => request('/ingredients');

export const postOrder = (data: string[]) => {
    return fetchWithRefresh(`${NORMA_API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken') as string
        },
        body: JSON.stringify({ ingredients: data }),
    })
}

export const getOrderInfoData = (order: string | undefined) => request(`/orders/${order}`);