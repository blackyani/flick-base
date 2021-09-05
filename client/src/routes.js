import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import fonts from "./settings/fonts";

import Home from './components/home';
import Header from './components/navigation/header';
import Auth from './components/auth';
import MainLayout from "./hoc/mainLayout";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <MainLayout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Auth} />
                    <Route path="/register" component={Auth} />
                </Switch>
            </MainLayout>
            <GoogleFontLoader
                fonts={fonts}
            />
        </BrowserRouter>
    )
}

export default Routes;
