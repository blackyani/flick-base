import { toast } from 'react-toastify';

export const showToast = (type, msg, position = 'top-right') => {
    return toast[type](msg, {position});
}

export const errorHelper = (formik, field) => ({
    error:  !!(formik.errors[field] && formik.touched[field]),
    helperText: formik.errors[field] && formik.touched[field] ?  formik.errors[field] : null
});