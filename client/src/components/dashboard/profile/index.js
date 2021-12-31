import React from 'react';
import AdminLayout from "../../../hoc/admin-layout";
import AuthProfile from "../profile/auth"

const Profile = () => {
    return (
        <AdminLayout section="Profile">
            <AuthProfile/>
        </AdminLayout>
    );
};

export default Profile;