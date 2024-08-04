import React from "react";
import { useTranslation } from "react-i18next";

function Level({
  level,
  setLevel,
  style = { height: "55px", maxWidth: "350px" },
}) {
  const {t}=useTranslation()
  return (
    <select
      value={level}
      onChange={(e) => setLevel(e.target.value)}
      required
      className="form-select"
      style={style}
    >
      <option hidden>{t("level")} *</option>
      <option selected value="TEACHER">
      {t("teacher_level")}
      </option>
      <option value="DEPUTY_DIRECTOR">{t("deputy_director")}</option>
      <option value="DIRECTOR">{t("director")}</option>
      <option value="ADMIN">{t("admin")}</option>
    </select>
  );
}

export default Level;
