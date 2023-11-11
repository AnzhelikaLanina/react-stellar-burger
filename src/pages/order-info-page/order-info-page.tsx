import styles from "./order-info-page.module.css";
import OrderInfo from "../../components/order-info/order-info";
import { FC } from "react";

const OrderInfoPage: FC = () => {

    return (
        <main className={styles.main}>
            <OrderInfo />
        </main>

    )
}
export default OrderInfoPage;