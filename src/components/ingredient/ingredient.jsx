import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./ingredient.module.css";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { ingredientPropType } from "../../utils/prop-types";
import { Link, useLocation } from "react-router-dom";

const Ingredient = ({ ingredient, onClick }) =>{
    const location = useLocation();
    const { image, name, price, _id } = ingredient;
    const { ingredientsBurgerConstructor } = useSelector(store => store.constructor);

    const [, dragRef] = useDrag({
        type: "ingredients",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const count = ingredientsBurgerConstructor?.filter((item) => item._id === ingredient._id).length;

    return (
        <Link
            key={_id}
            to={`/ingredients/${_id}`}
            state={{ background: location }}
            className={styles.link}
        >
            <li className={styles.element} onClick={onClick} ref={dragRef} >
                {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
                <img src={image} alt={name}/>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className="text text_type_main-small">{name}</p>
            </li>
        </Link>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Ingredient;