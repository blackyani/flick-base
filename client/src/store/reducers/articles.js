import {
    GET_ARTICLES,
    GET_ARTICLE,
    CLEAR_ARTICLE,
    GET_ADMIN_ARTICLES,
    GET_ADMIN_ARTICLE,
    CLEAR_ADMIN_ARTICLE
} from '../types';

export default function articles (state = {}, {type, payload}) {
    switch (type) {
        case GET_ARTICLES:
            return {...state, articles: payload}
        case GET_ARTICLE:
            return {...state, article: payload}
        case CLEAR_ARTICLE:
            return {...state, article: null}
        case CLEAR_ADMIN_ARTICLE:
            return {...state, adminArticle: null}
        case GET_ADMIN_ARTICLES:
            return {...state, adminArticles: payload}
        case GET_ADMIN_ARTICLE:
            return {...state, adminArticle: payload}
        default:
            return state;
    }

}