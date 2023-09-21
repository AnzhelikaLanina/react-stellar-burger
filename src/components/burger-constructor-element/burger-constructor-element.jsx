import React from 'react';
import styles from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerConstructorElement = ({ ingredient, index, onMove, onDelete }) => {
    const { name, price, image, uuid } = ingredient;
    const ref = React.useRef(null);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {index}
    });

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover: (item, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            onMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    dragRef(dropTarget(ref));

    return (
        <div className={styles.card} ref={ref} >
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => onDelete(uuid)}
            />
        </div>
    );
}

BurgerConstructorElement.propTypes = {
    ingredient: ingredientPropType.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired
};

export default BurgerConstructorElement;