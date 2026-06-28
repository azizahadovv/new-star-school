# 04 — Typography (Tipografika)

Tizimning tipografik tizimi o'qilishi qulaylik va izchillikka qaratilgan. Yagona sans-serif oilasidan foydalaniladi, ranglar bilan ierarxiya yaratiladi.

---

## 1. Shrift oilasi

```css
--font-base: 'Inter', 'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif;
```

- **Birlamchi:** Inter — interfeyslar uchun optimallashtirilgan, kirill va lotin to'liq qo'llab-quvvatlaydi (o'zbek tili uchun muhim).
- **Muqobil:** Poppins — sarlavhalar uchun biroz geometrik ko'rinish beradi.
- **Zaxira:** tizim shriftlari.

> O'zbek tilidagi maxsus belgilar (`ʻ`, `gʻ`, `oʻ`, `sh`, `ch`) Inter'da to'g'ri ko'rsatiladi.

### Ulanish (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 2. O'lcham shkalasi (Type scale)

| Daraja | Token | Size / Line-height | Vazn | Qo'llanilishi |
|--------|-------|--------------------|------|---------------|
| Display | — | 32 / 1.2 | 700 | (kelajak — bosh sahifa banner) |
| H1 — Sahifa sarlavhasi | `fs-xl` | 24 / 1.3 | 700 | "Dars jadvali", "O'qituvchilar" |
| H2 — Bo'lim | `fs-md` | 16 / 1.4 | 600 | "SHAXSIY MA'LUMOTLAR" (ko'k) |
| H3 — Kartochka | `fs-md` | 16 / 1.4 | 700 | "1-A SINF" (ko'k) |
| Body L | `fs-md` | 16 / 1.5 | 400 | Kengaytirilgan matn |
| Body — asosiy | `fs-base` | 14 / 1.5 | 400 | Jadval qiymatlari, ismlar |
| Label — jadval sarlavha | `fs-base` | 14 / 1.4 | 500 | "Telefon raqam", "Fan" |
| Caption — yordamchi | `fs-sm` | 13 / 1.4 | 400 | "32 ta o'quvchi", rol nomi |
| Micro | `fs-xs` | 12 / 1.3 | 400 | Belgilar, vaqt |

---

## 3. Vazn (Font weight)

| Vazn | Qiymat | Qachon |
|------|--------|--------|
| Regular | 400 | Asosiy matn, qiymatlar |
| Medium | 500 | Jadval sarlavhalari, menyu elementlari |
| Semibold | 600 | Bo'lim sarlavhalari, tugma matni |
| Bold | 700 | Sahifa sarlavhalari, kartochka nomlari |

---

## 4. Matn ranglari ierarxiyasi

```
Asosiy matn      →  #263039  (navy-900)   — eng kuchli
Ikkilamchi matn  →  #9AA7B2  (grey-400)   — yordamchi
Havola / aksent  →  #125DAC  (blue-500)   — bosiladigan
Sidebar matni    →  #FFFFFF  (grey-0)     — to'q fonda
Xatolik          →  #C70909  (red-500)
```

Interfeysda sarlavhalar **ranglari** (ko'k H2, navy H1) orqali ajratiladi — bu zamonaviy va toza ko'rinish beradi.

---

## 5. Amaliy CSS

```css
body {
  font-family: var(--font-base);
  font-size: var(--fs-base);          /* 14px */
  line-height: var(--lh-base);        /* 1.5 */
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.page-title   { font-size: var(--fs-xl); font-weight: 700; line-height: 1.3; }
.section-title{ font-size: var(--fs-md); font-weight: 600; color: var(--color-primary);
                text-transform: uppercase; letter-spacing: .02em; }
.card-title   { font-size: var(--fs-md); font-weight: 700; color: var(--color-primary); }
.table-head   { font-size: var(--fs-base); font-weight: 500; color: var(--color-text-secondary); }
.caption      { font-size: var(--fs-sm); color: var(--color-text-secondary); }
```

---

## 6. Tipografik qoidalar

1. **Maksimal qator uzunligi** — matn bloklari uchun ~70 belgidan oshmasin.
2. **Sarlavhalarda** `letter-spacing` biroz oshiriladi (`0.02em`) — H2 uchun.
3. **UPPERCASE** faqat bo'lim sarlavhalari uchun ("SHAXSIY MA'LUMOTLAR").
4. **Raqamlar** (telefon, sana, baho) — `font-variant-numeric: tabular-nums` bilan tekislanadi.
5. O'zbekcha apostrof — to'g'ri belgi `ʻ` (U+02BB) yoki `'` ishlatiladi, ASCII `'` emas.

```css
.phone, .grade, .date { font-variant-numeric: tabular-nums; }
```

---

## 7. Responsive tipografika

Kichik ekranlarda sarlavhalar biroz kichrayadi (fluid type ixtiyoriy):

```css
.page-title { font-size: clamp(20px, 2.2vw, 24px); }
```

Batafsil → [07-Responsive.md](07-Responsive.md)

---

⬅️ [03 — Design Tokens](03-Design-Tokens.md) · ➡️ [05 — Layout, Grid, Spacing](05-Layout-Grid-Spacing.md)
