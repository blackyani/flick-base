import * as articles from "./";
import axios from "axios";
axios.defaults.headers.post['Content-type'] = 'application/json';

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