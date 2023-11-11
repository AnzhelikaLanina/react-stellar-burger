import {NORMA_API} from "./constants";
import {TOptions} from "./types";

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint: string, options?: TOptions) => {
    return fetch(`${NORMA_API}${endpoint}`, options).then(checkResponse)
}

export const getTimeZone = (date: string) => {
    if (new Date(date).getTimezoneOffset() < 0) {
        return "i-GMT+" + (new Date(date).getTimezoneOffset() / -60);
    } else {
        return "i-GMT-" + (new Date(date).getTimezoneOffset() / -60);
    }
};

export const getStatus = (status: string) => {
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