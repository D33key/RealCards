import React from 'react';
import RemoveSVG from "./assets/removeBtn.svg";
import SearchSVG from "./assets/searchIcon.svg";

const Search = ({ searchValue, onChangeSearchInput, resetSearchValue }) => {
    return (
        <div className="search">
            <img src={SearchSVG} alt="Search" />
            <input
                onChange={onChangeSearchInput}
                type="text"
                placeholder="Поиск..."
                value={searchValue}
            />
            {searchValue ? <img onClick={resetSearchValue} src={RemoveSVG} alt="Search" /> : null}
        </div>
    );
};

export default Search;