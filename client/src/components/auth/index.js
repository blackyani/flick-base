import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import {
    TextField, Button, InputAdornment
} from '@material-ui/core';
import {errorHelper} from '../../utils/tools'
import {loginUser, registerUser} from "../../store/actions/user-actions";

const Auth = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email is not valid'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values);
            // resetForm();
        }
    });

    const isRegister = () => (props.location.pathname.includes('register'));

    const handleSubmit = (values) => {
        if (isRegister()) {
            dispatch(registerUser(values));
        } else {
            dispatch(loginUser(values));
        }
    }

    return (
        <div className="auth_container">
            <h1>Sign { isRegister() ? 'Up' : 'In'}</h1>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        className="w-100 mb-4"
                        name="email"
                        label="Enter your email"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik, 'email')}
                    />

                    <TextField
                        className="w-100 mb-4"
                        name="password"
                        label="Enter your password"
                        type="password"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik, 'password')}
                    />

                    <Button variant="contained" color="primary" type="submit">
                        {
                            isRegister() ? 'Register' : 'Login'
                        }
                    </Button>

                    <RouterLink to={isRegister() ? '/login' : '/register'}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className="mt-3"
                            size="small"
                        >
                            Want to
                            {
                                !isRegister() ? ' Register' : ' Login'
                            } ?
                        </Button>
                    </RouterLink>
                </div>
            </form>
        </div>
    );
};

export default Auth;