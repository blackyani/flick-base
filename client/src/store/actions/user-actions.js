import * as users from './index';
import axios from 'axios';
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "../../utils/tools";
import { loading } from "./site";
import {BASE_URL} from "../../settings/urls";

export const registerUser = (params) => async (dispatch) => {
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

export const loginUser = (params) => async (dispatch) => {
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

export const isAuthUser = () => async (dispatch) => {
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

export const signOutUser = () => async (dispatch) => {
    dispatch(users.signOut());
    removeTokenCookie();
}