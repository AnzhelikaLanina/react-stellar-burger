import React, { useMemo } from "react";
import IngredientDetailsMain from "../../components/ingredient-details-main/ingredient-details-main";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from './info-ingredient-page.module.css';
const InfoIngredientPage = () => {
    const { ingredients } = useSelector(store => store.ingredients);
    const { id } = useParams();

    const ingredientSelected = useMemo(
        () => ingredients.find((item) => item._id === id),
        [ingredients, id]);

    return (
            <main className={styles.main}>
                <h2 className="text text_type_main-large">Детали ингредиента</h2>
                {ingredientSelected && <IngredientDetailsMain />}
            </main>
    );
}

export default InfoIngredientPage;