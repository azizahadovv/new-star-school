# 39 — Accessibility (Foydalanish qulayligi — a11y)

Tizim barcha foydalanuvchilar, jumladan nogironligi bo'lganlar uchun ham qulay bo'lishi kerak. Mezon: **WCAG 2.1 AA** darajasi.

---

## 1. To'rt asosiy prinsip (POUR)

| Prinsip | Ma'no | Tizimda |
|---------|-------|---------|
| **Perceivable** (idrok etiladigan) | Kontent ko'rinadigan/eshitiladigan | Kontrast, alt matn, label |
| **Operable** (boshqariladigan) | Klaviatura bilan ishlatish mumkin | Tab, fokus, Esc |
| **Understandable** (tushunarli) | Aniq, izchil | Sodda til, xato xabarlari |
| **Robust** (mustahkam) | Yordamchi texnologiyalar bilan ishlaydi | Semantik HTML, ARIA |

---

## 2. Rang kontrasti (WCAG AA)

Talab: oddiy matn ≥ **4.5:1**, katta matn ≥ **3:1**.

| Kombinatsiya | Holat |
|--------------|-------|
| Navy matn (`#263039`) / oq fon | ✅ ~13:1 — a'lo |
| Ko'k (`#125DAC`) / oq | ✅ ~5.4:1 — yaxshi |
| Qizil (`#C70909`) / oq | ✅ ~5.9:1 — yaxshi |
| Kulrang (`#9AA7B2`) / oq | ⚠️ ~2.5:1 — **faqat yordamchi/katta matn uchun** |
| Oq matn / navy sidebar | ✅ — a'lo |

> ⚠️ **Tavsiya:** kulrang `#9AA7B2` yordamchi matn juda kichik o'lchamda ishlatilmasin; muhim ma'lumot uchun `#5B6B79` (to'qroq) ishlatilsin.

---

## 3. Faqat rangga tayanmaslik (muhim!)

Ma'lumot **faqat rang** bilan berilmasligi kerak (rang ko'r foydalanuvchilar uchun):

| Element | ❌ Faqat rang | ✅ Rang + qo'shimcha |
|---------|--------------|----------------------|
| Davomat | yashil/qizil nuqta | "Ha"/"Yo'q" matni + rang |
| Baho | rangli raqam | raqam (3/4/5) + ixtiyoriy ikonka |
| Faol menyu | rang | rang + bold + indikator |
| Xato maydon | qizil chegara | qizil + xato matni + ikonka |

```jsx
// Badge — rang + matn (faqat rang emas)
<Badge tone="success">Ha</Badge>     {/* yashil fon + "Ha" matni */}
<Badge tone="danger">Yo'q</Badge>    {/* qizil fon + "Yo'q" matni */}
```

---

## 4. Klaviatura navigatsiyasi

Butun tizim sichqonchasiz ishlatilishi mumkin bo'lsin:

| Klavisha | Amal |
|----------|------|
| `Tab` / `Shift+Tab` | Elementlar orasida o'tish |
| `Enter` / `Space` | Tugma/havola faollashtirish |
| `Esc` | Modal/dropdown yopish |
| `↑ ↓` | Dropdown/menyu ichida harakat |
| `Enter` | Forma yuborish |

