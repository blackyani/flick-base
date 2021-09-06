import {AUTH} from "../types";

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
        default:
            return state;
    }

}