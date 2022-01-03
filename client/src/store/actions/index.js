import {
    GET_ARTICLES,
    GET_ARTICLE,
    SET_NOTIFICATION,
    AUTH,
    SIGN_OUT,
    SITE_LAYOUT,
    CLEAR_ARTICLE,
    CLEAR_ADMIN_ARTICLE,
    LOADING,
    GET_ADMIN_ARTICLES,
    UPDATE_ADMIN_ARTICLE,
    GET_ADMIN_ARTICLE,
    UPDATE_EMAIL,
    UPDATE_PROFILE
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

export const clearAdminArticle = () => ({
    type: CLEAR_ADMIN_ARTICLE,
});

export const getAdminArticles = (articles) => ({
   type: GET_ADMIN_ARTICLES,
   payload: articles
});

export const getAdminArticle = (article) => ({
    type: GET_ADMIN_ARTICLE,
    payload: article
});

export const updateAdminArticle = (article) => {
    return {
        type: UPDATE_ADMIN_ARTICLE,
        payload: article
    }
}

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

export const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    payload: email,
})

export const updateProfile = (payload) => ({
    type: UPDATE_PROFILE,
    payload,
})

// site
export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout,
})

export const loading = (status) => ({
    type: LOADING,
    payload: status
})