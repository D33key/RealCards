import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import AppContext from "../../context";
import Info from "../Info/Info";
import { ReactComponent as RemoveBtn } from "./assets/removeItem.svg";
import cl from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onOverlayClick, visible }) => {
    // Hide scroll when cart is opened
    visible
        ? document.body.classList.add("no-scroll")
        : document.body.classList.remove("no-scroll");

    const { cartValue, setCartValue, setConfirmedOrder, totalPrice } =
        useContext(AppContext);
    const [isOrderConfirm, setIsOrderConfirm] = useState(false);

    const onClickConfirm = async () => {
        try {
            localStorage.orders = JSON.stringify(cartValue);
            let orders = JSON.parse(localStorage.orders);
            setConfirmedOrder((prev) => [...prev, ...orders]);

            for (let index = 0; index < cartValue.length; index++) {
                const element = cartValue[index];
                await axios.delete(
                    "https://63da3cc8b28a3148f6820198.mockapi.io/cart/" +
                        element.id
                );
                delay(1000);
            }

            setIsOrderConfirm(true);
            setCartValue([]);
        } catch (error) {
            alert("Не удалось создать заказа!");
        }
    };

    // Closing card when overlay clicked
    const overlayRef = useRef();
    const closeCart = (e) => {
        if (e.target === overlayRef.current) onOverlayClick();
    };

    // Remove item from Cart
    const onRemoveFromCart = (obj) => {
        axios.delete(
            `https://63da3cc8b28a3148f6820198.mockapi.io/cart/${obj.id}`
        );
        setCartValue((prev) => prev.filter((item) => item.id !== obj.id));
    };

    return (
        <div
            ref={overlayRef}
            className={`${cl.overlay} ${visible ? cl.visible : ''}`}
            onClick={closeCart}
        >
            <div className={cl.drawer}>
                {cartValue.length > 0 ? (
                    <>
                        <h2>Корзина</h2>
                        <div className={cl.items}>
                            {cartValue.map((item) => (
                                <div className={cl.cartItem} key={item.title}>
                                    <img src={item.url} alt={item.title} />
                                    <div className={cl.cartInfo}>
                                        <p>{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <button
                                        onClick={() => onRemoveFromCart(item)}
                                    >
                                        <RemoveBtn />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <ul>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Math.ceil(totalPrice * 0.05)} руб.</b>
                            </li>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{Math.ceil(totalPrice * 1.05)} руб.</b>
                            </li>
                        </ul>
                        <button onClick={onClickConfirm} className={cl.confirm}>
                            Оформить заказ
                        </button>
                    </>
                ) : (
                    <Info
                        title={
                            !isOrderConfirm
                                ? "Корзина пустая"
                                : "Заказ оформлен!"
                        }
                        description={
                            !isOrderConfirm
                                ? "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                                : `Ваш заказ скоро будет передан курьерской доставке`
                        }
                        img={
                            !isOrderConfirm
                                ? "assets/infoImages/emptyCart.jpg"
                                : "assets/infoImages/confirmed.jpg"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
