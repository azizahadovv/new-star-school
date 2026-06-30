// Markaziy (universal) konfiguratsiya — butun ilova uchun yagona manba.
// API manzili bitta shu yerdan boshqariladi:
//  • lokal ishlab chiqish: .env.local -> REACT_APP_API_URL=http://localhost:8000/api/
//  • production: fallback -> https://newstarschool.uz/api/
// Eslatma: avval bu URL 6 ta api.js da qattiq (hardcode) yozilgan edi.
// Eski domen (nss.ix.tc) ishlamaydi — newstarschool.uz ga ko'chirildi.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://newstarschool.uz/api/";

// Sayt manzili (SEO/canonical/OG uchun)
export const SITE_URL =
  process.env.REACT_APP_SITE_URL || "https://newstarschool.uz";
