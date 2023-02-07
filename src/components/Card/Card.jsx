import React, { useContext, useState } from "react";
import { ReactComponent as AddedButtonSVG } from "./assets/addedButton.svg";
import { ReactComponent as LikeButtonSVG } from "./assets/favoriteLike.svg";
import { ReactComponent as UnLikeButtonSVG } from "./assets/favoriteUnlike.svg";
import { ReactComponent as PlusButtonSVG } from "./assets/plusButton.svg";
import cl from "./Card.module.scss";
import Loader from "../Loader/Loader";
import AppContext from "../../context";

const Card = ({
    id,
    title,
    addToCart,
    price,
    url,
    onAddFavorite,
    isFavorite = false,
    isLoading = false,
    isHidden = false,
}) => {
    const { isItemInCart, isClicked, isItemInFavorite } =
        useContext(AppContext);

    const onClickAdd = () => {
        addToCart({ id, title, price, url });
    };

    // Add product to Favorite
    let [favorite, setFavorite] = useState(isFavorite);
    const onClickAddFavorite = () => {
        onAddFavorite({ id, title, price, url });
        setFavorite(!favorite);
    };

    return (
        <div className={cl.card}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <img className={cl.preview} src={url} alt={title} />
                    <h3 className={cl.title}>{title}</h3>
                    <div className={cl.choiceWrapper}>
                        <div>
                            <p className={cl.price}>Цена:</p>
                            <p className={cl.currency}>{price} руб.</p>
                        </div>
                        <div className={cl.favorite}>
                            <button
                                className={cl.preview}
                                disabled={isClicked}
                                onClick={onClickAddFavorite}
                                hidden={isHidden}
                            >
                                {isItemInFavorite(title) ? (
                                    <LikeButtonSVG />
                                ) : (
                                    <UnLikeButtonSVG />
                                )}
                            </button>
                        </div>
                        <button
                            onClick={onClickAdd}
                            disabled={isClicked}
                            hidden={isHidden}
                        >
                            {isItemInCart(title) ? (
                                <AddedButtonSVG />
                            ) : (
                                <PlusButtonSVG />
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
