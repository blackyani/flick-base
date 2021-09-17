import { toast } from 'react-toastify';
import cookie from 'react-cookies';

export const showToast = (type, msg, position = 'top-right') => {
    return toast[type](msg, {position});
}

export const errorHelper = (formik, field) => ({
    error:  !!(formik.errors[field] && formik.touched[field]),
    helperText: formik.errors[field] && formik.touched[field] ?  formik.errors[field] : null
});

export const getTokenCookie = cookie.load('x-access-token');
export const removeTokenCookie = () => getTokenCookie && cookie.remove('x-access-token');
export const getAuthHeader = getTokenCookie ? { headers: {
   'x-access-token': getTokenCookie
}} : null;