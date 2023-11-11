import styles from './loader.module.css';
const Loader = () => {

    return (
        <div className={styles.loader} >
           <h2 className={`text text_type_main-medium ${styles.loading}`}>Подождите, заказ создается...</h2>
        </div>
    )
}

export default Loader;