import React from "react";
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { closeModalOrderDetails, getOrderNumber } from "../../services/actions/order";
import uuid from 'react-uuid';
import { addIngredient, moveIngredient, removeIngredient } from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ingredientsBurgerConstructor } = useSelector(store => store.constructor);
    const { orderNumber, orderError  } = useSelector(store => store.order);

    const bun =  React.useMemo(
        () =>
            ingredientsBurgerConstructor?.find(ingredient => ingredient.type === 'bun'),
        [ingredientsBurgerConstructor]
    );
    const otherIngredients  =  React.useMemo(
        () =>
            ingredientsBurgerConstructor?.filter(ingredient => ingredient.type !== 'bun'),
        [ingredientsBurgerConstructor]
    );

    const handleDrop = (element) => {
        if (element.type === "bun" && bun) {
            dispatch(removeIngredient(bun.uuid));
        }
        dispatch(addIngredient(element, uuid()));
    };

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ingredient) => {
            handleDrop(ingredient);
        },
        collect: (monitor) => ({
            isDrop: monitor.isOver(),
        }),
    });

    const removeBurgerIngredient = (uuid) => {
        dispatch(removeIngredient(uuid));
    }

    const moveBurgerIngredient = (dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    };

    const totalPrice = React.useMemo(
        () =>
            ingredientsBurgerConstructor
                ? ingredientsBurgerConstructor.reduce((sum, current) => sum + current.price, 0)
                : 0,
        [ingredientsBurgerConstructor]
    );
    const { user } = useSelector((state) => state.auth);

    const getOrderDetails = () => {
        if (user) {
            const data = {
                ingredients: [
                    bun._id,
                    ...otherIngredients.map((ingredient) => ingredient._id),
                    bun._id
                ]
            };
            dispatch(getOrderNumber(data.ingredients));
        } else {
            navigate('/login');
        }

    };

    const closeModalOrder = () => {
        dispatch(closeModalOrderDetails());
    };

    const disabledButton = !ingredientsBurgerConstructor?.length || !bun;

    return(
        <>
            <section className={styles.main}>
                <div className={styles.container} ref={dropTarget} >
                    {bun ?
                        <div className={styles.lockIngredient}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                        </div>
                        : (!orderError || (!bun && ingredientsBurgerConstructor.length > 0)) &&
                        <div>
                            <p className="text text_type_main-medium">Выберите булку и другие ингредиенты</p>
                        </div>
                    }
                    <div className={`custom-scroll ${styles.box}`} >
                        {otherIngredients &&
                            otherIngredients.map((element, index) => (
                                <BurgerConstructorElement
                                    ingredient={element}
                                    key={element.uuid}
                                    index={index}
                                    onDelete={removeBurgerIngredient}
                                    onMove={moveBurgerIngredient}
                                />
                                )
                            )
                        }
                    </div>
                    {bun ?
                        <div className={styles.lockIngredient}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                        </div>
                        : (!orderError || (!bun && ingredientsBurgerConstructor.length > 0))
                    }
            </div>
            <div className={styles.element}>
                <div className={styles.caption} >
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="submit" type="primary" size="large" onClick={getOrderDetails} disabled={disabledButton} >
                    Оформить заказ
                </Button>
            </div>
        </section>
            { orderNumber &&
                <Modal
                    closeModal={closeModalOrder}>
                    <OrderDetails closeModal={closeModalOrder} />
                </Modal>
            }
        </>
    )
}

export default BurgerConstructor;