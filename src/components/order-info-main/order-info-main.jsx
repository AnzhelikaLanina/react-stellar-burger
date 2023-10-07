import styles from "./order-info-main.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import {useParams} from "react-router-dom";
import React from "react";

const OrderInfoMain = ({ closeModal }) => {
    const { id } = useParams();

    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <p className="text text_type_digits-default">{`#${id}`}</p>
                <button type={"button"} className={styles.button} onClick={closeModal}>
                    <CloseIcon type="primary" />
                </button>
            </div>
            <OrderInfo />
        </div>
    );
}

OrderInfoMain.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default OrderInfoMain;