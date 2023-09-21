import styles from "./ingredient-details-main.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const IngredientDetailsMain = () => {
    const { ingredients } = useSelector(store => store.ingredients);
    const { id } = useParams();

    const ingredientSelected = useMemo(
        () => ingredients.find((item) => item._id === id),
        [ingredients, id]);

    return (
        <div
            className={styles.card}
        >
            <img src={ingredientSelected.image_large} alt={ingredientSelected.name}/>
            <p className="text text_type_main-medium">{ingredientSelected.name}</p>
            <ul className={styles.container}>
                <li className="text text_type_main-default text_color_inactive">Калории,ккал</li>
                <li className="text text_type_main-default text_color_inactive">Белки, г</li>
                <li className="text text_type_main-default text_color_inactive">Жиры, г</li>
                <li className="text text_type_main-default text_color_inactive">Углеводы, г</li>
                <li className="text text_type_main-default text_color_inactive">{ingredientSelected.calories}</li>
                <li className="text text_type_main-default text_color_inactive">{ingredientSelected.proteins}</li>
                <li className="text text_type_main-default text_color_inactive">{ingredientSelected.fat}</li>
                <li className="text text_type_main-default text_color_inactive">{ingredientSelected.carbohydrates}</li>
            </ul>
        </div>
    );
}

export default IngredientDetailsMain;