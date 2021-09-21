import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {notificationShow} from "../store/actions";

const PreventAuthRoute = (ComposedComponent) => {
    const AuthenticationCheck = (props) => {
        const isAuth = useSelector((state) => state.users.auth);
        const dispatch = useDispatch();

        useEffect(() => {
            if (isAuth) {
                props.history.push('/');
                dispatch(notificationShow('error', 'You are already authenticated!'));
            }
        }, [props, isAuth])

        return isAuth ? null : <ComposedComponent {...props}/>
    }

    return AuthenticationCheck;
};

export default PreventAuthRoute;