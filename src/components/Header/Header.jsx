import React, { useContext } from "react";
import { ReactComponent as LogoSVG } from "./assets/logo.svg";
import { ReactComponent as BasketSVG } from "./assets/basket.svg";
import { ReactComponent as FavoriteSVG } from "./assets/favorite.svg";
import { ReactComponent as AccountSVG } from "./assets/account.svg";
import { Link } from "react-router-dom";

import cl from "./Header.module.scss";
import AppContext from '../../context';

const Header = ({ onBasketClick }) => {
    const { totalPrice } = useContext(AppContext);
    return (
        <header className={cl.header}>
            <Link to="/">
                <div className={cl.headerLeft}>
                    <LogoSVG width={"40px"} height={"40px"} />
                    <div className={cl.headerInfo}>
                        <h3>REAL CARDS</h3>
                        <p>Магазин качественных видеокарт</p>
                    </div>
                </div>
            </Link>
            <div className={cl.headerRight}>
                <div className={cl.basketPrice} onClick={onBasketClick}>
                    <BasketSVG width={"20px"} height={"20px"} />
                    <span>{totalPrice} руб.</span>
                </div>
                <Link to="/favorites">
                    <FavoriteSVG
                        className={cl.favorite}
                        width={"40px"}
                        height={"20px"}
                    />
                </Link>
                <Link to="/orders">
                    <AccountSVG
                        className={cl.accountInfo}
                        width={"20px"}
                        height={"20px"}
                    />
                </Link>
            </div>
        </header>
    );
};

export default Header;