**Qoidalar:**
- Barcha interaktiv elementlar `Tab` bilan yetib boriladigan
- Fokus tartibi mantiqiy (vizual tartibga mos)
- **Fokus halqasi ko'rinadigan** (`:focus-visible`)
- Klikли `div` emas, `<button>`/`<a>` ishlatiladi

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus);   /* aniq ko'rinadigan halqa */
}
```

---

## 5. Fokus boshqaruvi (modal)

- Modal ochilganda fokus → modal ichidagi birinchi maydon
- **Focus trap** — `Tab` modal ichida aylanadi (tashqariga chiqmaydi)
- Modal yopilganda fokus → uni ochgan tugmaga qaytadi
- `Esc` bilan yopiladi

→ implementatsiya: [30-Frontend-ui-komponentlar.md](30-Frontend-ui-komponentlar.md) `Modal.jsx`

---

## 6. Semantik HTML va ARIA

### Semantik teglar
```html
<header> ... </header>          <!-- topbar -->
<nav aria-label="Asosiy navigatsiya"> ... </nav>   <!-- sidebar -->
<main> ... </main>              <!-- content -->
<table> <th scope="col"> ... </table>   <!-- jadvallar -->
```

### ARIA qo'shimchalari
| Element | ARIA |
|---------|------|
| Modal | `role="dialog" aria-modal="true" aria-labelledby` |
| Kontekst menyu | `role="menu"` / `role="menuitem"` |
| Choraklar | `role="tablist"` / `role="tab"` + `aria-selected` |
| Pagination | `nav[aria-label]` + `aria-current="page"` |
| Bildirishnoma soni | `aria-label="3 ta o'qilmagan xabar"` |
| Faqat-ikonka tugma | `aria-label="..."` |
| Xato xabari | `role="alert"` / `aria-live="polite"` |
| Dekorativ ikonka | `aria-hidden="true"` |

---

## 7. Formalar

- Har input uchun `<label>` (yoki `aria-label`)
- Majburiy maydonlar: `aria-required="true"` + vizual belgi
- Xatolar: maydon yonida, `aria-describedby` bilan bog'langan
- Placeholder **label o'rnini bosmaydi** (placeholder yo'qoladi)

```jsx
<label htmlFor="phone">Telefon raqam</label>
<input id="phone" aria-required="true" aria-describedby="phone-err" />
<span id="phone-err" role="alert">Noto'g'ri format</span>
```

---

## 8. Tasvirlar va media

- Mazmunli rasmlar: `alt` matni ("Foydalanuvchi rasmi: Kamolov Xasan")
- Dekorativ rasmlar: `alt=""` (skrinrider o'tkazib yuboradi)
- Logotip: `alt="New Star School"`
- Avatar fallback: bosh harflari + `aria-label`

---

## 9. Matn va o'lcham

- Matn `200%` gacha kattalashtirilganda buzilmaydi (`rem` birliklar)
- Minimal matn o'lchami: 13px (yordamchi), 14px (asosiy)
- Qator oralig'i ≥ 1.5
- Matn `px` emas, `rem` da (foydalanuvchi sozlamalariga moslashish)
- Touch maydoni ≥ 44×44px

---

## 10. Harakat va animatsiya

`prefers-reduced-motion` hurmat qilinadi (vestibulyar buzilishlar uchun):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## 11. Til va kontent

- `<html lang="uz">` — skrinrider to'g'ri talaffuz qiladi
- Sodda, aniq til (rasmiy-do'stona)
- Xato xabarlari tushunarli ("Login yoki parol noto'g'ri", kod emas)
- Izchil terminologiya (bir tushuncha — bir nom)

---

## 12. Skrinrider uchun yashirin matn

Vizual ko'rinmaydigan, lekin skrinrider o'qiydigan matn:

```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

```jsx
<button>
  <Trash2 aria-hidden="true" />
  <span className="sr-only">O'quvchini o'chirish</span>
</button>
```

---

## 13. Accessibility tekshiruv ro'yxati (WCAG 2.1 AA)

- [ ] `lang="uz"` o'rnatilgan
- [ ] Barcha rang kontrastlari ≥ 4.5:1 (oddiy matn)
- [ ] Ma'lumot faqat rangga tayanmaydi (Ha/Yo'q, baholar)
- [ ] Butun tizim klaviatura bilan ishlatiladi
- [ ] Fokus halqasi har doim ko'rinadi
- [ ] Modal'da focus trap + Esc
- [ ] Har input'da label
- [ ] Faqat-ikonka tugmalarda `aria-label`
- [ ] Jadvallar `<th scope>` bilan
- [ ] Rasmlar mazmunli `alt` bilan
- [ ] Xato xabarlari `role="alert"` bilan
- [ ] `prefers-reduced-motion` qo'llab-quvvatlanadi
- [ ] Touch maydonlari ≥ 44px
- [ ] Semantik HTML (nav, main, header, button, a)

> **Tavsiya:** avtomatik tekshiruv uchun **axe DevTools**, **Lighthouse** (Accessibility), **WAVE** kabi vositalardan foydalaning. Lekin avtomatik test 100% kafolat bermaydi — klaviatura va skrinrider bilan qo'lda sinov ham zarur.

---

⬅️ [38 — SEO](38-SEO.md) · 🏠 [README — Mundarija](README.md)
