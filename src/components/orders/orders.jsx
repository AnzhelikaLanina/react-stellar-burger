import styles from './orders.module.css';
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../order-card/order-card";
import {wsOrderConnect, wsOrderDisconnect} from "../../services/actions/order-feed";
import {wsFeedUrl, wsFeedOrdersUserUrl} from "../../utils/constants";
import {wsProfileOrdersConnect, wsProfileOrdersDisconnect} from "../../services/actions/profile-orders";

const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.feedOrders.orders);

    useEffect(() => {
        dispatch(wsProfileOrdersConnect(wsFeedOrdersUserUrl));
        dispatch(wsOrderConnect(wsFeedUrl))
        return () => {
            dispatch(wsProfileOrdersDisconnect());
            dispatch(wsOrderDisconnect())
        }
    },[]);

    return (
        <ul  className={`custom-scroll ${styles.list}`}>
            {orders && orders.map((order) =>
                <OrderCard key={order._id} order={order} />)
            }
        </ul>
    )
}

export default Orders;