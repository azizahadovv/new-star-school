import React from 'react'
import { useTranslation } from 'react-i18next'

function Gender({ gender, setGender,style={ height: "55px", maxWidth: "350px" } }) {
    const { t } = useTranslation()
    return (
        <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select"
            style={style}
            
        >
            <option hidden>
                {t("gender")} *
            </option>
            <option value="male"> {t("male")}</option>
            <option value="female"> {t("female")}</option>
        </select>
    )   
}

export default Gender