import styles from './feed-page.module.css';
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/order-card/order-card";
import {wsOrderConnect, wsOrderDisconnect} from "../../services/actions/order-feed";
import {wsFeedUrl} from "../../utils/constants";

const FeedPage = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(state => state.feedOrders.orders);

    useEffect(() => {
        dispatch(wsOrderConnect(wsFeedUrl))
        return () => {
            dispatch(wsOrderDisconnect())
        }
    },[]);

    const doneList = orders && orders.map(order => {
        if (order.status === 'done') {
            return order.number;
        }
    }).slice(0, 9);

    const pendingList = orders && orders.map(order => {
        if (order.status === 'pending') {
            return order.number;
        }
    }).slice(0, 9);

    return (
        <div className={styles.feed}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <div className={styles.main}>
                <ul className={`custom-scroll ${styles.order_feed}`}>
                    {orders && orders.map((order) =>
                        <OrderCard key={order._id} order={order} />
                    )}
                </ul>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <div className={styles.element}>
                            <h2 className="text text_type_main-medium">Готовы:</h2>
                            <ul className={styles.list}>
                                {doneList && doneList.map((order, i) =>
                                    <li key={i} className={`text text_type_digits-default ${styles.status_done}`}>{order}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.element}>
                            <h2 className="text text_type_main-medium">В работе:</h2>
                            <ul className={styles.list}>
                                {pendingList && pendingList.map((order, i) =>
                                    <li key={i} className="text text_type_digits-default">{order}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.caption}>
                        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                        <p className="text text_type_digits-large">{total}</p>
                    </div>
                    <div className={styles.caption}>
                        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPage;