import React from "react";
import styles from "./ingredient-list.module.css";
import Ingredient from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

const IngredientList = React.forwardRef(({ ingredients, name, onClick }, ref) =>{

    return (
        <li className={styles.subsection} ref={ref}>
            <p className="text text_type_main-medium">{name}</p>
            <ul className={styles.elements}>
                {ingredients.map((element) => {
                    return (
                        <Ingredient
                            key={element._id}
                            ingredient={element}
                            onClick={() => onClick(element)}
                        />
                    )})
                }
            </ul>
        </li>
    )
})

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    name: PropTypes.string.isRequired
}

export default IngredientList;