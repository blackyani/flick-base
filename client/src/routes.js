import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import fonts from "./settings/fonts";
import {CircularProgress, Box} from '@material-ui/core';

import Home from './components/home';
import Header from './components/navigation/header';
import Auth from './components/auth';
import MainLayout from "./hoc/main-layout";
import Dashboard from "./components/dashboard";
import {isAuthUser} from "./store/actions/user-actions";


const Routes = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.users.auth);
    const user = useSelector((state) => state.users);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(isAuthUser())
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        }
    }, [user]);

    return (
        <BrowserRouter>
            <Header/>
            <MainLayout>
                {
                    loading ? <Box display="flex" justifyContent="center"><CircularProgress /></Box> :
                        <Switch>
                            {!isAuth ? <Route path="/login" component={Auth} /> : null}
                            {!isAuth ? <Route path="/register" component={Auth} /> : null}
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/" component={Home} />
                        </Switch>
                }

            </MainLayout>


            <GoogleFontLoader
                fonts={fonts}
            />
        </BrowserRouter>
    )
}

export default Routes;
