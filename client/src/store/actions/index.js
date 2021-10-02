import {
    GET_ARTICLES,
    GET_ARTICLE,
    SET_NOTIFICATION,
    AUTH,
    SIGN_OUT,
    SITE_LAYOUT,
    CLEAR_ARTICLE,
    LOADING
} from '../types';

// articles
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
});

export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
});

export const clearArticle = () => ({
    type: CLEAR_ARTICLE,
});

// notifications
export const notificationShow = (notificationType, msg) => ({
    type: SET_NOTIFICATION,
    payload: {msg, type: notificationType}
});

// auth
export const auth = (user) => ({
    type: AUTH,
    payload: user
});

export const signOut = () => ({
    type: SIGN_OUT,
});

// site
export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout,
})

export const loading = (status) => ({
    type: LOADING,
    payload: status
})