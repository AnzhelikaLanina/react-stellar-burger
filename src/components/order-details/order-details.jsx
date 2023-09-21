import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import image from '../../images/done.svg';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const OrderDetails = ({ closeModal }) => {
    const { orderNumber } = useSelector(store => store.order);

    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <button type={"button"} className={styles.button} onClick={closeModal}>
                    <CloseIcon type="primary" />
                </button>
            </div>
            <h2 className="text text_type_digits-large">{orderNumber}</h2>
            <p className={`text text_type_main-medium ${styles.caption}`}>идентификатор заказа</p>
            <img alt={'галочка'} className={styles.image} src={image} />
            <p className="text text_type_main-small">Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default OrderDetails;