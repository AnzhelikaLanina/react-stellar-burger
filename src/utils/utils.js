import {NORMA_API} from "./constants";

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options) => {
    return fetch(`${NORMA_API}${endpoint}`, options).then(checkResponse)
}

export const getTimeZone = (date) => {
    if (new Date(date).getTimezoneOffset() < 0) {
        return "i-GMT+" + (new Date(date).getTimezoneOffset() / -60);
    } else {
        return "i-GMT-" + (new Date(date).getTimezoneOffset() / -60);
    }
};

export const getStatus = (status) => {
    if (status === 'done') {
        return 'Выполнен';
    } else if (status === 'created') {
        return 'Создан';
    } else if (status === 'pending') {
        return 'Готовится';
    } else {
        return 'Отменен'
    }
};