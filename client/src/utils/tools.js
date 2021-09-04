import { toast } from 'react-toastify';

export const showToast = (type, msg, position = 'top-right') => {
    return toast[type](msg, {position});
}