import React from 'react'
import "./select-box.style.scss";

/**
 * Functional Component which provide select tag to other component.
 * @param {*} param0 
 */
const SelectBox = ({ onChange }) => {
    return <select id="foodType" name="Facility-Type" className="select" onChange={onChange}>
        <option value="">All</option>
        <option value="Truck">Food-Truck</option>
        <option value="Push Cart">Push-Cart</option>
    </select>
}
export default SelectBox;