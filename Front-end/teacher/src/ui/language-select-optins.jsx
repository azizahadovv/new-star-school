import { useTranslation } from 'react-i18next';

function LanguageOptins() {
  const { i18n } = useTranslation();  // useTranslation hookni chaqirish

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <select
      value={localStorage.getItem("lang")}
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
