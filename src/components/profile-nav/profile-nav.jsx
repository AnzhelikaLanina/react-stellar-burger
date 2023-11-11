import styles from "./profile-nav.module.css";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/auth";
const ProfileNav = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout(localStorage.getItem('refreshToken')));
    }

    const location = useLocation();

    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                <li>
                    <NavLink
                        to='/profile'
                        end
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
            {location.pathname === '/profile' ?
                <p className={`text text_type_main-default ${styles.caption}`}>В этом разделе вы можете изменить свои персональные данные</p> :
                location.pathname === '/profile/orders' ?  <p className={`text text_type_main-default ${styles.caption}`}>В этом разделе вы можете просмотреть свою историю заказов</p> : ""
            }
        </nav>
    )
}

export default ProfileNav;