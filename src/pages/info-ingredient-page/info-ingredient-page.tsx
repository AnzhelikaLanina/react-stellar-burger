import React, { useMemo, FC } from "react";
import IngredientDetailsMain from "../../components/ingredient-details-main/ingredient-details-main";
import { useParams } from "react-router-dom";
import styles from './info-ingredient-page.module.css';
import {useSelector} from "../../services/types/hooks";
const InfoIngredientPage: FC = () => {
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