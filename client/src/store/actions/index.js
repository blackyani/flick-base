import {GET_ARTICLES, SET_NOTIFICATION, AUTH, SIGN_OUT, SITE_LAYOUT} from '../types';

// articles
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
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