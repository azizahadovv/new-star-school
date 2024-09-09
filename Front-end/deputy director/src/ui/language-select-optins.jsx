import React from "react";
import i18n from "../i18n";

function LanguageOptins() {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };

    // localStorage'dan olingan tilni tekshirish
    const savedLang = localStorage.getItem("lang") || 'uz'; // Agar til yo'q bo'lsa, 'uz' ni tanlang

    return (
        <select
            value={savedLang} // null bo'lsa, 'uz' ni tanlash
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
