/* ============================================================
   Umumiy validatsiya — New Star School
   Har bir validator: yaroqli bo'lsa "" qaytaradi, aks holda
   i18n KALITINI qaytaradi (komponent t(kalit) bilan ko'rsatadi).
   Kalitlar: roles/<role>/lang/{uz,ru,en}.js (v_* prefiks).
   ============================================================ */

const str = (v) => (v == null ? "" : String(v).trim());

// ── Atomar validatorlar ─────────────────────────────────────
export const required = (v) => (str(v) === "" ? "v_required" : "");

// Ism/familiya/otasining ismi — harflar (lotin+kiril+o'zbek), 2..50
export const name = (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  if (s.length < 2) return "v_too_short";
  if (s.length > 50) return "v_too_long";
  return /^[A-Za-zÀ-ÿА-Яа-яЁёЎўҚқҒғҲҳʻʼ'’\- ]+$/.test(s) ? "" : "v_name";
};

// Telefon — O'zbekiston formati: +998XXXXXXXXX yoki 9 ta raqam
export const phone = (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  const digits = s.replace(/[^\d+]/g, "");
  return /^\+?998\d{9}$/.test(digits) || /^\d{9}$/.test(digits) ? "" : "v_phone";
};

// Login — 3..30, harf/raqam/_.- ruxsat
export const login = (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  if (s.length < 3) return "v_login_short";
  return /^[A-Za-z0-9_.\-]{3,30}$/.test(s) ? "" : "v_login_chars";
};

// Parol — kamida 6 belgi
export const password = (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  return s.length >= 6 ? "" : "v_password_short";
};

// Yangilashda parol ixtiyoriy bo'lishi mumkin (bo'sh = o'zgartirilmaydi)
export const passwordOptional = (v) => {
  const s = str(v);
  if (s === "") return "";
  return s.length >= 6 ? "" : "v_password_short";
};

// Tug'ilgan sana — bo'sh emas, kelajakda emas, mantiqiy oraliq (1900..bugun)
export const birthDate = (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "v_date";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (d > today) return "v_date_future";
  if (d.getFullYear() < 1900) return "v_date_old";
  return "";
};

// Matn maydon — bo'sh emas + ixtiyoriy maksimal uzunlik
export const text = (max = 120) => (v) => {
  const s = str(v);
  if (s === "") return "v_required";
  return s.length > max ? "v_too_long" : "";
};

// ── Form-darajali yordamchi ─────────────────────────────────
// config: { maydon: { value, validators: [fn, ...] }, ... }
// natija: { maydon: "kalit", ... } (faqat xato maydonlar)
export const validate = (config) => {
  const errors = {};
  for (const field in config) {
    const { value, validators = [] } = config[field];
    for (const fn of validators) {
      const key = fn(value);
      if (key) {
        errors[field] = key;
        break;
      }
    }
  }
  return errors;
};

// MUI TextField uchun qulay yordamchi: error + helperText proplari
export const fieldProps = (errors, t, field) => ({
  error: Boolean(errors[field]),
  helperText: errors[field] ? t(errors[field]) : "",
});
