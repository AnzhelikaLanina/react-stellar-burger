import { checkResponse } from "./utils";
import { NORMA_API } from "./constants";

export const registerUser = (data) => {
    return fetch(`${NORMA_API}/auth/register`, {
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
        .then((res) => checkResponse(res));
}

export const loginProfile = (data) => {
    return fetch(`${NORMA_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
    })
        .then((res) => checkResponse(res));
}

export const logoutProfile = (data) => {
    return fetch(`${NORMA_API}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: data
        }),
    })
        .then((res) => checkResponse(res));
}

export const refreshToken = () => {
    return fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then((res) => checkResponse(res));
};

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
        .then((res) => checkResponse(res));
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
        .then((res) => checkResponse(res));
}

export const forgotPasswordUser = (data) => {
    return fetch(`${NORMA_API}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            email: data.email
        } ),
    })
        .then((res) => checkResponse(res));
}

export const resetPasswordUser = (data) => {
    return fetch(`${NORMA_API}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            password: data.password,
            token: data.token
        } ),
    })
        .then((res) => checkResponse(res));
}
