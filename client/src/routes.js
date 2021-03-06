import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import fonts from "./settings/fonts";
import {CircularProgress, Box} from '@material-ui/core';

import Home from './components/home';
import Header from './components/navigation/header';
import Auth from './components/auth';
import Verification from './components/auth/verification';
import MainLayout from "./hoc/main-layout";
import Dashboard from "./components/dashboard";
import Profile from "./components/dashboard/profile";
import Articles from "./components/dashboard/articles";
import Article from "./components/articles/article";
import AddArticle from "./components/dashboard/articles/add";
import EditArticle from "./components/dashboard/articles/edit";
import {isAuthUser} from "./store/actions/user-actions";
import AuthGuard from "./hoc/auth-guard";
import PreventAuthRoute from "./hoc/prevent-auth-route";
import Contact from "./components/contact";

const Routes = () => {
    const dispatch = useDispatch();
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
                            <Route path="/login" component={PreventAuthRoute(Auth)} /> : null}
                            <Route path="/register" component={PreventAuthRoute(Auth)} /> : null}
                            <Route path="/verification" component={Verification} /> : null}
                            <Route path="/dashboard/profile" component={AuthGuard(Profile)} />
                            <Route path="/dashboard/articles/add" component={AuthGuard(AddArticle, true)} />
                            <Route path="/dashboard/articles/edit/:id" component={AuthGuard(EditArticle, true)} />
                            <Route path="/dashboard/articles" component={AuthGuard(Articles, true)} />
                            <Route path="/article/:id" component={Article} />
                            <Route path="/contact" component={AuthGuard(Contact)} />
                            <Route path="/dashboard" component={AuthGuard(Dashboard)} />
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
