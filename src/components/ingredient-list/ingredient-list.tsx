import React, {RefObject} from "react";
import styles from "./ingredient-list.module.css";
import Ingredient from "../ingredient/ingredient";
import {TIngredientListProps} from "../../utils/types";


const IngredientList= React.forwardRef<HTMLDivElement, TIngredientListProps>(({ ingredients, name, onClick }, ref) =>{

    return (
        <li className={styles.subsection} ref={ref as RefObject<HTMLLIElement>}>
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

export default IngredientList;