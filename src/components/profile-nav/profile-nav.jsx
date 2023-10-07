import styles from "./profile-nav.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/auth";
const ProfileNav = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout(localStorage.getItem('refreshToken')));
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                <li>
                    <NavLink
                        to='/profile'
                        className={({ isActive }) =>
                            `text text_type_main-medium + ${styles.link} + ${isActive ? styles.link_active : ''}`
                        }>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/profile/orders'
                        className={({ isActive }) =>
                            `text text_type_main-medium + ${styles.link} + ${isActive ? styles.link_active : ''}`
                        }>
                        История заказов
                    </NavLink>
                </li>
                <li>
                    <button type={"button"} className={`text text_type_main-medium ${styles.button}`} onClick={onLogout}>Выход</button>
                </li>
            </ul>
            <p className={`text text_type_main-default ${styles.caption}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    )
}

export default ProfileNav;