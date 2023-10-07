import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect} from "react";
import styles from "../page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/auth";

const PasswordResetPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = React.useState({ password: "", token: "" });
    const isPasswordChanged = useSelector((store) => store.auth.isPasswordChanged);

    useEffect(() => {
        if (!isPasswordChanged) {
            navigate('/');
        }
    }, [navigate, isPasswordChanged]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(form));
        navigate('/login');
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <PasswordInput
                        onChange={handleChange}
                        placeholder={'Введите новый пароль'}
                        value={form.password}
                        name={'password'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={form.token}
                        name={'token'}
                        size={'default'}
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Сохранить
                    </Button>
                </form>
                <div className={styles.caption}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?&ensp;
                        <Link to='/login' className={styles.link}>Войти</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default PasswordResetPage;