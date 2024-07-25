import React from 'react'

function Level({ level, setLevel,style={ height: "55px", maxWidth: "350px" } }) {
    return (
        <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="form-select"
            style={style}
            aria-label="Default select example"
        >
            <option hidden>
                Lavozimi *
            </option>
            <option value="director">Direktor</option>
            <option value="zavuch">Direktor o'rinbosari</option>
            <option value="teacher">Oddiy o'qituvchi</option>
        </select>
    )
}

export default Level