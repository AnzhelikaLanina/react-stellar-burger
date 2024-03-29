import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import styles from './order-info.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {getOrderInfo} from "../../services/actions/order";
import {getStatus, getTimeZone} from "../../utils/utils";


const OrderInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const background = location.state && location.state.background;
    const dataIngredients = [];
    const counter = {};
    const listIngredients = useSelector(store => store.ingredients.ingredients);
    const { name, number, ingredients, status, createdAt } = useSelector(store => store.order.orderData);

    useEffect(() => {
        dispatch(getOrderInfo(id));
    }, [id]);

    const totalPrice = listIngredients && ingredients && ingredients.reduce((total, id) => {
        listIngredients.forEach(i => {
            if (i._id === id) {
                total += i.price
            }
        })
        return total;
    }, 0);


    if (listIngredients && ingredients ) {
        ingredients.forEach((i) => {
            if (counter[i] === undefined) {
                counter[i] = 1;
                const addedElement = listIngredients.find(element => element._id === i);
                addedElement && dataIngredients.push(addedElement);
            } else {
                counter[i] ++;
            }
        })
    }

    return (
        <div className={styles.container}>
            {background ? "":
                <p className={`${styles.order} text text_type_digits-default`}>{`#${number}`}</p>
            }
            <h1 className="text text_type_main-medium">{name}</h1>
            <p className={status === 'done'?
                `${styles.status} ${styles.status_done} text text_type_main-default`:
                `${styles.status} ${styles.status_pending} text text_type_main-default`
            }>
                {getStatus(status)}
            </p>
            <h2 className={`${styles.structure} text text_type_main-medium`}>Состав</h2>
            <ul className={`${styles.list} custom-scroll`}>
                {ingredients && listIngredients && dataIngredients && dataIngredients.map((i) =>
                        <li key={i._id} className={styles.element}>
                            <div className={styles.img_container}>
                                <div className={styles.img_background}>
                                    <div className={styles.img_box}>
                                        <img
                                            className={styles.img}
                                            src={i.image}
                                            alt={i.name}
                                        />
                                    </div>
                                </div>
                                <h3 className={`${styles.name} text text_type_main-default`}>{i.name}</h3>
                            </div>
                            <div className={styles.price}>
                                <p className="text text_type_digits-default">{counter[i._id]}</p>
                                <p className="text text_type_main-default">&nbsp;x&nbsp;</p>
                                <div className={styles.caption}>
                                    <p className="text text_type_digits-default">{i.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        </li>
                )}
                </ul>
                <div className={styles.box}>
                    <div className={styles.caption}>
                        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
                        <p className="text text_type_main-default text_color_inactive">{getTimeZone(createdAt)}</p>
                    </div>
                    <div className={styles.caption}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>

    )
}
export default OrderInfo;