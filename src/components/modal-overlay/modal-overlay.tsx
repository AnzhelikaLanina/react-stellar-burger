import styles from "./modal-overlay.module.css";
import { FC } from "react";
import {TModalProps} from "../../utils/types";


const ModalOverlay: FC<TModalProps> = ({ closeModal }) => {

    return (
        <div onClick={closeModal} className={styles.main}></div>
    )
}

export default ModalOverlay;