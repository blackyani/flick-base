import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const SideDrawer = () => {
    const [show, setShow] = useState(false);

    const links = sideDrawerLinks.map((link) => (
        <ListItem
            key={link.label}
            button
            component={RouterLink}
            to={link.route}
            onClick={() => setShow(false)}
        >
            <ListItemIcon><link.icon /></ListItemIcon>
            <ListItemText primary={link.label}/>
        </ListItem>
    ));

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
            </Drawer>
        </>
    );
};

export default SideDrawer;