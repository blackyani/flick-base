import * as users from './index';
import axios from 'axios';

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
}