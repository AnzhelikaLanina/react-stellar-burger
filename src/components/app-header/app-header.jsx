import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./app-header.module.css";
import { NavLink } from 'react-router-dom';
import React from "react";

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <div className={styles.block}>
                <ul className={styles.items}>
                    <li>
                        <NavLink
                            to={'/'}
                            className={styles.item}
                        >
                            {({isActive}) => (
                                <>
                                    <div
                                        className={styles.icon}><BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                    </div>
                                    <div
                                        className={`text text_type_main-default + ${isActive ? styles.active : styles.noActive}`}>Конструктор
                                    </div>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/feed'
                            className={styles.item}
                        >
                            {({isActive}) => (
                                <>
                                    <div
                                        className={styles.icon}><ListIcon type={isActive ? 'primary' : 'secondary'}/>
                                    </div>
                                    <div
                                        className={`text text_type_main-default + ${isActive ? styles.active : styles.noActive}`}>Лента заказов
                                    </div>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
                <Logo />
                <div>
                    <NavLink
                        to='/profile'
                        className={styles.itemRight}
                    >
                        {({isActive}) => (
                            <>
                                <div
                                    className={styles.icon}><ProfileIcon type={isActive ? 'primary' : 'secondary'}/>
                                </div>
                                <div
                                    className={`text text_type_main-default + ${isActive ? styles.active : styles.noActive}`}>Личный кабинет
                                </div>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;