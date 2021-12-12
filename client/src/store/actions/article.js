import * as articles from "./";
import axios from "axios";
import * as users from "./index";
import { getAuthHeader, defaultParams } from "../../utils/tools";
import update from 'immutability-helper';

export const getArticles = (params = defaultParams) => {
    return async (dispatch, getState) =>  {
        try {
            // todo dont like .articles.articles remove in future
            const prevArticles = getState().articles.articles;
            const {data} = await axios.post('api/articles/load-more', params);
            let newArticles = [...data];

            if (prevArticles) {
                newArticles = [...prevArticles, ...data];
            }
            dispatch(articles.getArticles(newArticles));

        } catch (error) {
            dispatch(articles.notificationShow('error', error.message));
        }
    }
}

export const getArticle = (id) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.get(`/api/articles/get-article-by-id/${id}`);
            dispatch(articles.getArticle(data));
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const postArticle = (article) => {
    return async (dispatch, getState) =>  {
        try {
            await axios.post('/api/articles/admin/add-articles', article, getAuthHeader());
            dispatch(users.notificationShow('success', 'Article added'));
            dispatch(articles.getArticles());
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const getAdminArticles = (params = defaultParams) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.post('/api/articles/admin/paginate', params, getAuthHeader());
            dispatch(articles.getAdminArticles(data));
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const getAdminArticle = (id) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.get(`/api/articles/admin/${id}`, getAuthHeader());
            dispatch(articles.getAdminArticle(data));
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const clearAdminArticle = () => {
    return async (dispatch, getState) =>  {
        dispatch(articles.clearAdminArticle())
    }
}

export const clearArticle = () => {
    return async (dispatch, getState) =>  {
        dispatch(articles.clearArticle())
    }
}

export const removeArticleById = (id) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.delete(`/api/articles/admin/${id}`, getAuthHeader());
            dispatch(users.notificationShow('success', 'Article is deleted'));
            dispatch(articles.getAdminArticles(data));
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const editStatusById = (id, status, index) => {
    return async (dispatch, getState) =>  {
        try {
            const {data} = await axios.patch(`/api/articles/admin/${id}`, {status}, getAuthHeader());
            const state = getState();
            const newArticles = update(state.articles.adminArticles, {docs: {[index]: {$set: data}}});
            dispatch(articles.getAdminArticles(newArticles));
            dispatch(users.notificationShow('success', `Article status ${data.title} changed`));
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}

export const editArticle = (article, id) => {
    return async (dispatch, getState) =>  {
        try {
            await axios.patch(`/api/articles/admin/${id}`, article, getAuthHeader());
            dispatch(users.notificationShow('success', `Article ${article.title} updated`));
            dispatch(articles.getArticles());
        } catch (error) {
            const {message} = error.response.data
            dispatch(users.notificationShow('error', message || error.message));
        }
    }
}