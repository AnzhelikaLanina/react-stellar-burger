import styles from "./ingredient-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetailsMain from "../ingredient-details-main/ingredient-details-main";
import { FC } from "react";
import {TModalProps} from "../../utils/types";


const IngredientDetails: FC<TModalProps> = ({ closeModal }) => {

    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <h2 className="text text_type_main-large">Детали ингредиента</h2>
                <button className={styles.button} onClick={closeModal} type={"button"}>
                    <CloseIcon type="primary" />
                </button>
            </div>
            <IngredientDetailsMain />
        </div>
    );
}

export default IngredientDetails;