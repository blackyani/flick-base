import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import EmailStepper from './stepper/email';

import {
    Grid,
    TextField,
    Divider
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const Profile = () => {
    const [modal, setEmailModal] = useState(false);
    const users = useSelector(state => state.users);
    const notification = useSelector(state => state.notification);
    const toggleModal = (status = true) => setEmailModal(status);
    return (
        <div className="mb-3 auth_grid">
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <TextField value={users.data.email} disabled />
                </Grid>
                <Grid item>
                    <EditIcon color="primary" onClick={() => toggleModal()} />
                </Grid>
            </Grid>

            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <TextField value={'users.data.password'} disabled />
                </Grid>
                <Grid item>
                    <EditIcon color="primary" onClick={() => toggleModal()} />
                </Grid>
            </Grid>
            <Divider/>

            <Modal size="lg" centered show={modal} onHide={() => toggleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>

                <Modal.Body><EmailStepper user={users} /></Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;