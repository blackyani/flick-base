import React from 'react';
import {Container} from "react-bootstrap";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({children}) => {
    return (
        <Container className="app_container mb-5">
            {children}
            <ToastContainer transition={Zoom} />
        </Container>
    );
};

export default MainLayout;