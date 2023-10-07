export const NORMA_API = "https://norma.nomoreparties.space/api";
export const modalRoot = document.getElementById("react-modals");
export const wsFeedUrl = "wss://norma.nomoreparties.space/orders/all";

const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
export const wsFeedOrdersUserUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
