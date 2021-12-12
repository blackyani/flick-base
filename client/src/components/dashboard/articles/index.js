import React, {useEffect, useState} from 'react';
import AdminLayout from "../../../hoc/admin-layout";
import PaginationComponent from "../../navigation/paginate";
import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {getAdminArticles, removeArticleById, editStatusById} from '../../../store/actions/article';
import { defaultParams } from "../../../utils/tools";


import { useDispatch, useSelector } from 'react-redux';

const Articles = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [articleId, setArticleId] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = (id) => {
        setShowModal(true);
        setArticleId(id);
    };

    const dispatch = useDispatch();
    const articles = useSelector((state) => (state.articles.adminArticles))

    useEffect(() => {
        dispatch(getAdminArticles());
    }, []);

    const goToPage = (page) => {
        dispatch(getAdminArticles({...defaultParams, page}));
    }

    const removeArticle = () => {
        dispatch(removeArticleById(articleId));
        handleClose();
    }

    const editStatusArticle = (id, status, index) => {
        dispatch(editStatusById(id, status, index));
    }

    const editArticle = (id) => {
        props.history.push(`/dashboard/articles/edit/${id}`)
    }

    return (
        <AdminLayout section="Articles">
            <div className="articles_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="mr-2">
                        <LinkContainer to="articles/add">
                            <Button variant="secondary">Add article</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={()=> alert('search')}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Example"

                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>
            </div>
            <PaginationComponent
                articles={articles}
                goToPage={goToPage}
                removeArticle={handleShow}
                editArticle={editArticle}
                editStatusArticle={editStatusArticle}
            />

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={removeArticle}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default Articles;