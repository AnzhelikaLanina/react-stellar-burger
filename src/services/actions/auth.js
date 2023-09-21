import {
    registerUser,
    loginProfile,
    logoutProfile,
    getDataUser,
    updateDataUser,
    forgotPasswordUser,
    resetPasswordUser
} from '../../utils/auth-api';

export const GET_USER_ERROR = 'GET_USER_ERROR';
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const UPDATE_DATA_USER_REQUEST = 'UPDATE_DATA_USER_REQUEST';
export const UPDATE_DATA_USER_ERROR = 'UPDATE_DATA_USER_ERROR';
export const UPDATE_DATA_USER_SUCCESS = 'UPDATE_DATA_USER_SUCCESS';

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const getUser = () => {
    return (dispatch) => {
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

export const login = (data) => {
    return function(dispatch) {
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
    return (dispatch) => {
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

export const logout = (data) => {
    return function(dispatch) {
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

export const register = (data) => {
    return function(dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });
        registerUser(data)
            .then(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: REGISTER_SUCCESS,
                    data: res.user
                });
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_ERROR
                });
            });
    };
}

export const updateUser = (data) => {
    return function(dispatch) {
        dispatch({
            type: UPDATE_DATA_USER_REQUEST
        });
        updateDataUser(data)
            .then(res => {
                dispatch({
                    type: UPDATE_DATA_USER_SUCCESS,
                    data: res.user
                });
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_DATA_USER_ERROR
                });
            });
    };
}

export const forgotPassword = (data) =>{
    return function(dispatch) {
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

export const resetPassword = (data) => {
    return function(dispatch) {
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

