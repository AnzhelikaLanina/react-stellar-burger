import styles from "./modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { modalRoot } from '../../utils/constants';
const Modal = ({ children, closeModal }) => {

    React.useEffect(() => {
        const handleEsc = (evt) => {
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
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default Modal;