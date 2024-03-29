import {checkResponse, request} from "./utils";
import { NORMA_API } from "./constants";

export const registerUser = (data) => request('/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name
        }),
    })

export const loginProfile = (data) => request('/auth/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
    })

export const logoutProfile = (data) => request('/auth/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: data
        }),
    })

export const refreshToken = () => request('/auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getDataUser = () => {
    return fetchWithRefresh(`${NORMA_API}/auth/user`, {
        method: "GET",
        headers: {
            authorization: localStorage.getItem('accessToken'),
            "Content-Type": "application/json",
        },
    })
}

export const updateDataUser = (data) => {
    return fetchWithRefresh(`${NORMA_API}/auth/user`, {
        method: "PATCH",
        headers: {
            authorization: localStorage.getItem('accessToken'),
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            name: data.name,
            email: data.email,
            password: data.password
        } ),
    })
}

export const forgotPasswordUser = (data) => request('/password-reset', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            email: data.email
        } ),
    })

export const resetPasswordUser = (data) => request('/password-reset/reset', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            password: data.password,
            token: data.token
        } ),
    })
