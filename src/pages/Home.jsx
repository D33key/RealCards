import React, { useState } from "react";
import Card from "../components/Card/Card";
import Search from "../components/Search/Search";
import Slider from '../components/Slider/Slider';

const Home = ({
    isLoading,
    videocards,
    setCartValue,
    onAddFavorite,
    addToCart,
}) => {
    // Search input
    const [searchValue, setSearchValue] = useState("");
    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    };
    const resetSearchValue = () => {
        setSearchValue("");
    };
    const renderItems = () => {
        const filteredCards = videocards.filter((card) =>
            card.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filteredCards).map(
            (card, index) => (
                <Card
                    {...card}
                    key={index}
                    setCartValue={setCartValue}
                    onAddFavorite={onAddFavorite}
                    addToCart={addToCart}
                    isLoading={isLoading}
                />
            )
        );
    };

    return (
        <div className="content">
            <Slider />
            <div className="titleWrapper">
                <h1>
                    {searchValue
                        ? `Поиск по запросу: "${searchValue}"`
                        : "Все видеокарты"}
                </h1>
                <Search
                    searchValue={searchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    resetSearchValue={resetSearchValue}
                />
            </div>
            <div className="items">{renderItems()}</div>
        </div>
    );
};

export default Home;
