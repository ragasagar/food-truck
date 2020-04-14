import React from "react";
import "./search-box.style.scss";

export const SearchBox = ({ placeholder, handleChange }) => (
    <input
        type="search"
        placeholder={placeholder}
        className="search"
        onChange={handleChange}
    />
)

export default SearchBox