import i18n from "../i18next";

function LanguageOptins() {

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <select
            value={localStorage.getItem("language")} // activeLanguage o'rniga localStorage dan olingan tilni ishlatamiz
            onChange={(e) => changeLanguage(e.target.value)}
            className="form-select"
        >
            <option value="uz">O'zbek</option>
            <option value="ru">Рус</option>
            <option value="en">
                Eng
            </option>
        </select>
    )
}

export default LanguageOptins