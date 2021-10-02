import {GET_ARTICLES, GET_ARTICLE, CLEAR_ARTICLE} from '../types';

export default function articles (state = {}, {type, payload}) {
    switch (type) {
        case GET_ARTICLES:
            return {...state, articles: payload}
        case GET_ARTICLE:
            return {...state, article: payload}
        case CLEAR_ARTICLE:
            return {...state, article: null}
        default:
            return state;
    }

}