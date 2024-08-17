import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruLang from "./lang/ru";
import enLang from "./lang/en";
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
    fallbackLng: "en",
    lng: localStorage.getItem("lang"),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;