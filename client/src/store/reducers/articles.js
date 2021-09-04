import {GET_ARTICLES} from '../types';

export default function articles (state = {}, {type, payload}) {
    switch (type) {
        case GET_ARTICLES:
            return {...state, articles: payload}
        default:
            return state;
    }

}