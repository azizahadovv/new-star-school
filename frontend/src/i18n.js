import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Har rolning tarjimalari (UI matni o'zgarmasligi uchun barchasi yuklanadi).
import adminEn from "./roles/admin/lang/en";
import adminRu from "./roles/admin/lang/ru";
import adminUz from "./roles/admin/lang/uz";

import teacherEn from "./roles/teacher/lang/en";
import teacherRu from "./roles/teacher/lang/ru";
import teacherUz from "./roles/teacher/lang/uz";

import studentEn from "./roles/student/lang/en";
import studentRu from "./roles/student/lang/ru";
import studentUz from "./roles/student/lang/uz";

import deputyEn from "./roles/deputy/lang/en";
import deputyRu from "./roles/deputy/lang/ru";
import deputyUz from "./roles/deputy/lang/uz";

import directorEn from "./roles/director/lang/en";
import directorRu from "./roles/director/lang/ru";
import directorUz from "./roles/director/lang/uz";

// Rollar bir vaqtda bitta mount bo'ladi, kalitlar deyarli bir xil. Birlashtiramiz
// (flat obyektlar) — har rol o'z matnini ko'radi.
const merge = (...objs) => Object.assign({}, ...objs);

const resources = {
  en: {
    translation: merge(adminEn, teacherEn, studentEn, deputyEn, directorEn),
  },
  ru: {
    translation: merge(adminRu, teacherRu, studentRu, deputyRu, directorRu),
  },
  uz: {
    translation: merge(adminUz, teacherUz, studentUz, deputyUz, directorUz),
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "uz",
  lng: localStorage.getItem("lang"),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
