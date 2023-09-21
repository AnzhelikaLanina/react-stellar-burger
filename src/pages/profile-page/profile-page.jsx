import React from "react";
import styles from "./profile-page.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { Outlet } from "react-router";

const ProfilePage = () => {

    return (
        <div >
            <main className={styles.profile}>
                <ProfileNav />
                <Outlet />
            </main>
        </div>
    );
}

export default ProfilePage;