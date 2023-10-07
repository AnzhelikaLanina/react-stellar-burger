import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import styles from "../page.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/auth";

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form));
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={form.name}
                        name={'name'}
                        size={'default'}
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={form.email}
                        name={'email'}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={form.password}
                        name={'password'}
                    />
                    <Button htmlType="submit" type="primary" size="large" >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={styles.caption}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?&ensp;
                        <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default RegistrationPage;