import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import fonts from "./settings/fonts";

import Home from './components/home';
import Header from './components/navigation/header';
import MainLayout from "./hoc/mainLayout";

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <MainLayout>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </MainLayout>
            <GoogleFontLoader
                fonts={fonts}
            />
        </BrowserRouter>
    )
}

export default Routes;
