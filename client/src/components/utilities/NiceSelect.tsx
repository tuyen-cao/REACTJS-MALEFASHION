import React, { useEffect, useRef, useState } from 'react'
import $ from "jquery";
import { sortOptionType } from 'models/types';
//require("jquery-nice-select");

const NiceSelectComponent: React.FC<{ handleChange: (value: string) => void, options: sortOptionType[] }> = (props) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const { handleChange, options } = props

    useEffect(() => {
        // $(selectRef.current).niceSelect();
    }, []);
    return (
        <>
            {" "}<select ref={selectRef} id="test" onChange={(e) => handleChange(e.target.value)} >
                {options.map((option) => {
                    return <option value = { option.value } > { option.text }</option>
                })}
        </select>
        </>
    )
}

export default NiceSelectComponent
