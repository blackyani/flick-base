import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {authLinks, notAuthLinks} from "../../settings/link-guards";
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@material-ui/core";
import DehazeIcon from '@material-ui/icons/Dehaze';
import DashboardIcon from '@material-ui/icons/Dashboard';

import sideDrawerLinks from '../../settings/side-drawer';
import {signOutUser} from "../../store/actions/user-actions";

const SideDrawer = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const isAuth = useSelector((state) => state.users.auth);

    const filteredLinks = isAuth
        ? sideDrawerLinks.filter(link => !authLinks.includes(link.route))
        : sideDrawerLinks.filter(link => !notAuthLinks.includes(link.route))

    const logOutHandler = () => {
        dispatch(signOutUser());
        setShow(false);
        props.history.push('/');
    }

    const links = filteredLinks.map((link) => {
        if (link.label === 'Sign out') {
            return <ListItem
                key={link.label}
                button
                onClick={logOutHandler}
            >
                <ListItemIcon><link.icon /></ListItemIcon>
                <ListItemText primary={link.label}/>
            </ListItem>
        } else {
            return <ListItem
                key={link.label}
                button
                component={RouterLink}
                to={link.route}
                onClick={() => setShow(false)}
            >
                <ListItemIcon><link.icon /></ListItemIcon>
                <ListItemText primary={link.label}/>
            </ListItem>
        }
    });

    return (
        <>
            <DehazeIcon style={{marginRight: '20px'}} className="drawer_btn" onClick={() => setShow(true)} />
            <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
                <form style={{margin: '20px'}}>
                    <TextField id="outlined-basic" label="Search movies" variant="outlined" />
                </form>
                <Divider />
                <List>
                    {links}
                </List>

                {
                    isAuth ?
                        <>
                            <Divider />
                            <List>
                                <ListItem
                                    button
                                    component={RouterLink}
                                    to='/dashboard'
                                    onClick={() => setShow(false)}
                                >
                                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                            </List>
                        </> : null
                }
            </Drawer>
        </>
    );
};

export default withRouter(SideDrawer);