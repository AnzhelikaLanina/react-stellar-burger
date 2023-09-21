import styles from "./profile.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/actions/auth";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [form, setForm] = React.useState({ name: user.name, email: user.email, password: "" });
    const [buttons, setButtons] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setButtons(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(form));
        setButtons(false);
    };

    const resetForm = () => {
        setForm({ name: user.name, email: user.email, password: "" });
        setButtons(false);
    }

    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon='EditIcon'
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                ref={inputRef}
                onIconClick={onIconClick}
            />
            <EmailInput
                onChange={handleChange}
                value={form.email}
                name={'email'}
                placeholder={'Логин'}
                icon='EditIcon'
            />
            <PasswordInput
                onChange={handleChange}
                value={form.password}
                name={'password'}
                placeholder={'Пароль'}
                icon='EditIcon'
            />
            {buttons && <div className={styles.buttons}>
                <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
            }
        </form>
        )
}

export default Profile;