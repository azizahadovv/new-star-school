import React from 'react'
import { useTranslation } from 'react-i18next'

function SelectJob({ value, setValue }) {
    const { t } = useTranslation()
    return (
        <select value={value} onChange={(e) => setValue(e.target.value)} className="form-select" aria-label="Default select example">
            <option hidden >{t("table_classes")}</option>
            <option value="gardener">{t("gardener")}</option>
            <option value="cook">{t("cook")}</option>
            <option value="cleaner">{t("cleaner")}</option>
            <option value="guard">{t("guard")}</option>
        </select>
    )
}

export default SelectJob
