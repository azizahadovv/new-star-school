import React from 'react'

function Gender({ gender, setGender,style={ height: "55px", maxWidth: "350px" } }) {
    return (
        <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select"
            style={style}
            
        >
            <option hidden>
                Gender *
            </option>
            <option value="Male">Erkak</option>
            <option value="Female">Ayol</option>
        </select>
    )
}

export default Gender