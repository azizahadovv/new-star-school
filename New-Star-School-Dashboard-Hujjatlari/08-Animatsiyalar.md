# 08 — Animatsiyalar (Motion design)

Animatsiyalar tizimga "tirik" tuyg'u beradi, lekin interfeysni sekinlashtirmasligi kerak. Prinsip: **tez, nozik, maqsadli**.

---

## 1. Motion tokenlari

| Token | Qiymat | Qo'llanilishi |
|-------|--------|---------------|
| `--dur-fast` | `150ms` | Hover, fokus, tugma |
| `--dur-base` | `220ms` | Modal, dropdown, sahifa o'tish |
| `--dur-slow` | `350ms` | Drawer, katta panellar |
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | Umumiy |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` | Kirish (enter) |
| `--ease-in` | `cubic-bezier(.4,0,1,1)` | Chiqish (exit) |

---

## 2. Interaktiv elementlar

### Tugma (Button)
```css
.btn {
  transition: background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.btn:hover  { background: var(--color-primary-hover); }
.btn:active { transform: scale(.98); }
.btn:focus-visible { box-shadow: 0 0 0 3px var(--color-focus-ring); }
```

### Kartochka (Card hover)
```css
.card {
  transition: transform var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
```

### Jadval qatori
```css
.row { transition: background var(--dur-fast) var(--ease-standard); }
.row:hover { background: #F9FBFC; }
```

### Sidebar menyu elementi
```css
.nav-item { transition: background var(--dur-fast), color var(--dur-fast); }
```

---

## 3. Modal (kirish/chiqish)

Modal markazda paydo bo'ladi: shaffoflik + biroz kattalashuv.

```css
@keyframes modal-in {
  from { opacity: 0; transform: translateY(8px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal { animation: modal-in var(--dur-base) var(--ease-out); }

@keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }
.overlay { animation: overlay-in var(--dur-base) var(--ease-out); }
```

Yopilish: teskari (`opacity → 0`, `120ms`).

---

## 4. Dropdown / Context menu

```css
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.dropdown { transform-origin: top; animation: dropdown-in var(--dur-fast) var(--ease-out); }
```

---

## 5. Sidebar drawer (mobil)

```css
.sidebar { transition: transform var(--dur-slow) var(--ease-standard); }
/* translateX(-100%) ↔ translateX(0) */
```

---

## 6. Sahifa o'tishlari (route transition)

Sahifalar orasida yengil fade + pastdan suriluv:

```css
@keyframes page-enter {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.page { animation: page-enter var(--dur-base) var(--ease-out); }
```

React'da `react-transition-group` yoki `framer-motion` bilan ham mumkin (lekin sof CSS yetarli).

---

## 7. Yuklanish holatlari (loading)

### Skeleton (jadval/karta)
```css
@keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
.skeleton {
  background: linear-gradient(90deg, #ECF1F4 25%, #F4F7F9 37%, #ECF1F4 63%);
  background-size: 400px 100%;
  animation: shimmer 1.4s infinite linear;
  border-radius: var(--radius-md);
}
```

### Spinner (tugma ichida)
```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,.4);
           border-top-color:#fff; border-radius:50%; animation: spin .7s linear infinite; }
```

---

## 8. Bildirishnoma (Toast)

```css
@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}
.toast { animation: toast-in var(--dur-base) var(--ease-out); }
```

---

## 9. Mikro-interaksiyalar

| Element | Animatsiya |
|---------|-----------|
| Checkbox ("Eslab qolish") | belgi `scale` + rang o'zgarishi |
| Parol ko'rsatish (👁) | ikonka almashinuvi |
| Til tanlash ochilishi | dropdown-in |
| Pagination o'tishi | content fade |
| Tab almashinuvi | faol indikator suriluvi (`transform`) |
| Bell (yangi xabar) | yengil "shake" yoki badge pulse |

```css
@keyframes badge-pulse {
  0%,100% { transform: scale(1); }
  50%     { transform: scale(1.15); }
}
.bell-badge { animation: badge-pulse 1.6s ease-in-out infinite; }
```

---

## 10. Performans va qulaylik qoidalari

1. Faqat `transform` va `opacity` animatsiya qilinadi (GPU-tezlashtirilgan) — `width/height/top/left` dan qochiladi.
2. Animatsiya `60fps` da silliq bo'lishi kerak.
3. **`prefers-reduced-motion`** — foydalanuvchi animatsiyani o'chirsa, hurmat qilinadi:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

4. Hover animatsiyalari touch qurilmada ishlatilmaydi.
5. Animatsiya hech qachon foydalanuvchini kutib qoldirmasligi kerak (max `350ms`).

---

⬅️ [07 — Responsive](07-Responsive.md) · ➡️ [09 — Brending va logotip](09-Brending-logotip.md)
