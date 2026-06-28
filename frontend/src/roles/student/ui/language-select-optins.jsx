import { useTranslation } from 'react-i18next';

function LanguageOptions() {
    const { i18n } = useTranslation();  // useTranslation hookni chaqirish

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };

    const currentLang = localStorage.getItem("lang") || "";  // Null qiymatdan qochish uchun

    return (
        <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="form-select"
        >
            <option value="uz">O'zbek</option>
            <option value="ru">Рус</option>
            <option value="en">Eng</option>
        </select>
    );
}

export default LanguageOptions;
