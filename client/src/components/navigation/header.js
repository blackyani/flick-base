import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import { appLayout } from "../../store/actions";

import SideDrawer from "./sideDrawer";

const Header = (props) => {
    const dispatch = useDispatch();
    const {layout} = useSelector((state) => state.site);

    useEffect(() => {
        let pathArray = props.location.pathname.split('/');
        if (pathArray.includes('dashboard')) {
           dispatch(appLayout('dash_layout'))
        } else {
            dispatch(appLayout(''))

        }
    }, [props.location.pathname]);

    return (
        <>
            <nav className={`navbar fixed-top ${layout}`}>
                <Link style={{fontFamily: 'Fredoka One'}} to="/" className="navbar-brand d-flex align-items-center justify-content-center">
                    FlickBase
                </Link>
                <SideDrawer/>
            </nav>
        </>
    );
};

export default withRouter(Header);