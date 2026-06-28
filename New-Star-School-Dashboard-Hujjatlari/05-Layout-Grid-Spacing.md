# 05 — Layout, Grid va Spacing

Tizimning fazoviy tuzilishi: umumiy karkas (app shell), grid tizimi va oraliqlar.

---

## 1. App Shell (umumiy karkas)

Barcha ichki sahifalar bir xil karkasdan foydalanadi:

```
┌──────────┬───────────────────────────────────────────────┐
│          │  TOPBAR (h≈80px)                                │
│ SIDEBAR  ├───────────────────────────────────────────────┤
│ (w≈300)  │                                                 │
│  navy    │  CONTENT  (bg #F4F7F9, padding 24px)            │
│          │                                                 │
│          │                                                 │
└──────────┴───────────────────────────────────────────────┘
```

| Zona | O'lcham | Fon |
|------|---------|-----|
| Sidebar | kenglik `300px` (yig'iladigan: `72px`) | `#34414F` |
| Topbar | balandlik `80px` | `#FFFFFF` + `shadow-sm` |
| Content | qolgan joy | `#F4F7F9`, padding `24px` |

### CSS karkas

```css
.app-shell { display: grid; grid-template-columns: 300px 1fr; min-height: 100vh; }
.sidebar   { background: var(--color-bg-sidebar); color: var(--color-text-on-dark); }
.main      { display: grid; grid-template-rows: 80px 1fr; }
.topbar    { background: var(--color-bg-surface); box-shadow: var(--shadow-sm);
             display: flex; align-items: center; justify-content: space-between;
             padding: 0 var(--space-6); }
.content   { background: var(--color-bg-app); padding: var(--space-6); overflow-y: auto; }

/* Yig'ilgan sidebar */
.app-shell[data-collapsed="true"] { grid-template-columns: 72px 1fr; }
```

---

## 2. Grid tizimi

### Kartochkalar gridi (Asosiy sahifa, Sinflar)

Modul/sinf kartochkalari moslashuvchan grid bilan joylashtiriladi:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-4);
}
```

- Asosiy sahifada kartochkalar `auto-fill` bilan qatorga teriladi (Admin'da 6 ta, O'quvchi'da 4 ta).
- Sinflar sahifasida bir qatorda ~4 ta kartochka.

### Jadval gridi (ro'yxatlar)

Jadvallar `12 ustunli` mantiqiy tarmoqqa asoslanadi; ustun kengliklari kontentga moslashadi (CSS `grid-template-columns` yoki `table-layout`).

Misol — O'qituvchilar jadvali:

```css
.teacher-row {
  display: grid;
  grid-template-columns: 48px 2.5fr 1.5fr 1.2fr 1.5fr auto;
  /* №  |  O'qituvchi  |  Fan  |  Tug'ilgan  |  Telefon  |  Batafsil */
  align-items: center;
  gap: var(--space-4);
}
```

---

## 3. Oraliq tizimi (4-point grid)

Barcha oraliqlar `4px` ga karrali:

| Maqsad | Token | Qiymat |
|--------|-------|--------|
| Ikonka–matn (ichki) | `space-2` | 8px |
| Jadval qatori paddingi | `space-4` | 16px |
| Kartochka ichki padding | `space-5` | 20px |
| Bloklar orasi | `space-6` | 24px |
| Bo'limlar orasi | `space-8` | 32px |
| Content tashqi padding | `space-6` | 24px |

---

## 4. Konteyner va kengliklar

| Element | Maksimal kenglik |
|---------|------------------|
| Content maydoni | to'liq (fluid) |
| Modal oyna | `480px` |
| Login kartasi | `460px` |
| Profil detali (2 ustun) | chap `300px` + qolgan |

---

## 5. Vertikal ritm

- Topbar va content orasida ajratuvchi yo'q — soya yetarli.
- Jadval qatorlari teng balandlikda (~64px).
- Kartochkalar ichida: ikonka (yuqori) → bo'shliq `space-3` → nom.

---

## 6. Kartochka anatomiyasi

### Modul kartochkasi (Asosiy sahifa)
```
┌─────────────────┐
│      ●  ←─ rangli dumaloq ikonka (56px)
│                 │
│  Dars jadvali   │ ←─ nom (markaz, bold, 14–16px)
└─────────────────┘
  oq fon, radius-lg, shadow-card, padding 20px
```

### Sinf kartochkasi
```
┌─────────────────┐
│ ▔▔ ←─ tepada ko'k chiziq (3px)
│ 1-A SINF        │ ←─ ko'k, bold
│ 👥 32 ta o'quvchi│ ←─ kulrang caption
└─────────────────┘
```

---

⬅️ [04 — Typography](04-Typography.md) · ➡️ [06 — Komponentlar](06-Komponentlar.md)
