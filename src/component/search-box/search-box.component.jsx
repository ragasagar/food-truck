import React from "react";
import "./search-box.style.scss";

/**
 * Functional Component which provide search input tags to other component.
 * @param {*} param0 
 */
export const SearchBox = ({ placeholder, handleChange }) => (
    <input
        type="search"
        placeholder={placeholder}
        className="search searchBox"
        onChange={handleChange}
    />
)

export default SearchBox