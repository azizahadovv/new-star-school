import React from 'react'

function Nationality({ nationality, setNationality,style={ height: "55px", maxWidth: "350px" } }) {
    return (
        <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            className="form-select"
            style={style}
            
        >
            <option hidden>
                Millati *
            </option>
            <option value="Uzbek">O'zbek</option>
            <option value="Rus">Rus</option>
        </select>
    )
}

export default Nationality