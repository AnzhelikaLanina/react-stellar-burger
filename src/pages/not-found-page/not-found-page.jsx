import React from "react";
import { Link } from "react-router-dom";
import styles from './not-found-page.module.css';
const NotFound404 = () => {

    return (
        <div className={styles.notFound}>
            <h1 className="text text_type_main-large">Упс! Ошибка 404</h1>
            <p className="text text_type_main-default">Такой страницы не существует</p>
            <p className="text text_type_main-default">Вернуться на&ensp;
                <Link to='/' className={styles.link}>главную страницу</Link>
            </p>
        </div>
    );
}

export default NotFound404;