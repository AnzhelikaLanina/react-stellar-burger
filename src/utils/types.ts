export type TAuthorization = HeadersInit & {
    authorization?: string | null;
};

export type TOptions = {
    method: string;
    headers: TAuthorization;
    body?: BodyInit | null | undefined;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid?: string;
};

export type TUser = {
    name: string;
    email: string;
    password?: string;
};

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner: string;
    status: string;
    updatedAt: string;
    _id: string;
    __v: number;
};

export type TOrderNumber = {
    orderNumber: number;
}

export type TOrders = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

export type TForm = {
    name?: string;
    password?: string;
    email?: string;
    token?: string | null;
};

export type TImages = {
    image: string;
    name: string;
};

export type TModalProps = {
    closeModal: () => void;
}

export type TIngredientProps = {
    ingredient: TIngredient;
    onClick: () => void;
}

export type TOrderCard = {
    order: TOrder;
};

export type TIngredientListProps = {
    ingredients: TIngredient[];
    name: string;
    onClick: (element: TIngredient) => void;
}

export type TBurgerConstructorElementProps = {
    ingredient: TIngredient;
    index: number;
    onDelete: (uuid: string) => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}

export type TUseForm = {
    [key: string]: string;
}

export type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: JSX.Element;
};

export type TComponentProps = {
    component: JSX.Element;
}