import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getStatus, getTimeZone} from "../../utils/utils";
const OrderCard = (props) => {
    const { pathname } = useLocation()
    const location = useLocation();
    const { number, createdAt, name, ingredients, _id, status } = props.order;
    const listIngredients = useSelector(store => store.ingredients.ingredients);
    const images = [];

    const totalPrice = listIngredients && ingredients.reduce((total, id) => {
        listIngredients.forEach(i => {
            if (i._id=== id) {
                total += i.price
            }
        })
        return total
    }, 0);

    ingredients && listIngredients.forEach((ingredient) => {
        ingredients.forEach((i) => {
            if (i === ingredient._id) {
                images.push({
                    image: ingredient.image,
                    name: ingredient.name
                });
            }
        });
    });

    const checkCount = () => {
        if (images.length > 5) {
            return images.length - 5;
        }
        return null;
    };

    return (
        <Link
            key={_id}
            to={`${pathname}/${number}`}
            state={{ background: location }}
            className={styles.link}
        >
            <li className={styles.card}>
                <div className={styles.caption}>
                    <p className='text text_type_digits-default'>#{number}</p>
                    <div className={styles.date}>
                        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)}/>
                        <p className="text text_type_main-default text_color_inactive">{getTimeZone(createdAt)}</p>
                    </div>
                </div>
                {location.pathname === '/feed'?
                    <h2 className="text text_type_main-medium">{name}</h2> :
                    <div className={styles.element}>
                        <h2 className="text text_type_main-medium">{name}</h2>
                        <p className={status === 'done'?
                            `${styles.status_done} text text_type_main-default`:
                            `${styles.status_pending} text text_type_main-default`
                        }>
                        {getStatus(status)}
                        </p>
                    </div>
                }
                <div className={styles.box}>
                    <ul className={styles.ingredients}>
                        {images.slice(0, 5).map((img, i) =>
                            <li key={i} className={styles.img_background}>
                                <div className={styles.img_container}>
                                    <img
                                        className={styles.img}
                                        src={img.image}
                                        alt={img.name}
                                    />
                                </div>
                            </li>
                        )}
                        {images.length > 5 ?
                            <li className={styles.img_background}>
                                <div className={styles.img_container}>
                                    <img
                                        className={styles.img}
                                        src={images[5].image}
                                        alt={images[5].name}
                                    />
                                </div>
                            </li>
                            : null
                        }

                        {checkCount()
                            ? <p className={`${styles.counter} text text_type_main-default`}>{`+${checkCount()}`}</p>
                            : ''
                        }
                    </ul>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default OrderCard;