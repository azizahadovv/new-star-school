import React from 'react'

function Nationality({ nationality, setNationality,style={ height: "55px", maxWidth: "350px" } }) {
    return (
        <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            className="form-select"
            style={style}
            aria-label="Default select example"
        >
            <option hidden>
                Millati *
            </option>
            <option value="uzbek">O'zbek</option>
            <option value="rus">Rus</option>
        </select>
    )
}

export default Nationality