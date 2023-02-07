import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import AppContext from "./context";
import E404 from './pages/E404';
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
    // Confirmed orders
    const [confirmedOrder, setConfirmedOrder] = useState([]);
    // Getting prod. info
    const [videocards, setVideocards] = useState([]);

    // Restrict to double click on adding Button
    const [isClicked, setIsClicked] = useState(false);

    // Opening cart
    const [isCartOpened, setCartOpened] = useState(false);

    // Cart settings
    const [cartValue, setCartValue] = useState([]);
    const addToCart = async (item) => {
        try {
            let itemInCart = cartValue.find(
                (cartItem) => cartItem.title === item.title
            );
            if (itemInCart) {
                axios.delete(
                    `https://63da3cc8b28a3148f6820198.mockapi.io/cart/${itemInCart.id}`
                );
                setCartValue((prev) =>
                    prev.filter((old) => old.title !== item.title)
                );
            } else {
                setIsClicked(true);
                let { data } = await axios.post(
                    "https://63da3cc8b28a3148f6820198.mockapi.io/cart",
                    item
                );
                setIsClicked(false);
                setCartValue((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в корзину!");
        }
    };

    // Favorites settings
    const [favorites, setFavorites] = useState([]);
    const onAddFavorite = async (item) => {
        try {
            let itemInFav = favorites.find(
                (favorite) => favorite.title === item.title
            );
            if (itemInFav) {
                axios.delete(
                    `https://63da3cc8b28a3148f6820198.mockapi.io/favorites/${itemInFav.id}`
                );
                setFavorites((prev) =>
                    prev.filter((old) => old.title !== item.title)
                );
            } else {
                setIsClicked(true);
                const { data } = await axios.post(
                    "https://63da3cc8b28a3148f6820198.mockapi.io/favorites",
                    item
                );
                setIsClicked(false);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (err) {
            alert("Не удалось добавить в закладки!");
        }
    };

    // Loading checking
    const [isLoading, setIsLoading] = useState(true);

    // Waiting for all Info
    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, videocardsResponse] =
                    await Promise.all([
                        axios.get(
                            "https://63da3cc8b28a3148f6820198.mockapi.io/cart"
                        ),
                        axios.get(
                            "https://63da3cc8b28a3148f6820198.mockapi.io/favorites"
                        ),
                        axios.get(
                            "https://api.jsonbin.io/v3/b/63e0ba3cc0e7653a05707e01"
                        ),
                    ]);
                if (localStorage.orders)
                    setConfirmedOrder([...JSON.parse(localStorage.orders)]);
                setIsLoading(false);
                setCartValue(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setVideocards(videocardsResponse.data.record);
            } catch (error) {
                alert(
                    `Произошла ошибка при запросе данных. Подробнее: ${error}`
                );
            }
        }
        fetchData();
    }, []);

    const isItemInCart = (title) =>
        cartValue.some((obj) => obj.title === title);
    const isItemInFavorite = (title) =>
        favorites.some((obj) => obj.title === title);
    // Total Price
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setTotalPrice(cartValue.reduce((acc, item) => (acc += item.price), 0));
    }, [cartValue]);

    return (
        <AppContext.Provider
            value={{
                videocards,
                cartValue,
                favorites,
                isItemInCart,
                isItemInFavorite,
                isClicked,
                setCartOpened,
                setCartValue,
                setConfirmedOrder,
                confirmedOrder,
                totalPrice,
            }}
        >
            <div className="wrapper">
                <Drawer
                    onOverlayClick={() => setCartOpened(false)}
                    cartValue={cartValue}
                    visible={isCartOpened}
                />
                <Header onBasketClick={() => setCartOpened(true)} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                videocards={videocards}
                                cartValue={cartValue}
                                addToCart={addToCart}
                                setCartValue={setCartValue}
                                onAddFavorite={onAddFavorite}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites
                                onAddFavorite={onAddFavorite}
                                setCartValue={setCartValue}
                                setFavorites={setFavorites}
                            />
                        }
                    />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="*" element={<E404 />} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
