import * as site from './index';

export const appLayout = (layout) => {
    return (dispatch) => {
        dispatch(site.appLayout(layout));
    }
}

export const loading = (status) => {
    return (dispatch) => {
        dispatch(site.loading(status));
    }
}