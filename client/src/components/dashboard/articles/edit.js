import React, { useState, useEffect, useRef } from 'react';
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../hoc/admin-layout";
import {initialValues, validationSchema, statusList} from './validation-shema';
import {errorHelper} from '../../../utils/tools';
import WYSIWYG from "../../../utils/form/wysiwyg";
import {clearAdminArticle, editArticle, getAdminArticle, postArticle} from "../../../store/actions/article";


import {
    TextField,
    Button,
    Divider,
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const EditArticle = (props) => {
    const dispatch = useDispatch();
    const article = useSelector((state) => state.articles.adminArticle);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: article ? article: initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(editArticle(values, props.match.params.id)).then(() => {
                props.history.push('/dashboard/articles');
            })
        }
    });

    const actorsValue = useRef('');

    const handleEditorState = value => {
        formik.setFieldValue('content', value);
    }

    const actorsAddHandler = (arrayHelpers) => {
        if (actorsValue.current.value) {
            arrayHelpers.push(actorsValue.current.value);
            actorsValue.current.value = '';
        }
    }

    const actorsRemoveHandler = (arrayHelpers, index) => {
        arrayHelpers.remove(index)
    }

    useEffect(() => {
        dispatch(getAdminArticle(props.match.params.id));
        if (article?.content) {
            formik.setFieldValue('content', article.content);
        }
    }, [dispatch, props.match.params]);

    useEffect(() => {
        return () => {
            dispatch(clearAdminArticle())
        }
    }, [dispatch]);

    const errorRender = (field) => (!!(formik.errors[field] && formik.touched[field]) ?
        <FormHelperText error={true}>{formik.errors[field]}</FormHelperText> : null)

    return (
        <AdminLayout section="Edit Article">
            <form className="article_form mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        className="w-100"
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}
                    />

                    <TextField
                        className="w-100 mt-3"
                        name="excerpt"
                        label="Enter an excerpt"
                        variant="outlined"
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik, 'excerpt')}
                        multiline
                        rows={3}
                    />

                    <TextField
                        className="w-100 mt-3"
                        name="score"
                        label="Enter a score"
                        variant="outlined"
                        type="number"
                        {...formik.getFieldProps('score')}
                        {...errorHelper(formik, 'score')}
                    />

                    <FormikProvider value={formik}>
                        <h5>Add the actors</h5>
                        <FieldArray
                            name="actors"
                            render={
                                arrayHelpers => (
                                    <>
                                        <Paper className="actors_form">
                                            <InputBase
                                                inputRef={actorsValue}
                                                className="input"
                                                placeholder="Add actor name here"
                                            />
                                            <IconButton>
                                                <AddIcon onClick={() => actorsAddHandler(arrayHelpers)} />
                                            </IconButton>
                                        </Paper>
                                        {errorRender('actors')}
                                        <div className="chip_container">
                                            {formik.values.actors.map((actor, index) => (
                                                <Chip
                                                    key={actor}
                                                    label={actor}
                                                    color="primary"
                                                    onDelete={() => actorsRemoveHandler(arrayHelpers, index)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                        />
                    </FormikProvider>

                    <TextField
                        className="w-100 mt-3"
                        name="director"
                        label="Enter a director"
                        variant="outlined"
                        {...formik.getFieldProps('director')}
                        {...errorHelper(formik, 'director')}
                    />

                    <FormControl variant="outlined">
                        <h5>Select status</h5>
                        <Select
                            name="status"
                            {...formik.getFieldProps('status')}
                            error={!!(formik.errors.status && formik.touched.status)}
                        >
                            {statusList.map(status =>
                                <MenuItem value={status.value} key={`menu-${status.value}`}>
                                    <em>{status.label}</em>
                                </MenuItem>)
                            }
                        </Select>
                        {errorRender('status')}
                    </FormControl>

                    <WYSIWYG handleEditorState={handleEditorState} editContent={article?.content} />
                    {errorRender('content')}
                </div>

                <Divider className="mt-3 mb-3" />
                <Button variant="contained" color="primary" type="submit">Edit article</Button>
            </form>
        </AdminLayout>
    );
};

export default EditArticle;