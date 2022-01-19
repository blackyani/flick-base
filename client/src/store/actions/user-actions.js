import * as users from './index';
import axios from 'axios';
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "../../utils/tools";
import { loading } from "./site";
import { BASE_URL } from "../../settings/urls";

export const registerUser = (params) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.post('/api/users/register', params).then(({data}) => {
            dispatch(users.auth({data, auth: true }));
            dispatch(users.notificationShow('success', 'Success! Check your email and validate account'));
            resolve(data);
        }).catch((error) => {
            const {message} = error.response.data;
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
}

export const loginUser = (params) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.post('api/users/sign-in', params).then(({data}) => {
            dispatch(users.auth({data, auth: true }));
            resolve(data)
        }).catch((error) => {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
};

export const isAuthUser = () => (dispatch) => {
    dispatch(loading(true));
    return new Promise(((resolve) => {
        if(!getTokenCookie) {
            throw new Error();
        }
        axios.get(`${BASE_URL}/users/is-auth`, getAuthHeader()).then(({data}) => {
            dispatch(users.auth({data, auth: true }));
            resolve(data)
        }).catch((error) => {
            dispatch(users.signOut());
            dispatch(users.notificationShow('error', error?.response?.data || error.message));
            removeTokenCookie()
        }).finally(() => {
            dispatch(loading(false));
        });
    }));
};

export const signOutUser = () => (dispatch) => {
    dispatch(users.signOut());
    removeTokenCookie();
}

export const changeEmail = (params) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.patch(`${BASE_URL}/users/update-email`, params, getAuthHeader()).then(({data}) => {
            dispatch(users.updateEmail(data));
            dispatch(users.notificationShow('success', 'Success! Email changed'));
            resolve(data)
        }).catch((error) => {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
};

export const changeProfile = (params) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.patch(`${BASE_URL}/users/profile`, params, getAuthHeader()).then(({data}) => {
            dispatch(users.updateProfile(data));
            dispatch(users.notificationShow('success', 'Success! Profile changed'));
            resolve(data)
        }).catch((error) => {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
};

export const sendEmail = (params) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.post(`${BASE_URL}/users/contact`, params, getAuthHeader()).then(({data}) => {
            dispatch(users.notificationShow('success', 'Success! We will contact with you'));
            resolve(data)
        }).catch((error) => {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
}

export const accountVerify = (token) => (dispatch) => {
    return new Promise(((resolve) => {
        axios.get(`${BASE_URL}/users/verify?validation=${token}`).then(({data}) => {
            dispatch(users.notificationShow('success', 'Your account is validated. You can now login!'));
            resolve(data)
        }).catch((error) => {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        });
    }));
}
