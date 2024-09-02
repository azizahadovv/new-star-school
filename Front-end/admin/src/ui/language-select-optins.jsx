import React from "react";
import i18n from "../i18n";

function LanguageOptins() {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };

    const activeLanguage = localStorage.getItem("lang") || ""; // Agar `localStorage` dan qiymat topilmasa, bo'sh stringni foydalanamiz

    return (
        <select
            value={activeLanguage} // Agar `localStorage` da til yo'q bo'lsa, bo'sh stringdan foydalaniladi
            onChange={(e) => changeLanguage(e.target.value)}
            className="form-select"
        >
            <option value="uz">O'zbek</option>
            <option value="ru">Рус</option>
            <option value="en">Eng</option>
        </select>
    );
}

export default LanguageOptins;
