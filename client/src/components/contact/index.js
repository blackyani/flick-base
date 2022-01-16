import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { errorHelper } from '../../utils/tools'

import { TextField, Button } from '@material-ui/core'
import {sendEmail} from '../../store/actions/user-actions';

const Contact = () => {
    const dispatch = useDispatch();

    const formik =  useFormik({
        initialValues:{ email:'',firstname:'',lastname:'',message:''},
        validationSchema: Yup.object({
            email:Yup.string()
                .required('Sorry this email is required')
                .email('This is not a valid email'),
            firstname:Yup.string()
                .required('Sorry this firstname is required'),
            lastname:Yup.string()
                .required('Sorry this lastname is required'),
            message:Yup.string()
                .required('Sorry you need to say something')
                .max(500,'Sorry, the message is too long')
        }),
        onSubmit: (values, {resetForm})=>{
            dispatch(sendEmail(values)).then(() => {
                resetForm()
            });
        }
    })

    return(
        <>
            <h1>Contact us</h1>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="email"
                        label="Enter your email"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="firstname"
                        label="Enter your firstname"
                        variant="outlined"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik,'firstname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="lastname"
                        label="Enter your lastname"
                        variant="outlined"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik,'lastname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="message"
                        label="Add your message here"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...formik.getFieldProps('message')}
                        {...errorHelper(formik,'message')}
                    />
                </div>

                <Button className="mt-2" variant="contained" color="primary" type="submit">
                    Send us a message
                </Button>


            </form>

        </>
    )


}

export default Contact;