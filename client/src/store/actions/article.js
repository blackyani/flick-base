import * as articles from "./";
import axios from "axios";
import * as users from "./index";

export const getArticles = (params) => {
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

export const clearArticle = () => {
    return async (dispatch, getState) =>  {
        dispatch(articles.clearArticle())
    }
}