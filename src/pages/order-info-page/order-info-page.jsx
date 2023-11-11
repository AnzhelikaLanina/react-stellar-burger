import styles from "./order-info-page.module.css";
import OrderInfo from "../../components/order-info/order-info";

const OrderInfoPage = () => {

    return (
        <main className={styles.main}>
            <OrderInfo />
        </main>

    )
}
export default OrderInfoPage;