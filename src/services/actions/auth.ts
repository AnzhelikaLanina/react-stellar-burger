import {
    registerUser,
    loginProfile,
    logoutProfile,
    getDataUser,
    updateDataUser,
    forgotPasswordUser,
    resetPasswordUser
} from '../../utils/auth-api';


import {AppDispatch} from "../types";

import {
    GET_USER_ERROR,
    SET_AUTH_CHECKED,
    SET_USER,
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_SUCCESS,
    UPDATE_DATA_USER_REQUEST,
    UPDATE_DATA_USER_ERROR,
    UPDATE_DATA_USER_SUCCESS
} from "../constants";
import {TForm, TUser} from "../../utils/types";

export interface IGetUserError {
    readonly type: typeof GET_USER_ERROR;
}

export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: TUser | null;
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginError {
    readonly type: typeof LOGIN_ERROR;
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: TUser;
}

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutError {
    readonly type: typeof LOGOUT_ERROR;
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterError {
    readonly type: typeof REGISTER_ERROR;
}

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: TUser;
}

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordError {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordError {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IUpdateDataUserRequest {
    readonly type: typeof UPDATE_DATA_USER_REQUEST;
}

export interface IUpdateDataUserError {
    readonly type: typeof UPDATE_DATA_USER_ERROR;
}

export interface IUpdateDataUserSuccess {
    readonly type: typeof UPDATE_DATA_USER_SUCCESS;
    readonly payload: TUser;
}

export type TAuthActions = IGetUserError
    | ISetAuthChecked
    | ISetUser
    | ILoginRequest
    | ILoginError
    | ILoginSuccess
    | ILogoutRequest
    | ILogoutError
    | ILogoutSuccess
    | IRegisterRequest
    | IRegisterError
    | IRegisterSuccess
    | IForgotPasswordRequest
    | IForgotPasswordError
    | IForgotPasswordSuccess
    | IResetPasswordRequest
    | IResetPasswordError
    | IResetPasswordSuccess
    | IUpdateDataUserRequest
    | IUpdateDataUserError
    | IUpdateDataUserSuccess;

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user: TUser | null): ISetUser => ({
    type: SET_USER,
    payload: user,
});

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return getDataUser()
            .then(res => {
                dispatch(setUser(res.user));
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_ERROR
                });
            });
    };
}

export const login = (data: TForm) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        loginProfile(data)
            .then(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch(setUser(res.user));
                dispatch(setAuthChecked(true));
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_ERROR
                });
            });
    };
}

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const logout = (data: string | null) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logoutProfile(data)
            .then(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({
                    type: LOGOUT_SUCCESS
                });
                dispatch(setUser(null));
            })
            .catch(() => {
                dispatch({
                    type: LOGOUT_ERROR
                });
            });
    };
}

export const register = (data: TForm) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        registerUser(data)
            .then(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.user
                });
                dispatch(setAuthChecked(true));
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_ERROR
                });
            });
    };
}

export const updateUser = (data: TForm) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_DATA_USER_REQUEST
        });
        updateDataUser(data)
            .then(res => {
                dispatch({
                    type: UPDATE_DATA_USER_SUCCESS,
                    payload: res.user
                });
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_DATA_USER_ERROR
                });
            });
    };
}

export const forgotPassword = (data: TForm) =>{
    return function(dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        forgotPasswordUser(data)
            .then(() => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR
                });
            });
    };
}

export const resetPassword = (data: TForm) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        resetPasswordUser(data)
            .then(() => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                });
            });
    };
}

