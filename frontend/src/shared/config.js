// Markaziy (universal) konfiguratsiya — butun ilova uchun yagona manba.
// API manzili bitta shu yerdan boshqariladi:
//  • lokal ishlab chiqish: .env.local -> REACT_APP_API_URL=http://localhost:8000/api/
//  • production: fallback -> https://nss.ix.tc/api/
// Eslatma: avval bu URL 6 ta api.js da qattiq (hardcode) yozilgan edi.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://nss.ix.tc/api/";
