import { toast } from 'react-toastify';
import cookie from 'react-cookies';

export const showToast = (type, msg, position = 'top-right') => {
    return toast[type](msg, {position});
}

export const errorHelper = (formik, field) => ({
    error:  !!(formik.errors[field] && formik.touched[field]),
    helperText: formik.errors[field] && formik.touched[field] ?  formik.errors[field] : null
});

export const defaultParams = {
    page: 1,
    limit: 10
}

export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token', {path:'/'});
export const getAuthHeader = () => {
    return { headers: { 'x-access-token': getTokenCookie() }}
}