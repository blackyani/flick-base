import React, { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from '@material-ui/core';
import ArticleCard from "../../utils/article-card";

import initialSort from "../../settings/load-more";
import {getArticles} from '../../store/actions/article';

const Home = () => {
    const {articles} = useSelector((state) => state.articles);
    const dispatch = useDispatch();

    const [sort, setSort] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialSort
    );

    useEffect(() => {
        if (!articles) {
            dispatch(
                getArticles(initialSort)
            )
        }
    }, [dispatch, articles]);

    const loadMoreHandler = () => {
        let skipCount = sort.skip + sort.limit;
        dispatch(getArticles({...sort, skip: skipCount}))
        setSort({skip: skipCount});
    }


    const articlesRender = articles && articles.length
        ? articles.map(article => (
        <Grid key={article._id} item xs={12} md={6} lg={3}>
            <ArticleCard article={article} />
        </Grid>))
        : <h1>There is no articles</h1>

    return (
        <div>
         <div>Carousel</div>
         <Grid container spacing={2} className="article_card">
             {articlesRender}
         </Grid>
        <Button variant="contained" className="mt-5 w-100" onClick={loadMoreHandler}>
            Load more
        </Button>
        </div>
    );
};

export default Home;