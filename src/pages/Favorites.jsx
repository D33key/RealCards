import React, { useContext } from "react";
import Card from "../components/Card/Card";
import Info from '../components/Info/Info';
import AppContext from "../context";

const Favorites = ({ onAddFavorite, setCartValue }) => {
    const { favorites } = useContext(AppContext);

    return (
        <div className="favorite">
            <div className="titleWrapper">
                <h1>Мои закладки</h1>
                {favorites.length > 0 ? (
                    <div className="items">
                        {favorites.map((favorite) => (
                            <Card
                                {...favorite}
                                key={favorite.id}
                                onAddFavorite={onAddFavorite}
                                setCartValue={setCartValue}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                ) : (
                    <Info
                        title={"Закладок нет :("}
                        description={"Вы ничего не добавляли в закладки."}
                        img={"assets/infoImages/nofav.jpg"}
                        isDrawer={false}
                    />
                )}
            </div>
        </div>
    );
};

export default Favorites;
