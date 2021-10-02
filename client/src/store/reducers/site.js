import {SITE_LAYOUT, LOADING} from '../types';


export default function site (state = {}, {type, payload}) {
    switch (type) {
        case SITE_LAYOUT:
            return { ...state, layout:  payload}
        case LOADING:
            return { ...state, loading:  payload}
        default:
            return state;
    }

}