import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./lang/en";
import ruLang from "./lang/ru";
import uzLang from "./lang/uz";

const resources = {
  en: {
    translation: enLang,
  },
  ru: {
    translation: ruLang,
  },
  uz: {
    translation: uzLang,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    lng:localStorage.getItem("language"), 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;