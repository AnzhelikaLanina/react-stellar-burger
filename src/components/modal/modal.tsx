import styles from "./modal.module.css";
import React, { FC }  from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { modalRoot } from '../../utils/constants';
import {TModalProps} from "../../utils/types";

const Modal: FC<TModalProps> = ({ children, closeModal }) => {

    React.useEffect(() => {
        const handleEsc = (evt: { key: string}) => {
            evt.key === 'Escape' && closeModal();
        }

        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [closeModal]);

    return  ReactDOM.createPortal (
        <>
                <section className={styles.main}>
                    <div className={styles.container}>
                        {children}
                    </div>
                    <ModalOverlay closeModal={closeModal} />
                </section>
        </>,
        modalRoot as HTMLElement
    )
}

export default Modal;