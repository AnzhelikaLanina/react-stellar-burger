import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import styles from "../page.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth";
import {useForm} from "../../hooks/useForm";

const LoginPage = () => {
    const dispatch = useDispatch();
    const {values, handleChange} = useForm({email: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(values));
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Войти
                    </Button>
                </form>
                <div className={styles.caption}>
                    <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?&ensp;
                        <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль?&ensp;
                        <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;