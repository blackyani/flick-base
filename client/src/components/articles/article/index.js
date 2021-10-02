import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getArticle, clearArticle} from "../../../store/actions/article";
import ScoreCard from "../../../utils/score-card";

const Article = (props) => {
    const dispatch = useDispatch();
    const article = useSelector((state) => state.articles.article)

    useEffect(() => {
        dispatch(getArticle(props.match.params.id))
    }, [dispatch, props.match.params]);

    useEffect(() => {
        return () => {
            dispatch(clearArticle())
        }
    }, [dispatch])

    return (
        <>
            {article ?
                <div className="article_container">
                    <div className="image">

                    </div>
                    <h1>{article.title}</h1>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={{__html: article.content}}>

                        </div>
                    </div>
                    <ScoreCard data={article} />
                </div>
                : null
            }
        </>
    );
};

export default Article;