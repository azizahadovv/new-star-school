// Birlashtirilgan ilovadagi rollar va ularning route prefiksi / yo'nalishi.
// Hozircha faqat ADMIN to'liq ko'chirilgan (Stage 1). Qolganlari keyingi
// bosqichlarda roles/ ostiga qo'shiladi.
export const ROLE_PRIORITY = [
  "ADMIN",
  "DIRECTOR",
  "DEPUTY_DIRECTOR",
  "TEACHER",
  "STUDENT",
];

// Hozir birlashtirilgan ilova ichida ishlaydigan rollar.
export const IMPLEMENTED_ROLES = [
  "ADMIN",
  "DIRECTOR",
  "DEPUTY_DIRECTOR",
  "TEACHER",
  "STUDENT",
];

// Login javobidagi roles massividan aktiv rolni tanlash (prioritet bo'yicha).
export function pickActiveRole(roles = []) {
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) return role;
  }
  return null;
}
