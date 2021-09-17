import {SITE_LAYOUT} from '../types';


export default function site (state = {}, {type, payload}) {
    switch (type) {
        case SITE_LAYOUT:
            return { ...state, layout:  payload}
        default:
            return state;
    }

}