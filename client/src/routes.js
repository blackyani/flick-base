import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from 'react-google-font-loader';
import fonts from "./settings/fonts";

import Home from './components/home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
            <GoogleFontLoader
                fonts={fonts}
            />
        </BrowserRouter>
    )
}

export default Routes;
