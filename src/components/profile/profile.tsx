import styles from "./profile.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState, FC, ChangeEvent} from "react";
import { updateUser } from "../../services/actions/auth";
import {useForm} from "../../hooks/useForm";
import {useDispatch, useSelector} from "../../services/types/hooks";

const Profile: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const {values, setValues} = useForm({  name: user!.name, password: '', email: user!.email});
    const [buttons, setButtons] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setButtons(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(values));
        setButtons(false);
    };

    const resetForm = () => {
        if(user !== null){
            setValues({ name: user.name, password: '', email: user.email});
            setButtons(false);
        }
    }

    const inputRef = React.useRef<HTMLInputElement>(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon='EditIcon'
                value={values.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                ref={inputRef}
                onIconClick={onIconClick}
            />
            <EmailInput
                onChange={handleChange}
                value={values.email}
                name={'email'}
                placeholder={'Логин'}
            />
            <PasswordInput
                onChange={handleChange}
                value={values.password}
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