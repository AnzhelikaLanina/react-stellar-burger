import styles from './orders.module.css';
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../order-card/order-card";
import {wsFeedOrdersUserUrl} from "../../utils/constants";
import {wsProfileOrdersConnect, wsProfileOrdersDisconnect} from "../../services/actions/profile-orders";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.profileOrders.ordersData);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
        const wsFeedOrdersUserUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
        dispatch(wsProfileOrdersConnect(wsFeedOrdersUserUrl));
        return () => {
            dispatch(wsProfileOrdersDisconnect());
        }
    },[]);

    return (
        <ul  className={`custom-scroll ${styles.list}`}>
            {orders && orders.slice().reverse().map((order) =>
                <OrderCard key={order._id} order={order} />)
            }
        </ul>
    )
}

export default Orders;