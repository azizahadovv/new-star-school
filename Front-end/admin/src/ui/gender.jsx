import React from 'react'

function Gender({ gender, setGender,style={ height: "55px", maxWidth: "350px" } }) {
    return (
        <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select"
            style={style}
            aria-label="Default select example"
        >
            <option hidden>
                Gender *
            </option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
        </select>
    )
}

export default Gender