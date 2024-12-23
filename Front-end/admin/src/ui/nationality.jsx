import React from 'react'
import { useTranslation } from 'react-i18next'

function Nationality({ nationality, setNationality,style={ height: "55px", maxWidth: "350px" } }) {
        const { t } = useTranslation()
    return (
        <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            className="form-select"
            style={style}
            
        >
            <option hidden>
                {t("nation")} *
            </option>
            <option value="Uzbek">O'zbek</option>
            <option value="Rus">Rus</option>
        </select>
    )
}

export default Nationality