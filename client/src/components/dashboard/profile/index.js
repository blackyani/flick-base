import React from 'react';
import AdminLayout from "../../../hoc/admin-layout";
import AuthProfile from "../profile/auth"
import PersonalInfo from "../profile/personal-info"

const Profile = () => {
    return (
        <AdminLayout section="Profile">
            <AuthProfile/>
            <PersonalInfo/>
        </AdminLayout>
    );
};

export default Profile;