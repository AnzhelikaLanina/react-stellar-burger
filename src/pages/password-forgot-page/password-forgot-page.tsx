import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, FC } from "react";
import styles from "../page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/actions/auth";
import {useForm} from "../../hooks/useForm";
import {useDispatch, useSelector} from "../../services/types/hooks";

const PasswordForgotPage: FC = () => {
    const {values, handleChange} = useForm({email: ""});
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPassword(values));
    };

    const isPasswordChanged = useSelector((store) => store.auth.isPasswordChanged);

    useEffect(()=>{
        if(isPasswordChanged){
            navigate('/reset-password');
        }
    }, [navigate, isPasswordChanged])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        placeholder={'Укажите e-mail'}
                    />
                    <Button htmlType="submit" type="primary" size="large">
                        Восстановить
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

export default PasswordForgotPage;