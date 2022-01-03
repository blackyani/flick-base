import React, { useEffect } from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
    TextField,
    Divider,
    Button,
    Box
} from '@material-ui/core'
import {changeProfile} from "../../../store/actions/user-actions";

const PersonalInfo = () => {
    const { firstname, lastname, age } = useSelector((state => state.users.data));
    const dispatch = useDispatch();
    let initialValues = {firstname: '', lastname: '', age: ''}
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            dispatch(changeProfile(values))
        }
    });

    useEffect(() => {
        console.log(firstname, lastname, age);
        initialValues = {
            firstname, lastname, age
        }
    }, [])

    return (
        <div className="form-group w-25">
            <Box display='flex' flexDirection="column">
                <TextField
                    name="firstname"
                    value={'test'}
                    label="Enter your first name"
                />
                {
                    formik.values.firstname && !formik.errors.firstname
                }


                <TextField
                    name="lastname" label="Enter your last name"
                    value={lastname}
                />
                {
                    formik.values.lastname && !formik.errors.lastname
                }

                <TextField
                    name="age" label="Enter your age"
                    value={age}
                />
                {
                    formik.values.age && !formik.errors.age
                }
                <Divider />
                <Button className="mt-3" style={{marginLeft: '20px'}}
                        variant="contained" color="primary"
                        onClick={() => { formik.submitForm() }}
                >
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default PersonalInfo;