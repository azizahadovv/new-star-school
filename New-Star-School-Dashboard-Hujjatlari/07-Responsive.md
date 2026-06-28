# 07 — Responsive qoidalar

Asl dizayn `1920×1080` (desktop) uchun yaratilgan. Quyida tizimni planshet va mobil qurilmalarga moslashtirish qoidalari berilgan.

---

## 1. Breakpoint'lar

| Nom | Kenglik | Qurilma |
|-----|---------|---------|
| `xs` | < 480px | Telefon (kichik) |
| `sm` | 480–767px | Telefon |
| `md` | 768–1023px | Planshet |
| `lg` | 1024–1439px | Noutbuk |
| `xl` | ≥ 1440px | Desktop (asl dizayn) |

```css
/* Mobile-first media querylar */
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1440px) { /* xl */ }
```

---

## 2. App Shell moslashuvi

| Element | Desktop (xl/lg) | Planshet (md) | Mobil (xs/sm) |
|---------|-----------------|---------------|----------------|
| Sidebar | doimiy 300px | yig'ilgan 72px (ikonka) | yashirin (drawer) |
| Topbar | to'liq | to'liq | ixcham, ☰ tugma |
| Content | grid 1fr | grid 1fr | bitta ustun |

### Mobil sidebar (off-canvas drawer)
- `☰` bosilganda chapdan suriladi (`transform: translateX`)
- Orqa fon overlay bilan qoplanadi
- Tashqariga bosilsa yopiladi

```css
.sidebar {
  position: fixed; left: 0; top: 0; height: 100vh;
  transform: translateX(-100%);
  transition: transform var(--dur-base) var(--ease-standard);
}
.sidebar[data-open="true"] { transform: translateX(0); }

@media (min-width: 1024px) {
  .sidebar { position: static; transform: none; }
}
```

---

## 3. Kartochkalar gridi

```css
.card-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;                /* mobil: 1 ustun */
}
@media (min-width: 480px)  { .card-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 768px)  { .card-grid { grid-template-columns: repeat(3,1fr); } }
@media (min-width: 1024px) { .card-grid { grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); } }
```

| Ekran | Kartochkalar/qator |
|-------|--------------------|
| Mobil | 1 |
| Telefon (katta) | 2 |
| Planshet | 3 |
| Desktop | 4–6 (auto-fill) |

---

## 4. Jadvallar (eng muhim muammo)

Keng jadvallar (O'qituvchilar, O'quvchilar, Xodimlar) kichik ekranga sig'maydi. Uchta strategiya:

### Strategiya A — Gorizontal scroll (oddiy)
```css
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.table { min-width: 720px; }
```

### Strategiya B — Kartochkaga aylantirish (tavsiya etiladi)
Mobilda har bir jadval qatori "stacked card" ga aylanadi:

```
┌──────────────────────────────┐
│ [avatar] Kamolov Xasan        │
│ Sinf: 9   ·   Guruh: B        │
│ 📞 +998 90 774 41 41          │
│ Ota-onasi: +998 90 774 41 41  │
│              [Batafsil ›]  ⋮  │
└──────────────────────────────┘
```

```css
@media (max-width: 767px) {
  .table thead { display: none; }
  .table tr { display: block; margin-bottom: var(--space-3);
              background: var(--color-bg-surface); border-radius: var(--radius-lg);
              padding: var(--space-4); box-shadow: var(--shadow-card); }
  .table td { display: flex; justify-content: space-between; padding: 4px 0; }
  .table td::before { content: attr(data-label); color: var(--color-text-secondary); font-weight: 500; }
}
```

### Strategiya C — Ustunlarni yashirish
Muhim bo'lmagan ustunlar (Tug'ilgan sana) `md` dan kichikda yashiriladi.

---

## 5. Dars jadvali (haftalik grid)

- Desktop: 6 kun, 2 qatorli grid (3×2)
- Planshet: 2 ustun
- Mobil: 1 ustun (kunlar ketma-ket) yoki kun bo'yicha tab/akkordeon

```css
.week-grid { display: grid; gap: var(--space-4); grid-template-columns: 1fr; }
@media (min-width: 768px)  { .week-grid { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 1200px) { .week-grid { grid-template-columns: repeat(3,1fr); } }
```

---

## 6. Profil detali (2 ustun → 1 ustun)

```css
.profile-layout { display: grid; grid-template-columns: 1fr; gap: var(--space-6); }
@media (min-width: 768px) { .profile-layout { grid-template-columns: 300px 1fr; } }
```
Mobilda: rasm va tugmalar tepada, ma'lumotlar jadvali ostida.

---

## 7. Modal

- Desktop: markazda `480px`
- Mobil: pastdan chiqadigan "bottom sheet" yoki to'liq ekranga yaqin (`width: calc(100% - 32px)`)

---

## 8. Topbar moslashuvi

| Element | Mobilda |
|---------|---------|
| Page title | qisqartiriladi yoki yashiriladi |
| Til tanlash | faqat bayroq (matnsiz) |
| Bildirishnoma | qoladi |
| User chip | faqat avatar (ism yashirin) |

---

## 9. Touch (sezgir) qoidalar

- Minimal bosish maydoni: `44×44px` (Apple HIG / WCAG)
- Kebab, strelkalar, tugmalar mobilda kattalashtiriladi
- Hover holatlari touch'da `:active` bilan almashtiriladi

---

## 10. Tasvir va shrift moslashuvi

```css
img, .avatar { max-width: 100%; height: auto; }
.page-title { font-size: clamp(20px, 4vw, 24px); }
.content    { padding: clamp(12px, 4vw, 24px); }
```

---

## 11. Tekshiruv ro'yxati (responsive QA)

- [ ] Sidebar mobilda drawer sifatida ishlaydi
- [ ] Barcha jadvallar mobilda o'qiladi (scroll yoki card)
- [ ] Tugmalar ≥44px
- [ ] Modal mobilda to'liq ko'rinadi
- [ ] Dars jadvali mobilda buzilmaydi
- [ ] Matn `xs` da ham o'qiladi (min 13px)

---

⬅️ [06 — Komponentlar](06-Komponentlar.md) · ➡️ [08 — Animatsiyalar](08-Animatsiyalar.md)
