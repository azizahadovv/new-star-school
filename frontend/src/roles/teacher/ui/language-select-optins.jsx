import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

function LanguageOptins() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem("lang");
    setSelectedLanguage(savedLanguage || "uz"); // Default tilni O'zbek qilib belgilash
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setSelectedLanguage(lng);
  };

  return (
    <select
      value={selectedLanguage}
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
