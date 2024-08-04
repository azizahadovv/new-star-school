import { useTranslation } from "react-i18next"

function Term({ value, setValue }) {
  const { t } = useTranslation()
  return (
    <select required={true} value={value} onChange={(e) => setValue(e.target.value)} style={{ height: "50px" }} className="form-select">
      <option hidden>{t("term")}</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  )
}

export default Term
