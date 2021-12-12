import React from 'react';
import {Table, Pagination} from "react-bootstrap";
import Moment from 'react-moment';
import {CircularProgress} from '@material-ui/core';

const PaginationComponent = ({articles, goToPage, removeArticle, editArticle, editStatusArticle}) => {
    const toPage = (page) => {
        goToPage(page)
    }

    const removeItem = (id) => {
        removeArticle(id)
    }

    const editItem = (id) => {
        editArticle(id)
    }

    const editStatusItem = (item, index) => {
        const statusShift = {
          draft: 'public',
          public: 'draft',
        };
        editStatusArticle(item._id, statusShift[item.status], index)
    }

    return (
        <div>
            {
                articles?.docs ?
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            <tbody className="articles_table">
                            {
                                articles.docs.map((article, index) => (
                                    <tr key={article._id}>
                                        <td><Moment to={article.date} /></td>
                                        <td>{article.title}</td>
                                        <td>{article.score}</td>
                                        <td className="action_btn remove_btn" onClick={() => removeItem(article._id)}>
                                            Remove
                                        </td>
                                        <td className="action_btn edit_btn" onClick={() => editItem(article._id)}>
                                            Edit
                                        </td>
                                        <td className="action_btn status_btn" onClick={() =>  editStatusItem(article, index)}>
                                            {article.status}
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        <Pagination>
                            {
                                articles.hasPrevPage ?
                                <>
                                    <Pagination.First onClick={() => toPage(1)} />
                                    <Pagination.Prev onClick={() => toPage(articles.prevPage)} />
                                    <Pagination.Item>{articles.prevPage}</Pagination.Item>
                                </> : null
                            }
                            <Pagination.Item active={articles.page}/>
                            {
                                articles.hasNextPage ?
                                    <>
                                        <Pagination.Next onClick={() => toPage(articles.nextPage)} />
                                        <Pagination.Last onClick={() => toPage(articles.totalPages)} />
                                    </> : null
                            }
                        </Pagination>
                    </>

                    : <CircularProgress />
            }
        </div>
    );
};

export default PaginationComponent;