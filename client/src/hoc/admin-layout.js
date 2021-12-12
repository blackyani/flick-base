import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { useSelector } from "react-redux";

import {roleLinks} from '../settings/link-guards';

import {
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

const AdminLayout = (props) => {
    const role = useSelector((state) => state.users.data.role);

    const linksList = roleLinks[role].map(({route, label}, index) => (
        <ListItem button component={RouterLink} to={route} key={`${index}-${label}`}>
            <ListItemText primary={label} />
        </ListItem>
    ));

    return (
        <>
            <div className="row adminLayout">
                <nav className="col-md-3 col-lg-2 d-none d-md-block sidebar">
                    <div>
                        <List>
                            {linksList}
                        </List>
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 className="h2">{props.section}</h1>
                    </div>
                    {props.children}
                </main>
            </div>
        </>
    );
};

export default AdminLayout;