import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { notificationShow } from "../store/actions";

const AuthGuard = (ComposedComponent, roleCheck = false) => {
    const AuthenticationCheck = (props) => {
        const isAuth = useSelector((state) => state.users.auth);
        const role = useSelector((state) => state.users.data.role);
        const dispatch = useDispatch();
        useEffect(() => {
            if (!isAuth) {
                props.history.push('/');
                dispatch(notificationShow('error', 'You are not authenticated!'));
            } else {
                if (roleCheck && role !== 'admin') {
                    props.history.push('/');
                    dispatch(notificationShow('error', 'You are not allowed to follow this link!'));
                }
            }
        }, [props, isAuth])

        return !isAuth ? <div className="main_loader">Loading</div> : <ComposedComponent {...props}/>
    }

    return AuthenticationCheck;
};

export default AuthGuard;