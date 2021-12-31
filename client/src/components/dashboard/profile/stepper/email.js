import React, {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { errorHelper } from '../../../../utils/tools';
import { changeEmail } from '../../../../store/actions/user-actions';

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from "@material-ui/core";

const EmailStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Enter old email', 'Enter new email', 'Are you sure?'];
    const dispatch = useDispatch();
    const emailValidation = Yup.string().required('This is required').email('This is not valid email');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {email: '', newEmail: ''},
        validationSchema: Yup.object({
            email: emailValidation,
            newEmail: emailValidation,
        }),
        onSubmit: ({newEmail}, {resetForm}) => {
            dispatch(changeEmail({email: newEmail})).then(() => {
                resetForm();
            })
        }
    });

    const nextBtn = () => (
        <Button className="mt-3" variant="contained" color="primary" onClick={() => { setActiveStep(activeStep + 1) }}>
            Next
        </Button>
    )

    const prevBtn = () => (
        <Button className="mt-3" variant="contained" color="primary" onClick={() => { setActiveStep(activeStep - 1) }}>
            Back
        </Button>
    )

    const activeStepLayout = {
        0: <div className="form-group">
            <TextField
                className="w-100" name="email"
                label="Enter your email" variant="outlined"
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
            />
            {
                formik.values.email && !formik.errors.email && nextBtn()
            }
        </div>,
        1: <div className="form-group">
            <TextField
                className="w-100" style={{marginRight: '20px'}}
                name="newEmail" label="Enter new email"
                variant="outlined"
                {...formik.getFieldProps('newEmail')}
                {...errorHelper(formik, 'newEmail')}
            />
            {
                prevBtn()
            }
            {
                formik.values.newEmail && !formik.errors.newEmail && nextBtn()
            }
        </div>,
        2: <>
            {
                prevBtn()
            }
            <Button className="mt-3" style={{marginLeft: '20px'}}
                    variant="contained" color="primary"
                    onClick={() => { formik.submitForm() }}
            >
                Submit
            </Button>
        </>,
    }

    return (
        <>
            <Stepper activeStep={activeStep}>
                {
                    steps.map(step => (
                        <Step key={step}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                {activeStepLayout[activeStep]}
            </form>
        </>
    );
};

export default EmailStepper;