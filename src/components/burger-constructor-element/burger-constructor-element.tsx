import React, { FC }  from 'react';
import styles from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import {TBurgerConstructorElementProps, TIngredient} from "../../utils/types";


const BurgerConstructorElement: FC<TBurgerConstructorElementProps> = ({ ingredient, index, onMove, onDelete }) => {
    const { name, price, image, uuid } = ingredient;
    const ref = React.useRef<HTMLDivElement>(null);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {index}
    });

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover: (item: TIngredient & { index: number }, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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
                handleClose={() => {
                    if (uuid !== undefined) {
                    onDelete(uuid)
                }}}
            />
        </div>
    );
}

export default BurgerConstructorElement;