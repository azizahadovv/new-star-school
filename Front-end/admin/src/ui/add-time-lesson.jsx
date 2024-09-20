import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function AddTimeLesson({ value, setValue }) {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setValue(e?.target?.value);
  };

  return (
    <select value={value} onChange={handleChange} className="form-select">
      <option hidden value={""}>
        {t("select_hour")}
      </option>
      {[...Array(15)].map((_, index) => {
        const hour = index + 1;
        return (
          <option key={hour} value={hour}>
            {hour} - {t("hour")}
          </option>
        );
      })}
    </select>
  );
}

export default AddTimeLesson;
