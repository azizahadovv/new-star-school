import React from "react";
import i18n from "../i18next";
import { withNamespaces } from "react-i18next";
function LanguageOptins() {
  const changeLanguage = (lng) => {
    localStorage.setItem("language", lng)
    i18n.changeLanguage(lng);
  };

  return (
    <select
      value={localStorage.getItem("language")}
      onChange={(e) => changeLanguage(e.target.value)}
      className="form-select"
    >
      <option value="uz">O'zbek</option>
      <option value="ru">Рус</option>
      <option value="en">
        Eng
      </option>
    </select>
  );
}

export default LanguageOptins;
