import {SET_NOTIFICATION} from '../types';
import {showToast} from '../../utils/tools'
export default function notification (state = {}, {type, payload}) {
    switch (type) {
        case SET_NOTIFICATION:
            showToast(payload.type, payload.msg)
            return state;
        default:
            return state;
    }

}