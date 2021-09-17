import {AUTH, SIGN_OUT} from "../types";

const defaultState = {
    data: {
        _id: null,
        email: null,
        role: null,
        firstname: null,
        lastname: null,
        age: null,
    },
    auth: false
}

export default function users (state = defaultState, {type, payload}) {
    switch (type) {
        case AUTH:
            return {...state, data: {...state.data, ...payload.data}, auth: payload.auth}
        case SIGN_OUT:
            return {...state, data: defaultState.data, auth: false}
        default:
            return state;
    }

}