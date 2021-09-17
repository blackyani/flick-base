import React from 'react';
import {Container} from "react-bootstrap";
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const MainLayout = ({children}) => {
    const {layout} = useSelector((state) => state.site);

    return (
        <Container className={`app_container mb-5 ${layout}`}>
            {children}
            <ToastContainer transition={Zoom} />
        </Container>
    );
};

export default MainLayout;