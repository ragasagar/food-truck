import React from "react";
import "./search-box.style.scss";

export const SearchBox = ({ id, placeholder, handleChange, value }) => (
    <input
        id={id}
        type="search"
        placeholder={placeholder}
        className="search searchBox"
        onChange={handleChange}
        value={value}
    />
)

export default SearchBox